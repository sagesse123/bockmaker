// Matches.tsx
import { useState, useEffect } from 'react';
import { Search, Clock } from 'lucide-react';

type Team = {
  id: number;
  name: string;
  crest?: string;
};

type Match = {
  id: number;
  match_date: string;
  competition: { id?: number; name?: string; emblem?: string };
  homeTeam: Team;
  awayTeam: Team;
  status: string;
  home_score?: number | null;
  away_score?: number | null;
};

type Competition = {
  id: number;
  name: string;
  emblem?: string;
};

const mapApiStatus = (s?: string) => {
  if (!s) return 'upcoming';
  const up = s.toUpperCase();
  if (['IN_PLAY', 'LIVE', 'PAUSED'].includes(up)) return 'live';
  if (['FINISHED', 'ENDED', 'CANCELLED', 'POSTPONED'].includes(up)) return 'finished';
  return 'upcoming';
};

// ✅ Fonction pour calculer le temps restant avant le match
const getTimeUntilMatch = (matchDate: string) => {
  const now = new Date();
  const matchTime = new Date(matchDate);
  const diffMs = matchTime.getTime() - now.getTime();

  if (diffMs == 0) return 'In Live ';
  if (diffMs < 0) return 'Finished ';

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const days = Math.floor(diffMinutes / (60 * 24));
  const hours = Math.floor((diffMinutes % (60 * 24)) / 60);
  const minutes = diffMinutes % 60;

  if (days > 0) return `Begin in ${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `Begin at ${hours}h ${minutes}min`;
  return `Begin at ${minutes}min`;
};

// ✅ Priorité d'affichage des statuts
const statusPriority = (status: string) => {
  if (status === 'live') return 1;
  if (status === 'upcoming') return 2;
  return 3; // finished
};

export default function Matches() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompetition, setSelectedCompetition] = useState<number | 'all'>('all');
  const [matches, setMatches] = useState<Match[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(false);

  // ---- Fetch des compétitions ----
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://powerful-almira-sofosprod-2dddd0a4.koyeb.app/api/v1/leagues');
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        const json = await res.json();

        const leagues = (json.leagues || []).map((l: any) => ({
          id: l.id,
          name: l.name,
          emblem: l.emblem ?? l.logo ?? null,
        }));
        setCompetitions(leagues);
      } catch (err: any) {
        console.error('Erreur fetch leagues:', err.message);
      }
    })();
  }, []);

  // ---- Normalisation d’un match ----
  const normalizeFixture = (f: any): Match => ({
    id: f.id,
    match_date: f.utcDate ?? f.match_date,
    competition: {
      id: f.competition?.id,
      name: f.competition?.name,
      emblem: f.competition?.emblem ?? f.competition?.logo ?? null,
    },
    homeTeam: {
      id: f.homeTeam?.id,
      name: f.homeTeam?.name,
      crest: f.homeTeam?.crest ?? f.homeTeam?.logo ?? null,
    },
    awayTeam: {
      id: f.awayTeam?.id,
      name: f.awayTeam?.name,
      crest: f.awayTeam?.crest ?? f.awayTeam?.logo ?? null,
    },
    status: mapApiStatus(f.status),
    home_score: f.score?.fullTime?.home ?? null,
    away_score: f.score?.fullTime?.away ?? null,
  });

  // ---- Fetch des matchs ----
  const fetchMatchesByCompetition = async (competitionId?: number | 'all') => {
    setLoading(true);
    try {
      let matchesData: any[] = [];

      if (competitionId === 'all') {
        const res = await fetch('https://disabled-moira-sagesse123-5f6de789.koyeb.app/api/v1/fixtures');
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        const json = await res.json();
        matchesData = json.fixtures ?? [];
      } else {
        const res = await fetch(`https://disabled-moira-sagesse123-5f6de789.koyeb.app/api/v1/competitions/${competitionId}/matches`);
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        const json = await res.json();
        matchesData = json.matches ?? [];
      }

      const mapped = matchesData.map(normalizeFixture);

      // ✅ Tri selon le statut
      const sorted = mapped.sort((a, b) => statusPriority(a.status) - statusPriority(b.status));

      setMatches(sorted);
    } catch (err: any) {
      console.error('Erreur fetch matches:', err.message);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatchesByCompetition(selectedCompetition);
  }, [selectedCompetition]);

  // ---- Filtrage ----
  const filteredMatches = matches.filter((m) => {
    const q = searchTerm.toLowerCase();
    return !q || m.homeTeam.name.toLowerCase().includes(q) || m.awayTeam.name.toLowerCase().includes(q);
  });

  return (
  <div className="max-w-7xl mx-auto px-4 py-12">
    {/* Barre de recherche et filtre */}
    <div className="mb-8 flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        placeholder="Rechercher une équipe..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full sm:flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={selectedCompetition}
        onChange={(e) =>
          setSelectedCompetition(e.target.value === 'all' ? 'all' : Number(e.target.value))
        }
        className="w-full sm:w-auto bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">Toutes les compétitions</option>
        {competitions.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>

    {/* Contenu des matchs */}
    {loading ? (
      <p className="text-white">Chargement...</p>
    ) : filteredMatches.length === 0 ? (
      <p className="text-slate-400">Aucun match trouvé</p>
    ) : (
      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filteredMatches.map((m) => (
          <div
            key={m.id}
            className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50 hover:border-slate-500 transition-all hover:scale-[1.02] shadow-md"
          >
            <div className="flex justify-between mb-2 items-center">
              <div className="flex items-center gap-2 overflow-hidden">
                {m.competition?.emblem && (
                  <img src={m.competition.emblem} alt="" className="w-5 h-5 rounded-full flex-shrink-0" />
                )}
                <span className="text-blue-400 text-xs truncate">{m.competition?.name}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400 text-xs">
                <Clock size={12} />
                <span className="truncate">{getTimeUntilMatch(m.match_date)}</span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center text-center space-y-2">
              {/* Équipe à domicile */}
              <div className="flex items-center justify-center gap-2 text-white w-full truncate">
                {m.homeTeam.crest && <img src={m.homeTeam.crest} alt="" className="w-6 h-6 flex-shrink-0" />}
                <span className="truncate">{m.homeTeam.name}</span>
              </div>

              {/* Score */}
              <div className="text-lg font-bold text-white">
                {m.status === 'finished' || m.status === 'live'
                  ? `${m.home_score ?? 0} - ${m.away_score ?? 0}`
                  : 'VS'}
              </div>

              {/* Équipe à l’extérieur */}
              <div className="flex items-center justify-center gap-2 text-white w-full truncate">
                <span className="truncate">{m.awayTeam.name}</span>
                {m.awayTeam.crest && <img src={m.awayTeam.crest} alt="" className="w-6 h-6 flex-shrink-0" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
}

