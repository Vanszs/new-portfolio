import puppeteer from 'puppeteer';

const BASE = 'https://bevansatria.my.id';
const USERNAME = 'admin';
const PASSWORD = 'MakanMakan1!';

const PAGES = [
  '/admin',
  '/admin/services',
  '/admin/projects',
  '/admin/blogs',
  '/admin/testimonials',
  '/admin/hero',
  '/admin/about',
  '/admin/footer',
];

async function login(page) {
  await page.goto(`${BASE}/admin/login`, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.type('input[type="text"]', USERNAME);
  await page.type('input[type="password"]', PASSWORD);

  const navigationPromise = page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 120000 });
  await page.click('button[type="submit"]');
  try {
    await navigationPromise;
  } catch (e) {
    console.log('Navigation promise timed out; checking URL manually');
  }

  await page.waitForFunction(
    () => window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/'),
    { timeout: 120000 }
  );
  console.log('Logged in, session ready');
}

function attachNetworkLogger(page) {
  const requests = [];
  page.on('request', (req) => {
    requests.push({ url: req.url(), method: req.method(), start: Date.now() });
  });
  page.on('requestfailed', (req) => {
    const r = requests.find((x) => x.url === req.url());
    if (r) r.failed = true;
  });
  page.on('response', (res) => {
    const req = res.request();
    const r = requests.find((x) => x.url === req.url());
    if (r) {
      r.status = res.status();
      r.end = Date.now();
      r.duration = r.end - r.start;
    }
  });
  return requests;
}

async function measure(page, path, requests) {
  requests.length = 0;
  const start = Date.now();
  try {
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle2', timeout: 120000 });
  } catch (e) {
    console.log(`  networkidle2 timeout for ${path}: ${e.message}`);
  }
  const end = Date.now();
  const duration = end - start;

  const hasLoadingText = await page.evaluate(() =>
    document.body.innerText.includes('Loading')
  );
  const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 200));

  return { path, duration, hasLoadingText, bodyText };
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  const requests = attachNetworkLogger(page);
  await login(page);

  console.log('\nMeasuring page load times (timeout 120s):');
  console.log('---------------------------------------------------');
  for (const path of PAGES) {
    const result = await measure(page, path, requests);
    console.log(`${result.path.padEnd(22)} ${result.duration.toString().padStart(6)}ms  ${result.hasLoadingText ? 'still shows Loading' : 'content rendered'}`);
    console.log(`  First body text: ${result.bodyText.replace(/\n/g, ' | ').slice(0, 120)}`);

    const slowRequests = requests
      .filter((r) => r.duration > 500)
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 5);
    if (slowRequests.length) {
      console.log('  Slowest requests:');
      for (const r of slowRequests) {
        console.log(`    ${r.status ?? '?'}/${r.method?.padStart(4)} ${Math.round(r.duration).toString().padStart(6)}ms  ${r.url.slice(0, 120)}${r.failed ? ' [FAILED]' : ''}`);
      }
    }
  }

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
