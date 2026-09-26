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
  // Scenarios, map colours, statistics and list filters share one data model.
  await page.locator("#resetDemo").click();
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const key of [
      "port",
      "juin",
      "matadi",
      "limete",
      "matete",
      "masina",
    ]) {
      await page.locator(`.map-marker[data-key="${key}"]`).click();
      assert.equal(await page.locator("#incidentPlace").inputValue(), key);
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const [scenario, counts, incidents] of [
    ["calme", [6, 0, 0], 0],
    ["pointe", [3, 2, 1], 2],
    ["pluie", [0, 3, 3], 3],
  ]) {
    await page.locator("#scenarioSelect").selectOption(scenario);
    const actual = await page
      .locator("#countGreen, #countAmber, #countRed")
      .allTextContents();
    assert.deepEqual(actual.map(Number), counts);
    assert.equal(await page.locator(".traffic-road-card").count(), 6);
    assert.equal(
      await page.locator("#scenarioIncidents .event-source").count(),
      incidents,
    );
    assert.equal(
      await page.evaluate(() =>
        [...document.querySelectorAll(".map-marker")].every(
          (marker) =>
            marker.querySelector(".marker-core").getAttribute("fill") ===
            document
              .querySelector(
                `.demo-map-art [data-road="${marker.dataset.key}"]`,
              )
              .getAttribute("stroke"),
        ),
      ),
      true,
    );
  }
  await page.locator("#trafficFilter").selectOption("green");
  assert.equal(await page.locator(".traffic-road-card").count(), 0);
  assert.match(
    await page.locator("#trafficListStatus").innerText(),
    /Aucun axe/,
  );
  await page.locator("#trafficFilter").selectOption("red");
  assert.equal(await page.locator(".traffic-road-card").count(), 3);
  const matete = page.locator('.traffic-road-card[data-location="matete"]');
  assert.match(await matete.innerText(), /Route bloquée/);
  assert.match(await matete.innerText(), /Non estimé/);
  await matete.click();
  assert.match(await page.locator("#mapMessage").innerText(), /Matete/);
  assert.equal(
    await page
      .locator('.map-marker[data-key="matete"]')
      .getAttribute("aria-pressed"),
    "true",
  );
  await page.locator("#scenarioSelect").selectOption("calme");
  assert.match(
    await page.locator("#scenarioIncidents").innerText(),
    /Aucun événement/,
  );
  await page.locator("#incidentType").selectOption("Inondation");
  await page.locator("#incidentPlace").selectOption("port");
  await page.locator("#incidentForm button").click();
  assert.equal(await page.locator("#countReports").innerText(), "1");
  assert.equal(await page.locator("#countGreen").innerText(), "5");
  assert.equal(await page.locator("#countRed").innerText(), "1");
  assert.match(
    await page.locator("#scenarioIncidents").innerText(),
    /VOTRE ESSAI LOCAL/,
  );
  assert.match(
    await page.locator('.traffic-road-card[data-location="port"]').innerText(),
    /non estimée/,
  );
  await page.locator("#scenarioSelect").selectOption("pointe");
  assert.equal(await page.locator("#countReports").innerText(), "1");
  assert.equal(await page.locator("#scenarioIncidents li").count(), 3);
  // A second report at the same location updates the existing local report.
  await page.locator("#incidentType").selectOption("Accident");
  await page.locator("#incidentForm button").click();
  assert.equal(await page.locator("#countReports").innerText(), "1");
  assert.match(await page.locator("#mapMessage").innerText(), /Accident/);
  await page.locator("#resetDemo").click();
  assert.equal(await page.locator("#scenarioSelect").inputValue(), "pointe");
  assert.equal(await page.locator("#trafficFilter").inputValue(), "all");
  assert.equal(await page.locator("#countReports").innerText(), "0");
  assert.equal(await page.locator(".traffic-road-card").count(), 6);
  assert.equal(await page.locator("#incidentResult").isHidden(), true);
  assert.equal(await page.locator("#zoomOut").isDisabled(), true);
  assert.match(
    await page.locator("#scenarioDescription").innerText(),
    /réinitialisée/,
  );
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
    "PASS: three scenarios, counts, map/list consistency, filters and empty states, report persistence/reset, search, keyboard markers, zoom, mobile menu, contact draft, overflow at 5 sizes, no JS errors.",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
