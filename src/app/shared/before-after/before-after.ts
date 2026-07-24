import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { LanguageService } from '../../services/language';
import { FEATURED_DEMO } from '../../data/demos.data';

/**
 * Before/after relaunch slider. Reveals a deliberately dated "old" real-estate
 * site (built in the template, not a fabricated client screenshot) next to the
 * modern demo screenshot, split by a draggable handle.
 *
 * Interaction is user-driven only (no autoplay), so it is inherently
 * reduced-motion friendly. The split is a single CSS custom property
 * (`--pos`, in %) so a drag updates one style value — no layout thrash — and
 * `touch-action: pan-y` keeps vertical page scrolling intact on mobile.
 */
@Component({
  selector: 'app-before-after',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './before-after.html',
  styleUrl: './before-after.css',
  host: {
    role: 'slider',
    tabindex: '0',
    'aria-valuemin': '0',
    'aria-valuemax': '100',
    '[attr.aria-valuenow]': 'pos()',
    '[attr.aria-label]': 'content().projects.slider.label',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerup)': 'endDrag()',
    '(pointercancel)': 'endDrag()',
    '(keydown)': 'onKey($event)',
    '[style.--pos.%]': 'pos()',
  },
})
export class BeforeAfter {
  protected readonly content = inject(LanguageService).content;
  protected readonly demo = FEATURED_DEMO;

  private readonly el = inject(ElementRef<HTMLElement>);
  protected readonly pos = signal(55);
  private dragging = false;

  protected onPointerDown(event: PointerEvent): void {
    this.dragging = true;
    (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
    this.updateFromClientX(event.clientX);
  }

  protected onPointerMove(event: PointerEvent): void {
    if (this.dragging) this.updateFromClientX(event.clientX);
  }

  protected endDrag(): void {
    this.dragging = false;
  }

  protected onKey(event: KeyboardEvent): void {
    const step = event.shiftKey ? 10 : 4;
    if (event.key === 'ArrowLeft') this.nudge(-step, event);
    else if (event.key === 'ArrowRight') this.nudge(step, event);
    else if (event.key === 'Home') this.set(0, event);
    else if (event.key === 'End') this.set(100, event);
  }

  private nudge(delta: number, event: Event): void {
    this.set(this.pos() + delta, event);
  }

  private set(value: number, event: Event): void {
    event.preventDefault();
    this.pos.set(Math.max(0, Math.min(100, Math.round(value))));
  }

  private updateFromClientX(clientX: number): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    if (rect.width === 0) return;
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    this.pos.set(Math.max(0, Math.min(100, Math.round(ratio))));
  }
}
