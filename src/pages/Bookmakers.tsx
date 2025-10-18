import { useState } from 'react';
import { Star, ExternalLink, Shield, Clock, CreditCard } from 'lucide-react';

type Bookmaker = {
  id: number;
  name: string;
  rating: number;
  color: string;
  bonus_description?: string;
  url?: string;
};

export default function Bookmakers() {
  const [sortBy, setSortBy] = useState<'rating' | 'name'>('rating');

  const initialBookmakers: Bookmaker[] = [
    { id: 1, name: '1XBET', rating: 4.8, color: '#1E40AF', bonus_description: '100% jusqu’à 200€', url: 'https://reffpa.com/L?tag=d_4654245m_97c_&site=4654245&ad=97' },
    { id: 2, name: 'MELBET', rating: 4.7, color: '#F59E0B', bonus_description: 'Bonus de bienvenue 100€', url: 'https://refpa3665.com/L?tag=d_4687174m_45415c_&site=4687174&ad=45415' },
    { id: 3, name: 'BETWINNER', rating: 4.6, color: '#16A34A', bonus_description: '100% jusqu’à 130€', url: 'https://betwinner.com/' },
    { id: 4, name: 'MOSTBET', rating: 4.5, color: '#EF4444', bonus_description: '125% jusqu’à 300€', url: 'https://mostbet.com/' },
    { id: 5, name: 'MEGAPARI', rating: 4.4, color: '#374151', bonus_description: 'Bonus de 100% au dépôt', url: 'https://refpazitag.top/L?tag=d_1168201m_25437c_&site=1168201&ad=25437' },
    { id: 6, name: 'BETANDYOU', rating: 4.3, color: '#2563EB', bonus_description: 'Bonus exclusif jusqu’à 150€', url: 'https://betandyou.com/' },
    { id: 7, name: 'LINEBET', rating: 4.2, color: '#6B7280', bonus_description: 'Jusqu’à 100€ offerts', url: 'https://linebet.com/' },
    { id: 8, name: 'PARIPESA', rating: 4.1, color: '#9333EA', bonus_description: 'Bonus de bienvenue 100%', url: 'https://paripesa.bet/ltrpro' },
  ];

  const bookmakers = [...initialBookmakers].sort((a, b) => (sortBy === 'rating' ? b.rating - a.rating : a.name.localeCompare(b.name)));
  const loading = false;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Tous les Bookmakers</h1>
        <p className="text-slate-400 text-lg">Comparez les meilleurs sites de paris sportifs en ligne</p>
      </div>

      {/* Sélecteur de tri */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-slate-300">
            <span className="font-semibold text-white">{bookmakers.length}</span> bookmakers disponibles
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-sm">Trier par:</span>
            <button
              onClick={() => setSortBy('rating')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                sortBy === 'rating' ? 'bg-blue-600 text-white' : 'bg-slate-700/50 text-slate-300 hover:text-white'
              }`}
            >
              Note
            </button>
            <button
              onClick={() => setSortBy('name')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                sortBy === 'name' ? 'bg-blue-600 text-white' : 'bg-slate-700/50 text-slate-300 hover:text-white'
              }`}
            >
              Nom
            </button>
          </div>
        </div>
      </div>

      {/* Bookmakers list */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
        </div>
      ) : (
        <div className="space-y-6">
          {bookmakers.map((bookmaker, index) => (
            <div
              key={bookmaker.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all overflow-hidden group"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex items-center justify-center w-16 h-16 bg-slate-700/50 rounded-lg text-slate-400 font-bold text-2xl">
                      {index + 1}
                    </div>

                    <div
                      className="w-20 h-20 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                      style={{ backgroundColor: bookmaker.color }}
                    >
                      {bookmaker.name.substring(0, 2)}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-white font-bold text-2xl mb-2">{bookmaker.name}</h3>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-amber-400 fill-current" />
                          <span className="text-white font-semibold">{bookmaker.rating}</span>
                          <span className="text-slate-400">/5</span>
                        </div>
                        <div className="text-slate-400">|</div>
                        <div className="text-slate-400">Note basée sur l'expérience utilisateur</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-3">
                    {bookmaker.bonus_description && (
                      <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/50 px-4 py-2 rounded-lg">
                        <div className="text-amber-400 text-sm font-semibold">{bookmaker.bonus_description}</div>
                      </div>
                    )}
                    {/* Bouton Visiter le site vers page d'accueil */}
                    <a
                      href={bookmaker.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-blue-600/30 group-hover:shadow-blue-600/50"
                    >
                      <span>Inscrivez vous</span>
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="bg-blue-600/20 p-2 rounded-lg">
                        <Shield className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Sécurisé</div>
                        <div className="text-slate-400">Licence officielle</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="bg-green-600/20 p-2 rounded-lg">
                        <Clock className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Paiements rapides</div>
                        <div className="text-slate-400">Retraits en 24-48h</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="bg-purple-600/20 p-2 rounded-lg">
                        <CreditCard className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Multiples options</div>
                        <div className="text-slate-400">Carte, crypto, e-wallet</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

