[index.html](https://github.com/user-attachments/files/32686431/index.html)
# MbokaFlow<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Mboka Flow — Kinshasa sans embouteillage, c'est possible. Application gratuite de trafic et mobilité urbaine.">
  <title>Mboka Flow | Kinshasa sans embouteillage, c'est possible</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="navbar">
    <a class="brand" href="#accueil" aria-label="Mboka Flow">
      <span class="brand-mark">➤</span>
      <span><strong>M B O K A</strong><b>FLOW</b></span>
    </a>
    <button class="menu-btn" aria-label="Ouvrir le menu">☰</button>
    <nav id="nav">
      <a href="#accueil">Accueil</a>
      <a href="#fonctionnalites">Fonctionnalités</a>
      <a href="#demo">Démo</a>
      <a href="#apropos">À propos</a>
      <a href="#partenaires">Partenaires</a>
      <a href="#contact">Contact</a>
    </nav>
    <a class="btn btn-primary nav-cta" href="#demo">Tester la démo</a>
  </header>

  <main>
    <section id="accueil" class="hero">
      <div class="hero-content">
        <p class="eyebrow">MOBILITÉ INTELLIGENTE POUR KINSHASA</p>
        <h1>Kinshasa sans embouteillage,<br><span>c'est possible.</span></h1>
        <p class="hero-text">
          Mboka Flow est une plateforme de mobilité qui aide les usagers à voir
          l'état du trafic, signaler les incidents et choisir des itinéraires
          plus adaptés.
        </p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#demo">Voir la démo</a>
          <a class="btn btn-outline" href="#partenaires">Devenir partenaire</a>
        </div>
        <div class="trust">
          <span>📍 Kinshasa, RDC</span>
          <span>📱 Android + iOS</span>
          <span>💬 SMS / USSD prévu</span>
        </div>
      </div>

      <div class="phone-wrap">
        <div class="phone">
          <div class="phone-notch"></div>
          <div class="phone-screen">
            <div class="mini-brand">MBOKA <b>FLOW</b></div>
            <div class="mini-search">🔎 Rechercher un lieu</div>
            <div class="mini-map">
              <div class="road r1"></div><div class="road r2"></div>
              <div class="road r3"></div><div class="road r4"></div>
              <span class="pin p1">📍</span><span class="pin p2">📍</span>
              <span class="traffic t-red"></span><span class="traffic t-green"></span>
            </div>
            <div class="mini-status">
              <strong>Trafic actuel</strong>
              <p>🔴 Avenue du Port — embouteillage</p>
              <p>🟡 Boulevard du 30 Juin — ralenti</p>
              <p>🟢 Route de Matadi — fluide</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="fonctionnalites" class="section">
      <div class="section-head">
        <p class="eyebrow">CE QUE MBOKA FLOW PROPOSE</p>
        <h2>Une ville mieux informée, une mobilité plus intelligente.</h2>
      </div>
      <div class="feature-grid">
        <article class="card feature-card">
          <div class="icon">📍</div><span class="feature-number">01</span>
          <h3>Carte interactive</h3>
          <p>Affichage de la circulation avec trois niveaux : <b class="red-text">rouge</b> pour les embouteillages, <b class="orange-text">orange</b> pour les ralentissements et <b class="green-text">vert</b> pour les axes fluides.</p>
          <div class="feature-tag">GPS • Carte • Trafic</div>
        </article>
        <article class="card feature-card">
          <div class="icon">🧭</div><span class="feature-number">02</span>
          <h3>Navigation intelligente</h3>
          <p>Suggestion de trajets optimisés selon les conditions de circulation disponibles, avec comparaison du temps et de la distance.</p>
          <div class="feature-tag">Itinéraires • ETA • GPS</div>
        </article>
        <article class="card feature-card">
          <div class="icon">📢</div><span class="feature-number">03</span>
          <h3>Alertes communautaires</h3>
          <p>Les utilisateurs peuvent signaler un embouteillage, un accident, une route bloquée, des travaux ou un autre incident.</p>
          <div class="feature-tag">Signalement • Communauté</div>
        </article>
        <article class="card feature-card">
          <div class="icon">🚧</div><span class="feature-number">04</span>
          <h3>Informations officielles</h3>
          <p>Un espace réservé aux notifications vérifiées des autorités, services de transport et gestionnaires de voirie.</p>
          <div class="feature-tag">Autorités • Travaux • Alertes</div>
        </article>
        <article class="card feature-card">
          <div class="icon">🗺️</div><span class="feature-number">05</span>
          <h3>Points noirs</h3>
          <p>Base de données des zones chroniquement congestionnées pour identifier les problèmes récurrents et aider à la planification.</p>
          <div class="feature-tag">Historique • Analyse • Planification</div>
        </article>
        <article class="card feature-card">
          <div class="icon">🚦</div><span class="feature-number">06</span>
          <h3>Données temps réel</h3>
          <p>Architecture prévue pour exploiter, selon les autorisations disponibles, les données GPS, caméras, capteurs et signalements.</p>
          <div class="feature-tag">GPS • Caméras • Capteurs • API</div>
        </article>
      </div>
    </section>

    <section id="demo" class="section demo-section">
      <div class="section-head">
        <p class="eyebrow">PROTOTYPE INTERACTIF</p>
        <h2>Teste Mboka Flow</h2>
        <p>Cette démo utilise des données fictives. Elle montre le fonctionnement de l'interface avant la connexion aux données réelles.</p>
      </div>

      <div class="demo-layout">
        <div class="map-panel">
          <div class="map-toolbar">
            <input id="searchPlace" type="search" placeholder="Rechercher : Gombe, Limete, Matete...">
            <button id="locateBtn" class="small-btn">📍 Ma position</button>
          </div>
          <div id="demoMap" class="demo-map" aria-label="Carte de démonstration">
            <div class="map-label l1">GOMBE</div>
            <div class="map-label l2">LIMETE</div>
            <div class="map-label l3">MATETE</div>
            <div class="map-label l4">MASINA</div>
            <div class="map-road a"></div><div class="map-road b"></div>
            <div class="map-road c"></div><div class="map-road d"></div>
            <button class="map-pin red" data-place="Avenue du Port" style="left:28%;top:35%">●</button>
            <button class="map-pin yellow" data-place="Boulevard du 30 Juin" style="left:57%;top:28%">●</button>
            <button class="map-pin green" data-place="Route de Matadi" style="left:48%;top:68%">●</button>
            <div id="mapMessage" class="map-message">Clique sur un point pour voir l'état du trafic.</div>
          </div>
          <div class="legend">
            <span><i class="dot green"></i> Fluide</span>
            <span><i class="dot yellow"></i> Ralenti</span>
            <span><i class="dot red"></i> Embouteillage</span>
          </div>
        </div>

        <aside class="demo-card">
          <h3>Signaler un incident</h3>
          <p>Aide la communauté à mieux comprendre la circulation.</p>
          <form id="incidentForm">
            <label>Type d'incident
              <select id="incidentType" required>
                <option value="">Choisir...</option>
                <option>Embouteillage</option>
                <option>Accident</option>
                <option>Route bloquée</option>
                <option>Travaux</option>
                <option>Inondation</option>
                <option>Autre</option>
              </select>
            </label>
            <label>Lieu
              <input id="incidentPlace" required placeholder="Ex. Rond-point Victoire">
            </label>
            <button class="btn btn-primary full" type="submit">Envoyer le signalement</button>
          </form>
          <div id="incidentResult" class="result" hidden></div>
        </aside>
      </div>
    </section>

    <section id="architecture" class="section architecture-section">
      <div class="section-head">
        <p class="eyebrow">ARCHITECTURE DE DONNÉES</p>
        <h2>Comment Mboka Flow pourra construire le trafic en temps réel</h2>
        <p>Les sources sont combinées, contrôlées et affichées avec un niveau de confiance adapté.</p>
      </div>
      <div class="data-flow">
        <div class="data-source"><strong>📱 GPS</strong><span>Positions anonymisées et autorisées</span></div>
        <div class="flow-arrow">→</div>
        <div class="data-source"><strong>📢 Signalements</strong><span>Incidents transmis par les usagers</span></div>
        <div class="flow-arrow">→</div>
        <div class="data-source"><strong>🚦 Données routières</strong><span>Capteurs / caméras / sources partenaires</span></div>
        <div class="flow-arrow">→</div>
        <div class="data-core"><strong>⚙️ MOTEUR MBOKA FLOW</strong><span>Validation • agrégation • analyse</span></div>
        <div class="flow-arrow">→</div>
        <div class="data-result"><strong>🗺️ CARTE EN DIRECT</strong><span>Rouge • Orange • Vert • Alertes</span></div>
      </div>
      <div class="privacy-note">🔐 <strong>Protection des données :</strong> la version réelle devra appliquer des règles de confidentialité, minimiser les données collectées et obtenir les autorisations nécessaires pour chaque source.</div>
    </section>

    <section id="apropos" class="section dark-section">
      <div class="about-grid">
        <div>
          <p class="eyebrow">NOTRE VISION</p>
          <h2>Mettre l'information routière au service des Kinois.</h2>
          <p>
            Mboka Flow est conçu comme un projet de mobilité numérique gratuit,
            avec une approche progressive : commencer par un prototype,
            collecter des retours, construire les sources de données puis
            déployer la plateforme à plus grande échelle.
          </p>
        </div>
        <div class="stats">
          <div><strong>01</strong><span>Application mobile</span></div>
          <div><strong>02</strong><span>Plateforme web</span></div>
          <div><strong>03</strong><span>SMS / USSD</span></div>
          <div><strong>04</strong><span>Partenariats publics</span></div>
        </div>
      </div>
    </section>

    <section id="partenaires" class="section">
      <div class="section-head">
        <p class="eyebrow">CONSTRUISONS ENSEMBLE</p>
        <h2>Partenaires recherchés</h2>
        <p>Institutions publiques, opérateurs télécoms, acteurs du transport, universités, startups, ONG et partenaires techniques.</p>
      </div>
      <div class="partner-grid">
        <div class="partner">🏛️ Institutions publiques</div>
        <div class="partner">📡 Télécoms & connectivité</div>
        <div class="partner">🚌 Transport & mobilité</div>
        <div class="partner">💻 Technologie</div>
        <div class="partner">🌍 ONG & développement</div>
        <div class="partner">🎓 Universités & recherche</div>
      </div>
    </section>

    <section id="contact" class="section contact-section">
      <div>
        <p class="eyebrow">CONTACT</p>
        <h2>Vous voulez soutenir Mboka Flow ?</h2>
        <p>Écrivez-nous pour discuter d'un partenariat, d'un pilote ou d'une collaboration technique.</p>
        <p class="email">✉️ dabodanga2019@gmail.com</p>
      </div>
      <form id="contactForm" class="contact-form">
        <input name="name" required placeholder="Votre nom">
        <input name="email" type="email" required placeholder="Votre email">
        <select name="subject" required>
          <option value="">Objet...</option>
          <option>Partenariat</option>
          <option>Financement</option>
          <option>Développement technique</option>
          <option>Média / communication</option>
          <option>Autre</option>
        </select>
        <textarea name="message" rows="5" required placeholder="Votre message"></textarea>
        <button class="btn btn-primary" type="submit">Préparer l'email</button>
        <small>Le bouton ouvre votre application email. Aucun message n'est envoyé automatiquement par ce site.</small>
      </form>
    </section>
  </main>

  <footer>
    <div class="footer-brand">📍 <strong>Mboka Flow</strong></div>
    <p>Kinshasa sans embouteillage, c'est possible.</p>
    <div class="socials">
      <a href="#" aria-label="Facebook">Facebook</a>
      <a href="#" aria-label="Instagram">Instagram</a>
      <a href="#" aria-label="WhatsApp">WhatsApp</a>
    </div>
    <small>© <span id="year"></span> Mboka Flow. Prototype de présentation.</small>
  </footer>

  <script src="script.js"></script>
</body>
</html>
