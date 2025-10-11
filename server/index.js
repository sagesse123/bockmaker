import express from "express";
import fetch from "node-fetch";
import cors from "cors";
// 3c1a902f626c4641a74c48c5b24f67ff       4c6f9c36443a4335894fcdd4f70f8cc0
const app = express();
const PORT = 5000;
const BASE_URL = "https://api.football-data.org/v4";
const API_KEY = "4c6f9c36443a4335894fcdd4f70f8cc0" ;

app.use(cors());

// Endpoint proxy pour récupérer les matchs d'une compétition
app.get("/api/competitions/:id/matches", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await fetch(`${BASE_URL}/competitions/${id}/matches`, {
      headers: { "X-Auth-Token": API_KEY }
    });

    if (!response.ok) {
      return res.status(response.status).send({ error: "Erreur API" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
// Liste des compétitions cibles
const COMPETITIONS = [
  { id: 2001, name: "Champions League" },
  { id: 2021, name: "Premier League" },
  { id: 2014, name: "La Liga" },
 
];

// server/index.ts
app.get("/api/competitions", async (req, res) => {
  try {
    const results = await Promise.all(
      COMPETITIONS.map(async (comp) => {
        const url = `${BASE_URL}/competitions/${comp.id}/matches`;
        const response = await fetch(url, {
          headers: {
            "X-Auth-Token": API_KEY,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text(); // affiche la réponse brute
          console.error(`Erreur API pour ${comp.name}: ${response.status} - ${errorText}`);
          return { competition: comp.name, matches: [] };
        }

        const data = await response.json();
        return {
          competition: comp.name,
          matches: data.matches || [],
        };
      })
    );

    res.json(results);
  } catch (error) {
    console.error("Erreur serveur:", error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Erreur interne" });
  }
});

app.listen(PORT, () => console.log(`Serveur proxy démarré sur http://localhost:${PORT}`));
