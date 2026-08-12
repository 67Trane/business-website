import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header';

/**
 * The header samples the colour behind itself to decide between light and dark
 * nav text. These tests drive that decision through the real DOM API it uses.
 */
describe('Header', () => {
  const sampled: HTMLElement[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  afterEach(() => {
    // Restores the real method in a browser and the "missing" state in jsdom.
    Reflect.deleteProperty(document, 'elementsFromPoint');
    sampled.splice(0).forEach((element) => element.remove());
  });

  /** Pretends the given background colours are stacked below the header. */
  function stackBehindHeader(...backgroundColors: string[]): void {
    const elements = backgroundColors.map((color) => {
      const element = document.createElement('div');
      element.style.backgroundColor = color;
      document.body.appendChild(element);
      sampled.push(element);
      return element;
    });

    Object.defineProperty(document, 'elementsFromPoint', {
      configurable: true,
      value: () => elements,
    });
  }

  /** Renders the header and lets it re-evaluate its appearance, as a scroll would. */
  async function renderAfterScroll(): Promise<ComponentFixture<Header>> {
    const fixture = TestBed.createComponent(Header);
    await fixture.whenStable();

    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();

    return fixture;
  }

  function navLinkClasses(fixture: ComponentFixture<Header>): string {
    const link = (fixture.nativeElement as HTMLElement).querySelector('nav ul a');
    expect(link).not.toBeNull();
    return link!.className;
  }

  it('switches to light nav text over a dark background', async () => {
    stackBehindHeader('#0b1220');

    expect(navLinkClasses(await renderAfterScroll())).toContain('text-white');
  });

  it('keeps dark nav text over a light background', async () => {
    stackBehindHeader('#ffffff');

    expect(navLinkClasses(await renderAfterScroll())).toContain('text-copy');
  });

  it('looks past a translucent layer to the opaque background below it', async () => {
    // A dark veil at 40% opacity does not make the page dark – the white
    // section underneath is what the header text has to stay readable on.
    stackBehindHeader('rgba(0, 0, 0, 0.4)', '#ffffff');

    expect(navLinkClasses(await renderAfterScroll())).toContain('text-copy');
  });

  it('renders where elementsFromPoint does not exist', async () => {
    // Not a test-only edge case dressed up: the scroll handler threw on every
    // scroll in that situation and took the appearance update down with it.
    expect(typeof document.elementsFromPoint).not.toBe('function');

    expect(navLinkClasses(await renderAfterScroll())).toContain('text-copy');
  });
});
