const { chromium } = require("playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
    args: ["--no-sandbox"],
    headless: true,
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(process.env.BASE_URL || "http://127.0.0.1:3000", {
    waitUntil: "networkidle",
  });
  await page.locator("#searchPlace").fill("Matadi");
  await page.locator(".search-button").click();
  assert.match(
    await page.locator("#mapMessage").innerText(),
    /Route de Matadi/,
  );
  await page.locator("#searchPlace").fill("inexistant");
  await page.locator(".search-button").click();
  assert.match(
    await page.locator("#mapMessage").innerText(),
    /Lieu non disponible/,
  );
  await page.locator("#incidentType").selectOption({ label: "Travaux" });
  await page.locator("#incidentPlace").selectOption("limete");
  await page.locator("#incidentForm button").click();
  assert.match(await page.locator("#incidentResult").innerText(), /Merci/);
  assert.match(await page.locator("#mapMessage").innerText(), /Travaux/);
  assert.equal(
    await page
      .locator('.map-marker[data-key="limete"] .marker-core')
      .getAttribute("fill"),
    "#d9755d",
  );
  await page.locator("#zoomIn").click();
  assert.match(
    await page.locator(".demo-map-art").getAttribute("style"),
    /1.2/,
  );
  await page.locator("#resetMap").click();
  assert.equal(await page.locator("#zoomOut").isDisabled(), true);
  await page.locator('.map-marker[data-key="matete"]').focus();
  await page.keyboard.press("Enter");
  assert.match(await page.locator("#mapMessage").innerText(), /Matete/);
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `Overflow at ${width}`,
    );
  }
  await page.locator(".menu-toggle").click();
  assert.equal(
    await page.locator(".menu-toggle").getAttribute("aria-expanded"),
    "true",
  );
  await page.locator('nav a[href="#demo"]').click();
  assert.equal(
    await page.locator(".menu-toggle").getAttribute("aria-expanded"),
    "false",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.locator('#contactForm [name="name"]').fill("Test Mboka");
  await page.locator('#contactForm [name="email"]').fill("test@example.com");
  await page
    .locator('#contactForm [name="subject"]')
    .selectOption({ label: "Devenir partenaire" });
  await page
    .locator('#contactForm [name="message"]')
    .fill("Bonjour, je souhaite contribuer au projet.");
  await page.locator("#contactForm button").click();
  assert.match(
    await page.locator("#contactResult").innerText(),
    /brouillon est prêt/,
  );
  assert.deepEqual(errors, []);
  console.log(
    "PASS: search, empty results, incident report, marker update, keyboard markers, zoom/reset, mobile menu, contact draft, overflow at 5 sizes, no JS errors.",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
