const { chromium } = require('playwright');

const BASE = 'http://localhost:3000';
const USERNAME = 'admin';
const PASSWORD = 'MakanMakan1!';

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => console.log(`[BROWSER CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`));
  page.on('pageerror', err => console.error(`[BROWSER ERROR] ${err.toString()}`));

  console.log('Navigating to login page...');
  await page.goto(`${BASE}/admin/login`);

  console.log('Typing credentials...');
  await page.fill('input[placeholder="admin"]', USERNAME);
  await page.fill('input[placeholder="••••••••"]', PASSWORD);

  console.log('Clicking submit...');
  await page.click('button[type="submit"]');

  console.log('Waiting for redirection to /admin...');
  await page.waitForURL(`${BASE}/admin`, { timeout: 10000 });
  console.log('Successfully logged in! Current URL:', page.url());

  const pages = [
    'projects',
    'services',
    'blogs',
    'testimonials',
    'hero',
    'about',
    'footer'
  ];

  for (const p of pages) {
    console.log(`Navigating to ${p} page...`);
    await page.goto(`${BASE}/admin/${p}`);
    await page.waitForLoadState('networkidle');
    const headerText = await page.textContent('h1');
    console.log(`Page ${p} header check: "${headerText.trim()}"`);
  }

  console.log('Clicking logout button...');
  await page.click('button:has-text("Logout")');

  console.log('Waiting for redirection to /admin/login...');
  await page.waitForURL(url => url.pathname === '/admin/login', { timeout: 10000 });
  console.log('Logout verified successfully! Current URL:', page.url());

  await browser.close();
  console.log('Test completed successfully.');
}

run().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
