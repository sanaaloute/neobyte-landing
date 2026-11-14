const puppeteer = require("puppeteer-core");

(async () => {
  const [url, out, full = "0", theme] = process.argv.slice(2);
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: "new",
    args: ["--no-sandbox", "--hide-scrollbars"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  if (theme === "light" || theme === "dark") {
    await page.evaluateOnNewDocument((t) => {
      try { localStorage.setItem("theme", t); } catch {}
    }, theme);
    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: theme },
    ]);
  }
  await page.goto(url, { waitUntil: "networkidle0", timeout: 90000 });
  await new Promise((r) => setTimeout(r, 3000));
  // trigger scroll-based reveals by scrolling through the page
  if (full === "1") {
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y < h; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 800));
  }
  await page.screenshot({ path: out, fullPage: full === "1" });
  await browser.close();
  console.log("saved", out);
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
