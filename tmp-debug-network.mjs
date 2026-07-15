import puppeteer from 'puppeteer';

const BASE = 'https://bevansatria.my.id';
const USERNAME = 'admin';
const PASSWORD = 'MakanMakan1!';

async function login(page) {
  await page.goto(`${BASE}/admin/login`, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.type('input[type="text"]', USERNAME);
  await page.type('input[type="password"]', PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForFunction(
    () => window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/'),
    { timeout: 120000 }
  );
  console.log('Logged in');
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  const requests = [];
  page.on('request', (req) => {
    requests.push({ url: req.url(), method: req.method(), start: Date.now() });
  });
  page.on('requestfailed', (req) => {
    const r = requests.find((x) => x.url === req.url() && !x.end && !x.failed);
    if (r) {
      r.failed = true;
      r.end = Date.now();
      r.duration = r.end - r.start;
    }
  });
  page.on('response', (res) => {
    const req = res.request();
    const r = requests.find((x) => x.url === req.url() && !x.end);
    if (r) {
      r.status = res.status();
      r.end = Date.now();
      r.duration = r.end - r.start;
    }
  });

  await login(page);

  const target = `${BASE}/admin/services`;
  console.log(`Navigating to ${target} and waiting 30s...`);
  const navStart = Date.now();
  try {
    await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 60000 });
  } catch (e) {
    console.log('domcontentloaded timeout', e.message);
  }
  console.log(`domcontentloaded reached in ${Date.now() - navStart}ms`);

  await new Promise((resolve) => setTimeout(resolve, 30000));

  const pending = requests.filter((r) => !r.end);
  const finished = requests.filter((r) => r.end);

  console.log('\n--- Pending/incomplete requests ---');
  for (const r of pending) {
    console.log(`${r.method?.padStart(4)} ${r.url}`);
  }

  console.log('\n--- Finished requests (slowest) ---');
  for (const r of finished.sort((a, b) => b.duration - a.duration).slice(0, 20)) {
    console.log(`${r.status} ${r.method?.padStart(4)} ${Math.round(r.duration).toString().padStart(6)}ms  ${r.url.slice(0, 120)}`);
  }

  console.log(`\nTotal requests captured: ${requests.length}`);
  console.log(`Pending: ${pending.length}`);

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
