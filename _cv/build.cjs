// Prints _cv/cv.html to BERTIT-SABIR-CV.pdf with headless Chromium.
// Usage: _cv/build.sh [screenshot-dir]
const path = require('node:path');
const { chromium } = require('playwright-core');

(async () => {
  const root = path.resolve(__dirname, '..');
  const shotsDir = process.argv[2];
  const browser = await chromium.launch({ channel: 'chromium' });
  const page = await browser.newPage();
  await page.goto('file://' + path.join(__dirname, 'cv.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  // Fail loudly when content spills past a page bottom.
  const overflow = await page.evaluate(() => [...document.querySelectorAll('.page')].map((p, i) => {
    const bottom = p.getBoundingClientRect().bottom;
    const lowest = Math.max(...[...p.querySelectorAll('.job, .skills, .extras')]
      .map(el => el.getBoundingClientRect().bottom));
    return { page: i + 1, spare_pt: Math.round((bottom - lowest) * 0.75) };
  }));
  console.table(overflow);

  await page.pdf({ path: path.join(root, 'BERTIT-SABIR-CV.pdf'), preferCSSPageSize: true, printBackground: true });
  if (shotsDir) {
    await page.setViewportSize({ width: 794, height: 1123 });
    const pages = await page.$$('.page');
    for (const [i, el] of pages.entries()) {
      await el.screenshot({ path: path.join(shotsDir, `cv-page${i + 1}.png`), scale: 'device' });
    }
  }
  await browser.close();
  if (overflow.some(o => o.spare_pt < 0)) process.exit(1);
})();
