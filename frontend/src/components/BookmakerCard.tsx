import { ExternalLink, Star } from 'lucide-react';
import type { Bookmaker } from '../lib/supabase';

interface BookmakerCardProps {
  bookmaker: Bookmaker;
  featured?: boolean;
  color: string;
}

export default function BookmakerCard({ bookmaker, featured = false, color }: BookmakerCardProps) {
  return (
    <div
      className={`bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all group ${
        featured ? 'shadow-lg shadow-blue-500/20' : ''
      }`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xl"
            style={{ backgroundColor: bookmaker.color }}
          >
            {bookmaker.name.substring(0, 2)}
          </div>
          <div className="flex items-center space-x-1 text-amber-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold">{bookmaker.rating}</span>
          </div>
        </div>

        <h3 className="text-white font-bold text-lg mb-2">{bookmaker.name}</h3>

        {bookmaker.bonus_description && (
          <p className="text-slate-300 text-sm mb-4 line-clamp-2">{bookmaker.bonus_description}</p>
        )}

        <a
          href={bookmaker.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-2.5 rounded-lg font-semibold transition-all shadow-lg shadow-blue-600/30 group-hover:shadow-blue-600/50"
        >
          <span>Parier maintenant</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

