// Renders assets/banners/share-card/share-card.html to the two share images
// in public/og/, using a locally installed Chrome or Edge.
//
// A real browser is used (rather than next/og) because it shapes Arabic
// correctly; the renderer behind next/og does not. The browser is driven over
// the DevTools protocol instead of `--screenshot`, because headless Chrome's
// viewport is shorter than its window and `--screenshot` leaves the bottom of
// the card unpainted. Here the viewport is set to exactly 1200 x 630 and the
// capture waits for web fonts. No dependencies: Node's built-in WebSocket.
//
//   npm run og:export            # uses CHROME_PATH, or finds Chrome / Edge
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const WIDTH = 1200;
const HEIGHT = 630;
const root = process.cwd();
const source = path.join(root, 'assets', 'banners', 'share-card', 'share-card.html');
const outDir = path.join(root, 'public', 'og');

const browserPath = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
]
  .filter(Boolean)
  .find((p) => existsSync(p));

if (!browserPath) {
  console.error('No Chrome or Edge found. Set CHROME_PATH to a Chromium-based browser.');
  process.exit(1);
}

const browser = spawn(browserPath, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--remote-debugging-port=0',
  `--user-data-dir=${path.join(root, '.next', 'og-profile')}`,
  'about:blank',
]);

// Chrome prints its DevTools endpoint on stderr once it is ready.
const browserWs = await new Promise((resolve, reject) => {
  let log = '';
  browser.stderr.on('data', (chunk) => {
    log += chunk;
    const match = log.match(/DevTools listening on (ws:\/\/\S+)/);
    if (match) resolve(match[1]);
  });
  browser.on('exit', () => reject(new Error(`Browser exited early:\n${log}`)));
});

// Attach to the blank page Chrome opened.
const { port } = new URL(browserWs);
const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
const page = targets.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve) => ws.addEventListener('open', resolve, { once: true }));

let nextId = 0;
const pending = new Map();
const waiters = new Map();
ws.addEventListener('message', ({ data }) => {
  const msg = JSON.parse(data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  } else if (msg.method && waiters.has(msg.method)) {
    waiters.get(msg.method)();
    waiters.delete(msg.method);
  }
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, (msg) => (msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result)));
    ws.send(JSON.stringify({ id, method, params }));
  });
const once = (method) => new Promise((resolve) => waiters.set(method, resolve));

await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: WIDTH,
  height: HEIGHT,
  deviceScaleFactor: 1,
  mobile: false,
});

mkdirSync(outDir, { recursive: true });

try {
  for (const lang of ['ar', 'en']) {
    const loaded = once('Page.loadEventFired');
    await send('Page.navigate', { url: `${pathToFileURL(source).href}?lang=${lang}` });
    await loaded;
    // Wait for the web fonts, then one more frame so layout has settled.
    await send('Runtime.evaluate', {
      expression:
        'document.fonts.ready.then(() => new Promise((r) => requestAnimationFrame(() => r(true))))',
      awaitPromise: true,
    });
    const { data } = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT, scale: 1 },
    });
    const out = path.join(outDir, `editorial-${WIDTH}x${HEIGHT}-${lang}.png`);
    writeFileSync(out, Buffer.from(data, 'base64'));
    console.log(`wrote ${path.relative(root, out)}`);
  }
} finally {
  ws.close();
  browser.kill();
}
