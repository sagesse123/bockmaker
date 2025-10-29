import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Match = {
  id: number;
  competition: { name: string; emblem: string };
  homeTeam: { name: string; crest: string };
  awayTeam: { name: string; crest: string };
  utcDate: string;
  status: string;
  score: { fullTime: { home: number | null; away: number | null } };
};

export default function Calendar() {
  const [matches, setMatches] = useState<Record<string, Match[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>(""); // ✅ Date sélectionnée
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get("https://disabled-moira-sagesse123-5f6de789.koyeb.app/api/v1/calendar");
        if (response.data.status === "success") {
          setMatches(response.data.calendar);
        } else {
          console.error("Erreur lors du chargement du calendrier :", response.data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des matchs :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Chargement du calendrier...</p>;

  // Filtrage des matchs selon la date sélectionnée
  const filteredMatches = selectedDate
    ? { [selectedDate]: matches[selectedDate] || [] }
    : matches;

  const getBoxColor = (status: string) => {
    switch (status) {
      case "FINISHED":
        return "bg-green-50 hover:bg-green-100";
      case "IN_PLAY":
        return "bg-yellow-50 hover:bg-yellow-100";
      default:
        return "bg-white hover:bg-gray-50";
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4 flex items-center gap-2">
        <CalendarIcon className="w-6 h-6 text-blue-600" />
        Calendrier des matchs
      </h1>

      {/* Sélecteur de date */}
    <div className="mb-6">
	  <input
	    type="date"
	    value={selectedDate}
	    onChange={(e) => setSelectedDate(e.target.value)}
	    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
	  />
	</div>
      {/* Affichage des matchs filtrés */}
      {Object.entries(filteredMatches).length === 0 ? (
        <p className="text-gray-500">Aucun match trouvé pour cette date</p>
      ) : (
        Object.entries(filteredMatches).map(([date, matchList]) => (
          <div key={date} className="mb-8">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-blue-700 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              {new Date(date).toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchList.map((match) => (
                <div
                  key={match.id}
                  className={`rounded-xl shadow-md p-4 transition flex flex-col cursor-pointer ${getBoxColor(
                    match.status
                  )}`}
                  onClick={() => navigate(`/matches/${match.id}`)}
                >
                  {/* Logo de la compétition */}
                  <div className="flex items-center justify-between mb-3 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <img
                        src={match.competition.emblem}
                        alt={match.competition.name}
                        className="w-5 sm:w-6 h-5 sm:h-6"
                        onError={(e: any) => (e.target.src = "/default-competition.png")}
                      />
                      <span className="text-xs sm:text-sm md:text-base font-medium text-gray-700 truncate">
                        {match.competition.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {match.status === "IN_PLAY" && (
                        <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                      )}
                      <span className="text-xs text-gray-500">{match.status}</span>
                    </div>
                  </div>

                  {/* Match */}
                  <div className="flex items-center justify-between my-2 flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <img
                        src={match.homeTeam.crest}
                        alt={match.homeTeam.name}
                        className="w-6 h-6 sm:w-8 sm:h-8"
                        onError={(e: any) => (e.target.src = "/default-team.png")}
                      />
                      <span className="text-sm sm:text-base md:text-base lg:text-lg font-semibold truncate">
                        {match.homeTeam.name}
                      </span>
                    </div>

                    <span className="text-gray-600 font-bold flex-shrink-0">
                      {match.status === "TIMED"
                        ? "vs"
                        : `${match.score.fullTime.home ?? 0} - ${match.score.fullTime.away ?? 0}`}
                    </span>

                    <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                      <span className="text-sm sm:text-base md:text-base lg:text-lg font-semibold truncate text-right">
                        {match.awayTeam.name}
                      </span>
                      <img
                        src={match.awayTeam.crest}
                        alt={match.awayTeam.name}
                        className="w-6 h-6 sm:w-8 sm:h-8"
                        onError={(e: any) => (e.target.src = "/default-team.png")}
                      />
                    </div>
                  </div>

                  {/* Heure du match */}
                  <div className="mt-auto text-xs sm:text-sm text-gray-500 text-right">
                    {new Date(match.utcDate).toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

