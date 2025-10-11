import { useState, useEffect } from "react";
import axios from "axios";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";

type TeamStanding = {
  position: number;
  team: {
    id: string;
    name: string;
    crest?: string;
  };
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  points: number;
};

type League = {
  id: string;
  name: string;
  emblem?: string;
};

export default function Standings() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [standings, setStandings] = useState<TeamStanding[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 🔹 Récupération dynamique des compétitions
  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/v1/leagues");
        if (res.data.status === "success") {
          setLeagues(res.data.leagues);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des compétitions :", err);
      }
    };
    fetchLeagues();
  }, []);

  // 🔹 Récupération des classements pour la compétition sélectionnée
useEffect(() => {
  if (!selectedLeague) return;

  const fetchStandings = async () => {
    try {
      setStandings(null); // reset avant chargement
      setLoading(true);

      const res = await axios.get(
        `http://127.0.0.1:8000/api/v1/leagues/${selectedLeague}/standings`
      );

      // On récupère la table depuis le premier élément de standings
      const table = res.data.standings?.[0]?.table ?? [];
      const currentStandings: TeamStanding[] = table.map((s: any) => ({
        position: s.position,
        played: s.playedGames,
        won: s.won,
        drawn: s.draw,
        lost: s.lost,
        goals_for: s.goalsFor,
        goals_against: s.goalsAgainst,
        points: s.points,
        team: {
          id: s.team?.id ?? `team-${Math.random()}`,
          name: s.team?.name ?? "Inconnu",
          crest: s.team?.crest ?? "", // évite l'erreur undefined
        },
      }));

      setStandings(currentStandings);
    } catch (err) {
      console.error("Erreur lors de la récupération des classements :", err);
      setStandings([]);
    } finally {
      setLoading(false);
    }
  };

  fetchStandings();
}, [selectedLeague]);


  const getPositionIndicator = (index: number, length: number) => {
    if (index === 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (index === length - 1) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-slate-600" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-2">
          <Trophy className="w-8 h-8 text-yellow-400" /> Classements
        </h1>
        <p className="text-slate-400 text-lg">Classements des compétitions pour la saison actuelle</p>
      </div>

      {/* 🔹 Selector dynamique */}
      <div className="mb-8 flex flex-wrap gap-2">
        {leagues.map((league) => (
          <button
            key={league.id}
            onClick={() => {
              setSelectedLeague(league.id);
              setStandings(null); // reset avant le chargement
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              selectedLeague === league.id
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-slate-800/50 text-slate-300 hover:text-white border border-slate-700/50"
            }`}
          >
            {league.emblem && (
              <img src={league.emblem} alt={league.name} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full" />
            )}
            {league.name}
          </button>
        ))}
      </div>

      {/* 🔹 Tableau des classements */}
      {standings === null ? (
        <div className="text-center text-slate-400 py-12">
          Veuillez sélectionner une compétition pour afficher les classements.
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
        </div>
      ) : standings.length === 0 ? (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700/50 text-center">
          <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <div className="text-slate-400 text-lg mb-2">Aucun classement disponible</div>
          <p className="text-slate-500">Les classements seront mis à jour prochainement</p>
        </div>
      ) : (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-slate-900/50">
		  <tr className="border-b border-slate-700/50">
		    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Pos</th>
		    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Équipe</th>
		    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">J</th>
		    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">G</th>
		    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">N</th>
		    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">P</th>
		    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">BP</th>
		    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">BC</th>
		    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Diff</th>
		    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Pts</th>
		  </tr>
		</thead>
		<tbody className="divide-y divide-slate-700/50">
		  {standings.map((team, index) => {
		    const goalDiff = team.goals_for - team.goals_against;

		    return (
		      <tr
			key={team.team.id}
			className="hover:bg-slate-700/30 transition-colors text-center"
		      >
			{/* Rang */}
			<td className="px-4 py-3 text-slate-200 font-semibold">
			  {team.position}
			</td>

			{/* Équipe */}
			<td className="px-4 py-3">
			  <div className="flex items-center gap-2 justify-start">
			    {team.team.crest && (
			      <img
				src={team.team.crest}
				alt={team.team.name}
				className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
			      />
			    )}
			    <span className="text-white font-medium truncate max-w-[150px]">
			      {team.team.name}
			    </span>
			  </div>
			</td>

			{/* MJ */}
			<td className="px-4 py-3 text-slate-300">{team.played}</td>

			{/* MG */}
			<td className="px-4 py-3 text-green-400 font-semibold">{team.won}</td>

			{/* MN */}
			<td className="px-4 py-3 text-slate-400">{team.drawn}</td>

			{/* MP */}
			<td className="px-4 py-3 text-red-400 font-semibold">{team.lost}</td>

			{/* But M */}
			<td className="px-4 py-3 text-slate-300">{team.goals_for}</td>

			{/* But E */}
			<td className="px-4 py-3 text-slate-300">{team.goals_against}</td>

			{/* Diff */}
			<td className="px-4 py-3">
			  <span
			    className={`font-semibold ${
			      goalDiff > 0
				? "text-green-400"
				: goalDiff < 0
				? "text-red-400"
				: "text-slate-400"
			    }`}
			  >
			    {goalDiff > 0 ? "+" : ""}
			    {goalDiff}
			  </span>
			</td>

			{/* Points */}
			<td className="px-4 py-3 text-white font-bold">{team.points}</td>
		      </tr>
		    );
		  })}
		</tbody>

          </table>
        </div>
      )}
    </div>
  );
}

