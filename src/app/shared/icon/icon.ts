import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'github'
  | 'linkedin'
  | 'mail'
  | 'menu'
  | 'close'
  | 'flag-de'
  | 'flag-en'
  | 'flag-tr';

/**
 * Tiny inline SVG icon set – avoids an external icon library.
 * Size is controlled by the host element, e.g. <app-icon name="github" class="size-5" />.
 * Flags stretch to the host box (like the design mock) via preserveAspectRatio="none".
 */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-block', 'aria-hidden': 'true' },
  template: `
    @switch (name()) {
      @case ('github') {
        <svg viewBox="0 0 24 24" fill="currentColor" class="size-full">
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
               0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7
               3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07
               1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93
               0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3
               1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23
               3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805
               5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0
               .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          />
        </svg>
      }
      @case ('linkedin') {
        <svg viewBox="0 0 24 24" fill="currentColor" class="size-full">
          <path
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136
               1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85
               3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065
               0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064
               2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0
               1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24
               22.271V1.729C24 .774 23.2 0 22.225 0z"
          />
        </svg>
      }
      @case ('mail') {
        <svg viewBox="0 0 24 24" fill="currentColor" class="size-full">
          <path
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9
               2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
          />
        </svg>
      }
      @case ('menu') {
        <svg viewBox="0 0 24 24" class="size-full stroke-current" fill="none" stroke-width="2" stroke-linecap="round">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      }
      @case ('close') {
        <svg viewBox="0 0 24 24" class="size-full stroke-current" fill="none" stroke-width="2" stroke-linecap="round">
          <path d="M6 6l12 12M6 18L18 6" />
        </svg>
      }
      @case ('flag-de') {
        <svg viewBox="0 0 5 3" preserveAspectRatio="none" class="size-full">
          <rect width="5" height="1" fill="#000" />
          <rect y="1" width="5" height="1" fill="#dd0000" />
          <rect y="2" width="5" height="1" fill="#ffce00" />
        </svg>
      }
      @case ('flag-en') {
        <svg viewBox="0 0 60 30" preserveAspectRatio="none" class="size-full">
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#c8102e" stroke-width="2.5" />
          <path d="M30,0 V30 M0,15 H60" stroke="#fff" stroke-width="10" />
          <path d="M30,0 V30 M0,15 H60" stroke="#c8102e" stroke-width="6" />
        </svg>
      }
      @case ('flag-tr') {
        <svg viewBox="0 0 30 20" preserveAspectRatio="none" class="size-full">
          <rect width="30" height="20" fill="#e30a17" />
          <circle cx="11" cy="10" r="5" fill="#fff" />
          <circle cx="12.3" cy="10" r="4" fill="#e30a17" />
          <polygon
            points="0,-1 0.294,-0.309 0.951,-0.309 0.476,0.118 0.588,0.809 0,0.382 -0.588,0.809 -0.476,0.118 -0.951,-0.309 -0.294,-0.309"
            transform="translate(18.5,10) scale(2.4) rotate(-15)"
            fill="#fff"
          />
        </svg>
      }
    }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
}
