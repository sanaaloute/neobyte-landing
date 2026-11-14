const puppeteer = require("puppeteer-core");

(async () => {
  const [url, out, waitMs = "2500", theme] = process.argv.slice(2);
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: "new",
    args: ["--no-sandbox", "--hide-scrollbars"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  if (theme === "light" || theme === "dark") {
    await page.evaluateOnNewDocument((t) => {
      try {
        localStorage.setItem("theme", t);
      } catch {}
    }, theme);
    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: theme },
    ]);
  }
  await page.goto(url, { waitUntil: "networkidle0", timeout: 90000 });
  await new Promise((r) => setTimeout(r, Number(waitMs)));
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: out });
  await browser.close();
  console.log("saved", out);
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
