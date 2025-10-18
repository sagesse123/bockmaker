import { Link } from 'react-router-dom';
import { TrendingUp, Calendar, Trophy, Gift, ArrowRight } from 'lucide-react';
import BookmakerCard from '../components/BookmakerCard';

type Bookmaker = {
  id: number;
  name: string;
  logo: string;
  rating: number;
  color: string; // Ajout d'une couleur pour respecter la charte
};

export default function Home() {
   const bookmakers: Bookmaker[] = [
    { id: 1, name: '1XBET', rating: 4.8, color: '#1E40AF', bonus_description: '100% jusqu’à 200€', url: 'https://reffpa.com/L?tag=d_4654245m_97c_&site=4654245&ad=97' },
    { id: 2, name: 'MELBET', rating: 4.7, color: '#F59E0B', bonus_description: 'Bonus de bienvenue 100€', url: 'https://refpa3665.com/L?tag=d_4687174m_45415c_&site=4687174&ad=45415' },
    { id: 3, name: 'BETWINNER', rating: 4.6, color: '#16A34A', bonus_description: '100% jusqu’à 130€', url: 'https://betwinner.com/' },
    { id: 4, name: 'MOSTBET', rating: 4.5, color: '#EF4444', bonus_description: '125% jusqu’à 300€', url: 'https://mostbet.com/' },
    { id: 5, name: 'MEGAPARI', rating: 4.4, color: '#374151', bonus_description: 'Bonus de 100% au dépôt', url: 'https://refpazitag.top/L?tag=d_1168201m_25437c_&site=1168201&ad=25437' },
    { id: 6, name: 'BETANDYOU', rating: 4.3, color: '#2563EB', bonus_description: 'Bonus exclusif jusqu’à 150€', url: 'https://betandyou.com/' },
    { id: 7, name: 'LINEBET', rating: 4.2, color: '#6B7280', bonus_description: 'Jusqu’à 100€ offerts', url: 'https://linebet.com/' },
    { id: 8, name: 'PARIPESA', rating: 4.1, color: '#9333EA', bonus_description: 'Bonus de bienvenue 100%', url: 'https://paripesa.bet/ltrpro' },
  ];

  const loading = false;

  const features = [
    {
      icon: TrendingUp,
      title: 'Meilleures cotes',
      description: 'Comparez les cotes en temps réel de tous les bookmakers',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Calendar,
      title: 'Calendrier complet',
      description: 'Tous les matchs à venir dans vos compétitions préférées',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Trophy,
      title: 'Classements live',
      description: 'Suivez les classements de toutes les grandes ligues',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Gift,
      title: 'Bonus exclusifs',
      description: 'Profitez des meilleurs bonus de bienvenue',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Comparez les meilleures{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                cotes sportives
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Trouvez les meilleures opportunités de paris sur tous vos sports favoris.
              Comparez les bonus, les cotes et maximisez vos gains.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/matches"
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-2xl shadow-blue-600/50 hover:shadow-blue-600/70 hover:scale-105"
              >
                <span>Voir les matchs</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/bookmakers"
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-2xl shadow-blue-600/50 hover:shadow-blue-600/70 hover:scale-105"
              >
                <span>Inscrivez vous</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/bonus"
                className="flex items-center space-x-2 bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700 border border-slate-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
              >
                <Gift className="w-5 h-5" />
                <span>Bonus exclusifs</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all group"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bookmakers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Nos partenaires bookmakers
          </h2>
          <p className="text-slate-400 text-lg">
            Les plateformes les plus fiables et les mieux notées
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
	  {bookmakers.map((bookmaker) => (
	    <a
	      key={bookmaker.id}
	      href={bookmaker.url || '#'}
	      target="_blank"
	      rel="noopener noreferrer"
	      className="block" // pour garder le style de carte cliquable
	    >
	      <BookmakerCard
		bookmaker={bookmaker}
		featured={bookmaker.rating >= 4.5}
		color={bookmaker.color}
	      />
	    </a>
	  ))}
	</div>

        )}

        <div className="text-center">
          <Link
            to="/bookmakers"
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            <span>Voir tous les bookmakers</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

