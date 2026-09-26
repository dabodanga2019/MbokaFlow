"use strict";
const locations = {
  port: {
    name: "Avenue du Port",
    area: "Gombe",
    x: 243,
    y: 152,
  },
  juin: {
    name: "Boulevard du 30 Juin",
    area: "Gombe",
    x: 355,
    y: 208,
  },
  matadi: {
    name: "Route de Matadi",
    area: "Ngaliema",
    x: 202,
    y: 330,
  },
  limete: {
    name: "Limete",
    area: "Limete",
    x: 428,
    y: 308,
  },
  matete: {
    name: "Matete",
    area: "Matete",
    x: 478,
    y: 376,
  },
  masina: {
    name: "Masina",
    area: "Masina",
    x: 558,
    y: 318,
  },
};
const reports = new Map();
const trafficLevels = {
  green: { color: "#7eab59", label: "Circulation fluide" },
  amber: { color: "#d5a23b", label: "Circulation ralentie" },
  red: { color: "#d9755d", label: "Circulation perturbée" },
};
let activeScenario = "pointe";
let selectedLocation = "juin";
function roadState(key) {
  const base = trafficScenarios[activeScenario].roads[key];
  const local = reports.get(key);
  return local
    ? {
        level: "red",
        speed: null,
        delay: null,
        incident: local,
        detail: "Votre essai local : aucune vitesse ni aucun retard calculé.",
        local: true,
      }
    : base;
}
function delayLabel(state) {
  return state.delay === null
    ? "Non estimé"
    : state.delay === 0
      ? "Aucun retard"
      : `+${state.delay} min`;
}
function stateLabel(state) {
  return state.local
    ? "Signalement local"
    : state.incident === "Route bloquée"
      ? "Route bloquée"
      : trafficLevels[state.level].label;
}
function makeMap(interactive) {
  const prefix = interactive ? "demo" : "hero";
  const markerKeys = interactive
    ? Object.keys(locations)
    : ["port", "juin", "matadi", "limete"];
  const blocks = [];
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 14; col++) {
      const x = col * 48 - 50,
        y = row * 43 - 80;
      blocks.push(
        `<rect x="${x + 4}" y="${y + 4}" width="${29 + (col % 3) * 3}" height="${23 + (row % 3) * 3}" rx="3" fill="${(col + row) % 7 === 0 ? "#d2dfbf" : "#e0e6d5"}" stroke="#d8dfcd" stroke-width=".7"/>`,
      );
    }
  }
  return `<svg viewBox="0 0 640 440" preserveAspectRatio="xMidYMid ${interactive ? "meet" : "slice"}" ${interactive ? 'role="group" aria-label="Carte schématique interactive de Kinshasa"' : 'aria-hidden="true"'}>
  <defs><pattern id="${prefix}-grid" width="35" height="35" patternUnits="userSpaceOnUse"><path d="M35 0H0V35" fill="none" stroke="#dfe6d2" stroke-width=".6"/></pattern><filter id="${prefix}-shadow" x="-100%" y="-100%" width="300%" height="300%"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#345126" flood-opacity=".15"/></filter></defs>
  <rect width="640" height="440" fill="#eaf0df"/><rect width="640" height="440" fill="url(#${prefix}-grid)"/>
  <g transform="translate(48 125) rotate(-24 280 180)">${blocks.join("")}</g>
  <path d="M-30 0H670V129C584 140 545 97 468 91S342 124 270 102 156 72 94 84 15 109-30 110Z" fill="#ceded4"/>
  <path d="M-20 120C81 93 97 81 158 100S251 137 332 119 428 98 483 107 553 149 660 145" fill="none" stroke="#d8e5c9" stroke-width="16"/>
  <path d="M-20 132C81 106 97 94 158 113S251 150 332 132 428 111 483 120 553 162 660 158" fill="none" stroke="#fffef4" stroke-width="7"/>
  <g fill="none" stroke="#fafbf2" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"><path d="M-20 314L140 238 289 191 405 212 655 312"/><path d="M64 450L162 344 250 270 281 159 298 119"/><path d="M211 450L249 354 356 276 402 195 442 117"/><path d="M351 450L429 315 542 241 633 172"/><path d="M-20 216L121 164 207 158 302 202 451 279 640 396"/><path d="M80 450L211 365 363 360 504 386 660 439"/><path d="M-20 378L160 293 330 308 508 195 638 223"/></g>
  <g fill="none" stroke="#c5ceb8" stroke-width=".7"><path d="M-20 314L140 238 289 191 405 212 655 312"/><path d="M64 450L162 344 250 270 281 159 298 119"/><path d="M211 450L249 354 356 276 402 195 442 117"/><path d="M351 450L429 315 542 241 633 172"/></g>
  <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"><path data-road="port" d="M167 137L207 158 280 191"/><path data-road="juin" d="M287 191L355 204 405 212 455 232"/><path data-road="matadi" d="M106 405L162 344 202 310 247 274"/><path data-road="limete" d="M400 365L429 315 483 280"/><path data-road="masina" d="M464 234L534 263 599 290"/><path data-road="matete" d="M427 372L504 386 549 401"/></g>
  <g font-family="Arial,sans-serif" text-anchor="middle"><text x="393" y="65" font-family="Georgia,serif" font-style="italic" font-size="13" letter-spacing="2" fill="#7e9d90" transform="rotate(4 393 65)">Fleuve Congo</text><g font-size="9" letter-spacing="2" fill="#7a8e68"><text x="210" y="205">GOMBE</text><text x="101" y="316">NGALIEMA</text><text x="360" y="340">LIMETE</text><text x="525" y="414">MATETE</text><text x="572" y="275">MASINA</text></g><g font-size="6.5" fill="#97a185"><text x="326" y="229" transform="rotate(12 326 229)">Boulevard du 30 Juin</text><text x="158" y="376" transform="rotate(-44 158 376)">Route de Matadi</text><text x="460" y="343" transform="rotate(-56 460 343)">Boulevard Lumumba</text></g></g>
  ${markerKeys
    .map((key) => {
      const l = locations[key];
      const level = trafficLevels[roadState(key).level];
      return `<g class="${interactive ? "map-marker" : ""}" data-key="${key}" transform="translate(${l.x} ${l.y})" ${interactive ? `tabindex="0" role="button" aria-label="${l.name} : ${level.label}"` : ""}><circle r="17" fill="${level.color}" opacity=".16"/><circle class="marker-core" r="8" fill="${level.color}" stroke="#fffdf5" stroke-width="3" filter="url(#${prefix}-shadow)"/><circle r="2" fill="white"/></g>`;
    })
    .join("")}
  ${!interactive ? '<g transform="translate(302 269)"><circle r="26" fill="#244733" opacity=".1"/><circle r="17" fill="#244733" stroke="#fafcf3" stroke-width="4"/><path d="M-6 5L6-7 2 7-1 1Z" fill="#d9ebae"/></g>' : ""}</svg>`;
}
document.querySelector(".hero-map").innerHTML = makeMap(false);
document.querySelector(".demo-map-art").innerHTML = makeMap(true);

const message = document.getElementById("mapMessage");
function showLocation(key) {
  selectedLocation = key;
  const location = locations[key];
  const state = roadState(key);
  message.replaceChildren();
  const dot = document.createElement("span");
  dot.className = "dot";
  dot.style.background = trafficLevels[state.level].color;
  const content = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = location.name;
  const status = document.createElement("span");
  status.textContent = `${state.incident || stateLabel(state)} · ${state.local ? "Votre signalement de démonstration" : "Données simulées"}`;
  content.append(title, status);
  const delay = document.createElement("span");
  delay.className = "status-time";
  delay.textContent = delayLabel(state);
  message.append(dot, content, delay);
  document.getElementById("incidentPlace").value = key;
  document.querySelectorAll(".map-marker").forEach((marker) => {
    marker.setAttribute("aria-pressed", String(marker.dataset.key === key));
  });
}
function renderTraffic() {
  const counts = { green: 0, amber: 0, red: 0 };
  Object.keys(locations).forEach((key) => {
    const state = roadState(key);
    const level = trafficLevels[state.level];
    counts[state.level]++;
    const marker = document.querySelector(`.map-marker[data-key="${key}"]`);
    marker.querySelector(".marker-core").setAttribute("fill", level.color);
    marker.querySelector("circle").setAttribute("fill", level.color);
    marker.setAttribute(
      "aria-label",
      `${locations[key].name} : ${stateLabel(state)}, ${state.incident || "sans incident"}, données simulées`,
    );
    document
      .querySelector(`.demo-map-art [data-road="${key}"]`)
      .setAttribute("stroke", level.color);
  });
  document.getElementById("countGreen").textContent = counts.green;
  document.getElementById("countAmber").textContent = counts.amber;
  document.getElementById("countRed").textContent = counts.red;
  document.getElementById("countReports").textContent = reports.size;
  const scenario = trafficScenarios[activeScenario];
  document.getElementById("scenarioDescription").textContent =
    `${scenario.label} · Heure fictive : ${scenario.time}. ${scenario.description}`;
  renderTrafficList();
  renderIncidents();
  showLocation(selectedLocation);
}
function renderTrafficList() {
  const filter = document.getElementById("trafficFilter").value;
  const list = document.getElementById("trafficList");
  list.replaceChildren();
  const keys = Object.keys(locations).filter(
    (key) => filter === "all" || roadState(key).level === filter,
  );
  document.getElementById("trafficListStatus").textContent = keys.length
    ? `${keys.length} axe${keys.length > 1 ? "s" : ""} affiché${keys.length > 1 ? "s" : ""} sur 6 · données fictives`
    : "Aucun axe dans cette catégorie pour ce scénario. Essayez un autre filtre.";
  keys.forEach((key) => {
    const state = roadState(key);
    const card = document.createElement("button");
    card.type = "button";
    card.className = "traffic-road-card";
    card.dataset.location = key;
    const badge = document.createElement("span");
    badge.className = `road-badge ${state.level}`;
    badge.textContent = stateLabel(state);
    const name = document.createElement("strong");
    name.textContent = locations[key].name;
    const numbers = document.createElement("span");
    numbers.className = "road-numbers";
    numbers.textContent = `Vitesse : ${state.speed === null ? "non estimée" : `${state.speed} km/h`} · Retard : ${delayLabel(state)}`;
    const note = document.createElement("span");
    note.className = "road-note";
    note.textContent = `${state.incident || "Sans incident"} · ${state.local ? "Votre essai local" : "Exemple fictif"}`;
    const action = document.createElement("span");
    action.className = "road-action";
    action.textContent = "Voir sur la carte ↗";
    card.append(badge, name, numbers, note, action);
    card.addEventListener("click", () => {
      setZoom(1);
      showLocation(key);
      const marker = document.querySelector(`.map-marker[data-key="${key}"]`);
      marker.focus({ preventScroll: true });
      document
        .querySelector(".map-panel")
        .scrollIntoView({
          block: "center",
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        });
    });
    list.append(card);
  });
}
function renderIncidents() {
  const feed = document.getElementById("scenarioIncidents");
  feed.replaceChildren();
  Object.keys(locations).forEach((key) => {
    const base = trafficScenarios[activeScenario].roads[key];
    const events = [];
    if (base.incident)
      events.push({
        title: `${base.incident} · ${locations[key].name}`,
        detail: base.detail,
        local: false,
      });
    if (reports.has(key))
      events.push({
        title: `${reports.get(key)} · ${locations[key].name}`,
        detail:
          "Votre signalement reste uniquement dans cette page. Il ne remplace pas un événement réel.",
        local: true,
      });
    events.forEach((event) => {
      const item = document.createElement("li");
      const title = document.createElement("strong");
      title.textContent = event.title;
      const description = document.createElement("p");
      description.textContent = event.detail;
      const source = document.createElement("span");
      source.className = "event-source";
      source.textContent = event.local
        ? "VOTRE ESSAI LOCAL"
        : "ÉVÉNEMENT FICTIF";
      item.append(source, title, description);
      feed.append(item);
    });
  });
  if (!feed.children.length) {
    const item = document.createElement("li");
    item.className = "empty-incidents";
    item.textContent =
      "Aucun événement dans ce scénario. Essayez de partager votre propre signalement fictif !";
    feed.append(item);
  }
}
document
  .getElementById("scenarioSelect")
  .addEventListener("change", (event) => {
    activeScenario = event.target.value;
    renderTraffic();
  });
document
  .getElementById("trafficFilter")
  .addEventListener("change", renderTrafficList);
document.getElementById("resetDemo").addEventListener("click", () => {
  reports.clear();
  activeScenario = "pointe";
  selectedLocation = "juin";
  document.getElementById("scenarioSelect").value = "pointe";
  document.getElementById("trafficFilter").value = "all";
  document.getElementById("searchPlace").value = "";
  document.getElementById("incidentForm").reset();
  document.getElementById("incidentResult").hidden = true;
  setZoom(1);
  renderTraffic();
  document.getElementById("scenarioDescription").textContent +=
    " Démo réinitialisée : vos essais locaux ont été effacés.";
});
// The hero remains a static illustration of the initial rush-hour scenario.
document.querySelectorAll(".hero-map [data-road]").forEach((road) => {
  road.setAttribute(
    "stroke",
    trafficLevels[roadState(road.dataset.road).level].color,
  );
});
document.querySelectorAll(".map-marker").forEach((marker) => {
  marker.addEventListener("click", () => showLocation(marker.dataset.key));
  marker.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      showLocation(marker.dataset.key);
    }
  });
});
const normalize = (text) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const query = normalize(document.getElementById("searchPlace").value);
  const match =
    query &&
    Object.keys(locations).find((key) =>
      normalize(`${locations[key].name} ${locations[key].area}`).includes(
        query,
      ),
    );
  if (match) showLocation(match);
  else {
    message.textContent = query
      ? "Lieu non disponible dans cette démo. Essayez Gombe, Limete, Matete, Masina ou Matadi."
      : "Saisissez un quartier ou une avenue pour explorer la démo.";
  }
});
let zoom = 1;
function setZoom(value) {
  zoom = Math.max(1, Math.min(1.8, Math.round(value * 10) / 10));
  document.querySelector(".demo-map-art").style.transform = `scale(${zoom})`;
  document.getElementById("zoomOut").disabled = zoom === 1;
  document.getElementById("zoomIn").disabled = zoom === 1.8;
}
document
  .getElementById("zoomIn")
  .addEventListener("click", () => setZoom(zoom + 0.2));
document
  .getElementById("zoomOut")
  .addEventListener("click", () => setZoom(zoom - 0.2));
document.getElementById("resetMap").addEventListener("click", () => {
  setZoom(1);
  showLocation("juin");
  document.getElementById("searchPlace").value = "";
});
setZoom(1);
document.getElementById("incidentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const type = document.getElementById("incidentType").value;
  const key = document.getElementById("incidentPlace").value;
  if (!locations[key] || !type) return;
  reports.set(key, type);
  const result = document.getElementById("incidentResult");
  result.hidden = false;
  result.textContent = `Merci ! « ${type} » à ${locations[key].name} apparaît sur votre carte de démonstration. Aucun signalement réel n’a été envoyé.`;
  selectedLocation = key;
  renderTraffic();
});
renderTraffic();
const menu = document.querySelector(".menu-toggle");
const nav = document.getElementById("nav");
function closeMenu() {
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "Ouvrir le menu");
}
menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
});
nav
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    closeMenu();
    menu.focus();
  }
});
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const body = `Bonjour Mboka Flow,\n\n${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}`;
  const result = document.getElementById("contactResult");
  result.hidden = false;
  result.textContent =
    "Votre brouillon est prêt à être ouvert dans votre application email. Si rien ne s’ouvre, écrivez directement à dabodanga2019@gmail.com. Aucun message n’a été envoyé automatiquement.";
  window.location.href = `mailto:dabodanga2019@gmail.com?subject=${encodeURIComponent(`Mboka Flow — ${data.get("subject")}`)}&body=${encodeURIComponent(body)}`;
});
document.getElementById("year").textContent = new Date().getFullYear();

// Inline vector icons render consistently even when a device lacks symbol fonts.
document.querySelectorAll("span, button").forEach((element) => {
  if (element.textContent.trim() === "⌖") {
    element.innerHTML =
      '<svg class="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/></svg>';
  }
});
