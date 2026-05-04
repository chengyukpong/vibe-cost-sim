import { chromium } from '@playwright/test';
import { exec } from 'child_process';

const server = exec('npx vite --port 4176', { cwd: 'C:\\Users\\cheng\\workspace\\vibe-cost-sim' });
await new Promise(resolve => setTimeout(resolve, 4000));

try {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:4176', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);

  // Use keyboard to adjust sliders
  // Users slider is the 5th .MuiSlider-root
  const sliders = page.locator('.MuiSlider-root');
  const count = await sliders.count();
  console.log('Found', count, 'sliders');

  // Click on Users slider (index 4) and use arrow keys
  const usersSlider = sliders.nth(4);
  await usersSlider.click();
  // Press right arrow ~4 times (each step = 50, 4*50 = 200)
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'screenshot-full.png', fullPage: true });
  await page.screenshot({ path: 'screenshot-viewport.png' });
  
  console.log('Done');
} catch (e) {
  console.error(e);
} finally {
  server.kill('SIGTERM');
  browser?.close?.();
  setTimeout(() => process.exit(0), 500);
}
