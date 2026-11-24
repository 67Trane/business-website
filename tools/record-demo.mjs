// Records a phone-format scroll-through of a live demo and writes the media the
// showcase needs: public/videos/<slug>.mp4 and public/images/demos/<slug>.webp
// (+ <slug>-300.webp for the hero). Development tool, not part of the build.
//
// Needs Chrome, ffmpeg on PATH and Playwright. Playwright is not a dependency of
// this project – point PLAYWRIGHT at any installed copy, e.g. the demo project's:
//
//   $env:PLAYWRIGHT = 'file:///C:/Users/67Trane/all-projects/demo-immobilien/node_modules/playwright/index.mjs'
//   node tools/record-demo.mjs bosporus "880,2110,3660,4880" --hold 1150 --trim 0.4
//
// Arguments: <slug> (folder under mehmet-deliaci.net/demos/), then the scroll
// targets in px (pick section tops, ~12 s in total), and optionally:
//   --hold <ms>       pause after each scroll step (default 1100)
//   --first <ms>      pause on the first screen (default hold + 900; raise it for
//                     demos with a slow entrance or preloader)
//   --trim <s>        cut this much from the start (blank frames before the hero)
//   --crf <n>         H.264 quality, lower = better/bigger (default 28; ~1 MB per clip)
//   --desktop         also write <slug>-desktop.webp (1280×800 first screen)
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const { chromium } = await import(process.env.PLAYWRIGHT ?? 'playwright');

const [slug, targetsArg] = process.argv.slice(2);
if (!slug || !targetsArg) {
  console.error(
    'usage: node tools/record-demo.mjs <slug> "<y1,y2,...>" [--hold ms] [--first ms] [--trim s] [--crf n] [--desktop]',
  );
  process.exit(1);
}
const flag = (name, fallback) => {
  const index = process.argv.indexOf(`--${name}`);
  return index > -1 ? Number(process.argv[index + 1]) : fallback;
};
const targets = targetsArg.split(',').map(Number);
const hold = flag('hold', 1100);
const firstHold = flag('first', hold + 900);
const trim = flag('trim', 0);
const crf = flag('crf', 28);

const url = `https://mehmet-deliaci.net/demos/${slug}/`;
const frameDir = mkdtempSync(join(tmpdir(), `record-${slug}-`));
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});

// Warm the HTTP cache (lazy images) in a throwaway tab, so the recording does
// not show images popping in – but the entrance animations still play fresh.
const warm = await context.newPage();
await warm.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
for (let step = 0; step < 25; step++) {
  await warm.evaluate(() => window.scrollBy(0, innerHeight));
  await warm.waitForTimeout(200);
}
await warm.close();

const page = await context.newPage();
const cdp = await context.newCDPSession(page);
const frames = [];
cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
  frames.push({ t: metadata.timestamp, data });
  await cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
});
await page.goto(url, { waitUntil: 'load', timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92 });
await page.waitForTimeout(firstHold);

for (const target of targets) {
  // Eased programmatic scroll: drives scroll timelines and observers like a finger would.
  await page.evaluate(
    (y) =>
      new Promise((resolve) => {
        const start = scrollY;
        const distance = y - start;
        const duration = 1100 * Math.max(0.7, Math.min(1.5, Math.abs(distance) / innerHeight));
        const begin = performance.now();
        const ease = (x) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2);
        const step = (now) => {
          const progress = Math.min(1, (now - begin) / duration);
          window.scrollTo(0, start + distance * ease(progress));
          progress < 1 ? requestAnimationFrame(step) : resolve();
        };
        requestAnimationFrame(step);
      }),
    target,
  );
  await page.waitForTimeout(hold);
}
await cdp.send('Page.stopScreencast');

// Settled first screen for the posters.
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(2500);
const posterPng = join(frameDir, 'poster.png');
await page.screenshot({ path: posterPng });

let desktopPng;
if (process.argv.includes('--desktop')) {
  const desk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desk.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await desk.waitForTimeout(3500);
  desktopPng = join(frameDir, 'desktop.png');
  await desk.screenshot({ path: desktopPng });
}
await browser.close();

// Frames arrive with timestamps; the concat list keeps their real timing.
frames.sort((a, b) => a.t - b.t);
let list = '';
frames.forEach((frame, index) => {
  const name = `f${String(index).padStart(5, '0')}.jpg`;
  writeFileSync(join(frameDir, name), Buffer.from(frame.data, 'base64'));
  const next = frames[index + 1]?.t ?? frame.t + 1 / 30;
  list += `file '${name}'\nduration ${(next - frame.t).toFixed(4)}\n`;
});
list += `file 'f${String(frames.length - 1).padStart(5, '0')}.jpg'\n`;
writeFileSync(join(frameDir, 'list.txt'), list);

const ffmpeg = (...args) =>
  execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args]);
ffmpeg(
  '-f',
  'concat',
  '-safe',
  '0',
  '-i',
  join(frameDir, 'list.txt'),
  '-ss',
  String(trim),
  '-vf',
  'scale=480:-2:flags=lanczos,fps=30',
  '-c:v',
  'libx264',
  '-preset',
  'slow',
  '-crf',
  String(crf),
  '-pix_fmt',
  'yuv420p',
  '-movflags',
  '+faststart',
  '-an',
  `public/videos/${slug}.mp4`,
);
ffmpeg(
  '-i',
  posterPng,
  '-vf',
  'scale=480:-2:flags=lanczos',
  '-c:v',
  'libwebp',
  '-quality',
  '80',
  `public/images/demos/${slug}.webp`,
);
ffmpeg(
  '-i',
  posterPng,
  '-vf',
  'scale=300:-2:flags=lanczos',
  '-c:v',
  'libwebp',
  '-quality',
  '74',
  `public/images/demos/${slug}-300.webp`,
);
if (desktopPng) {
  ffmpeg(
    '-i',
    desktopPng,
    '-vf',
    'scale=1280:-2:flags=lanczos',
    '-c:v',
    'libwebp',
    '-quality',
    '78',
    `public/images/demos/${slug}-desktop.webp`,
  );
}
rmSync(frameDir, { recursive: true, force: true });

const span = frames.at(-1).t - frames[0].t;
console.log(
  `${slug}: ${frames.length} frames over ${span.toFixed(1)} s, written to public/videos and public/images/demos`,
);
