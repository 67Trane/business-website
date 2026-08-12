import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CONTENT } from '../../data/i18n.data';
import { ConsentService } from '../../services/consent';
import { Contact } from './contact';

/** Lets pending promises and the change detection that follows them settle. */
const settle = () => new Promise((resolve) => setTimeout(resolve));

function jsonResponse(body: unknown, ok = true, status = 200): Response {
  return { ok, status, json: async () => body } as Response;
}

describe('Contact form', () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  let trackLead: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    TestBed.configureTestingModule({});
    trackLead = vi.spyOn(TestBed.inject(ConsentService), 'trackLeadConversion');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  async function renderFilledForm() {
    const fixture = TestBed.createComponent(Contact);
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    const field = <T extends HTMLElement>(name: string) =>
      element.querySelector<T>(`[name="${name}"]`)!;

    field<HTMLInputElement>('name').value = 'Erika Musterfrau';
    field<HTMLInputElement>('email').value = 'erika@example.com';
    field<HTMLTextAreaElement>('message').value = 'Ich hätte gern eine Website.';

    return { fixture, element, form: element.querySelector('form')!, field };
  }

  async function submit(fixture: ComponentFixture<Contact>, form: HTMLFormElement) {
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    await settle();
    fixture.detectChanges();
  }

  function status(element: HTMLElement): string {
    return element.querySelector('[role="status"], [role="alert"]')?.textContent?.trim() ?? '';
  }

  it('fetches a token, sends it along with the form and confirms delivery', async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ ts: 1_754_000_000, token: 'signed-token' }))
      .mockResolvedValueOnce(jsonResponse({ message: 'Message sent.' }));

    const { fixture, element, form, field } = await renderFilledForm();
    await submit(fixture, form);

    const [tokenUrl] = fetchMock.mock.calls[0];
    const [postUrl, postInit] = fetchMock.mock.calls[1];
    const body = postInit.body as FormData;

    expect(tokenUrl).toBe('/contact.php?token=1');
    expect(postUrl).toContain('/contact.php');
    expect(postInit.method).toBe('POST');
    expect(body.get('form_ts')).toBe('1754000000');
    expect(body.get('form_token')).toBe('signed-token');
    expect(body.get('email')).toBe('erika@example.com');

    expect(status(element)).toBe(CONTENT.de.contact.success);
    expect(field<HTMLInputElement>('name').value).toBe('');
    expect(trackLead).toHaveBeenCalledOnce();
  });

  it('reports an error instead of pretending to send when no token is issued', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({}, false, 403));

    const { fixture, element, form } = await renderFilledForm();
    await submit(fixture, form);

    // Without a token the mail script would reject the enquiry anyway, so the
    // visitor has to be told – silence would send them away thinking it worked.
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(element.querySelector('[role="alert"]')).not.toBeNull();
    expect(trackLead).not.toHaveBeenCalled();
  });

  it('reports an error when the mail script rejects the request', async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ ts: 1_754_000_000, token: 'signed-token' }))
      .mockResolvedValueOnce(jsonResponse({ message: 'Too many requests.' }, false, 429));

    const { fixture, element, form } = await renderFilledForm();
    await submit(fixture, form);

    expect(element.querySelector('[role="alert"]')).not.toBeNull();
    expect(trackLead).not.toHaveBeenCalled();
  });

  it('ignores a second submit while the first one is still running', async () => {
    let releaseToken: (response: Response) => void = () => undefined;
    fetchMock.mockReturnValueOnce(new Promise<Response>((resolve) => (releaseToken = resolve)));

    const { fixture, form } = await renderFilledForm();
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    await settle();

    form.dispatchEvent(new Event('submit', { cancelable: true }));
    await settle();

    expect(fetchMock).toHaveBeenCalledOnce();

    releaseToken(jsonResponse({ ts: 1_754_000_000, token: 'signed-token' }));
  });
});
