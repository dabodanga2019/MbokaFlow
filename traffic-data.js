"use strict";
// Entirely invented examples. Times, delays, speeds and events are not observations.
const trafficScenarios = {
  calme: {
    label: "Circulation calme",
    time: "11 h 00",
    description:
      "Une fin de matinée imaginaire : les six axes sont fluides, sans incident dans ce scénario.",
    roads: {
      port: { level: "green", speed: 35, delay: 0 },
      juin: { level: "green", speed: 40, delay: 0 },
      matadi: { level: "green", speed: 45, delay: 0 },
      limete: { level: "green", speed: 35, delay: 0 },
      matete: { level: "green", speed: 30, delay: 0 },
      masina: { level: "green", speed: 40, delay: 0 },
    },
  },
  pointe: {
    label: "Heure de pointe",
    time: "17 h 30",
    description:
      "Un retour du travail imaginaire : circulation dense à Gombe, travaux à Limete et ralentissements sur le boulevard du 30 Juin.",
    roads: {
      port: {
        level: "red",
        speed: 8,
        delay: 15,
        incident: "Embouteillage",
        detail: "Un afflux fictif de véhicules ralentit l’accès au quartier.",
      },
      juin: { level: "amber", speed: 18, delay: 8 },
      matadi: { level: "green", speed: 40, delay: 0 },
      limete: {
        level: "amber",
        speed: 20,
        delay: 6,
        incident: "Travaux",
        detail: "Une voie est temporairement fermée dans cet exemple inventé.",
      },
      matete: { level: "green", speed: 32, delay: 0 },
      masina: { level: "green", speed: 35, delay: 0 },
    },
  },
  pluie: {
    label: "Fortes pluies",
    time: "18 h 15",
    description:
      "Un épisode de pluie entièrement inventé : chaussées inondées, visibilité réduite et incidents simulés. Ce n’est pas une alerte météo.",
    roads: {
      port: { level: "amber", speed: 18, delay: 10 },
      juin: {
        level: "red",
        speed: 7,
        delay: 22,
        incident: "Accident",
        detail:
          "Un accrochage fictif occupe une voie. Aucun événement réel n’est signalé.",
      },
      matadi: { level: "amber", speed: 22, delay: 12 },
      limete: {
        level: "red",
        speed: 5,
        delay: 28,
        incident: "Inondation",
        detail: "Une accumulation d’eau imaginaire réduit le passage.",
      },
      matete: {
        level: "red",
        speed: 0,
        delay: null,
        incident: "Route bloquée",
        detail:
          "Un passage est fermé dans le scénario ; le retard n’est pas estimé.",
      },
      masina: { level: "amber", speed: 15, delay: 14 },
    },
  },
};
