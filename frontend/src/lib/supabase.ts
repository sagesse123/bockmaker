import { Match } from "../types/api";

const COMPETITIONS = [
  { id: 2001, name: "Champions League" },
  { id: 2014, name: "La Liga" },
  { id: 2021, name: "Premier League" },
  { id: 2015, name: "Ligue 1" },
  { id: 2019, name: "Serie A" },
  { id: 2002, name: "Bundesliga" }
];

export class MatchService {
  private static instance: MatchService;

  private constructor() {}

  public static getInstance(): MatchService {
    if (!MatchService.instance) {
      MatchService.instance = new MatchService();
    }
    return MatchService.instance;
  }

  // Récupérer tous les matchs pour toutes les compétitions via le proxy Express
  public async getAllCompetitionsMatches(): Promise<{ competition: string; matches: Match[] }[]> {
    try {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const formatDate = (d: Date) => d.toISOString().split("T")[0];

      const allData = await Promise.all(
        COMPETITIONS.map(async (comp) => {
          const res = await fetch(
            `/api/competitions/${comp.id}/matches?dateFrom=${formatDate(
              yesterday
            )}&dateTo=${formatDate(tomorrow)}`
          );
          if (!res.ok) throw new Error(`Erreur API pour ${comp.name}: ${res.status}`);
          const data = await res.json();

          const matches: Match[] = (data.matches ?? []).map((m: any, index: number) => {
            let customStatus = "Bientôt";
            if (m.status === "FINISHED") {
              customStatus = "Terminé";
            } else if (["LIVE", "IN_PLAY", "PAUSED"].includes(m.status)) {
              customStatus = "En cours";
            }

            const startTime = m.utcDate ? new Date(m.utcDate) : null;
            const remainingTime = this.calculateRemainingTime(customStatus, startTime);

            return {
              id: m.id ?? index + 1,
              homeTeam: m.homeTeam?.name ?? "Inconnu",
              awayTeam: m.awayTeam?.name ?? "Inconnu",
              homeScore: m.score?.fullTime?.home ?? 0,
              awayScore: m.score?.fullTime?.away ?? 0,
              time: customStatus,
              isLive: customStatus === "En cours",
              viewers: this.generateViewerCount(),
              homeOdds: undefined,
              drawOdds: undefined,
              awayOdds: undefined,
              league: comp.name,
              startTime: m.utcDate,
              remainingTime // ajout du temps restant ou minutes jouées
            };
          });

          matches.sort(
            (a, b) =>
              new Date(a.startTime ?? "").getTime() - new Date(b.startTime ?? "").getTime()
          );

          return { competition: comp.name, matches };
        })
      );

      return allData;
    } catch (err) {
      console.error("Erreur lors de la récupération des compétitions :", err);
      return []; // fallback vide
    }
  }

  private generateViewerCount(): string {
    const viewers = Math.floor(Math.random() * 100000) + 10000;
    return viewers >= 1000 ? `${(viewers / 1000).toFixed(1)}k` : viewers.toString();
  }

  private calculateRemainingTime(status: string, startTime: Date | null): string {
    if (!startTime) return "";

    const now = new Date();

    if (status === "Bientôt") {
      const diff = startTime.getTime() - now.getTime();
      if (diff <= 0) return "Bientôt";
      const minutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(minutes / 60);
      return hours > 0 ? `Dans ${hours}h ${minutes % 60}min` : `Dans ${minutes}min`;
    }

    if (status === "En cours") {
      const diff = now.getTime() - startTime.getTime();
      const minutesPlayed = Math.floor(diff / (1000 * 60));
      return `${minutesPlayed}'`;
    }

    return "";
  }
}
