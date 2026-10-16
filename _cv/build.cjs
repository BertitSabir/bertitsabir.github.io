// Prints the CV sources to PDF with headless Chromium:
//   _cv/cv.en.html → BERTIT-SABIR-CV.pdf
//   _cv/cv.fr.html → BERTIT-SABIR-CV-FR.pdf
// Usage: _cv/build.sh [screenshot-dir]
const path = require('node:path');
const { chromium } = require('playwright-core');

const CVS = [
  { lang: 'en', src: 'cv.en.html', out: 'BERTIT-SABIR-CV.pdf' },
  { lang: 'fr', src: 'cv.fr.html', out: 'BERTIT-SABIR-CV-FR.pdf' },
];

(async () => {
  const root = path.resolve(__dirname, '..');
  const shotsDir = process.argv[2];
  const browser = await chromium.launch({ channel: 'chromium' });
  let overflowed = false;

  for (const cv of CVS) {
    const page = await browser.newPage();
    await page.goto('file://' + path.join(__dirname, cv.src), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    // Fail loudly when content spills past a page bottom.
    const overflow = await page.evaluate(() => [...document.querySelectorAll('.page')].map((p, i) => {
      const bottom = p.getBoundingClientRect().bottom;
      const lowest = Math.max(...[...p.querySelectorAll('.job, .skills, .extras')]
        .map(el => el.getBoundingClientRect().bottom));
      return { page: i + 1, spare_pt: Math.round((bottom - lowest) * 0.75) };
    }));
    console.log(cv.out, overflow.map(o => `p${o.page}: ${o.spare_pt}pt spare`).join(', '));
    overflowed ||= overflow.some(o => o.spare_pt < 0);

    await page.pdf({ path: path.join(root, cv.out), preferCSSPageSize: true, printBackground: true });
    if (shotsDir) {
      await page.setViewportSize({ width: 794, height: 1123 });
      for (const [i, el] of (await page.$$('.page')).entries()) {
        await el.screenshot({ path: path.join(shotsDir, `cv-${cv.lang}-page${i + 1}.png`), scale: 'device' });
      }
    }
    await page.close();
  }

  await browser.close();
  if (overflowed) process.exit(1);
})();
