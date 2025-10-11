import { useEffect, useState } from 'react';
import { Gift, Users } from 'lucide-react';

export default function Bonus() {
  const [bonusAmount, setBonusAmount] = useState(99000);
  const [promoUsersCount, setPromoUsersCount] = useState(201587);

  useEffect(() => {
    const updateBonus = () => {
      const newBonus = Math.floor(Math.random() * (100000000 - 99000 + 1)) + 99000;
      animateNumber(setBonusAmount, bonusAmount, newBonus, 2000);

      const nextInterval = Math.floor(Math.random() * 60 + 1) * 60 * 10;
      setTimeout(updateBonus, nextInterval);
    };

    updateBonus();

    const updatePromoUsers = () => {
      const today = new Date();
      const startDate = new Date("2025-08-25");
      const daysElapsed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const currentCount = 201587 + daysElapsed;
      setPromoUsersCount(currentCount);
    };

    updatePromoUsers();
  }, []);

  const animateNumber = (setter: (val: number) => void, start: number, end: number, duration: number) => {
    const startTime = Date.now();
    const animate = () => {
      const currentTime = Date.now();
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      setter(value);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 py-4 px-6">
          <h1 className="text-white text-2xl font-bold text-center">
            Total de tous les bonus disponibles:
          </h1>
        </div>

        <div className="py-12 px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            {bonusAmount.toLocaleString()} $
          </h1>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 py-6 px-6">
          <div className="text-center">
            <p className="text-white text-lg">
              Inscris-toi maintenant avec le code promo et fais partie des gagnants.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 text-center shadow-xl">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Users className="w-8 h-8 text-green-400" />
          <h2 className="text-white text-2xl font-bold">
            Nombre de parieurs utilisant le code LTEPRO:
          </h2>
        </div>
        <p className="text-5xl font-bold text-green-400">
          {promoUsersCount.toLocaleString()}
        </p>
      </div>

      <div className="mt-12 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/50 rounded-2xl p-8 text-center">
        <Gift className="w-16 h-16 text-amber-400 mx-auto mb-4" />
        <h2 className="text-white text-2xl font-bold mb-4">
          Profitez des meilleurs bonus maintenant
        </h2>
        <p className="text-slate-300 text-lg mb-6">
          Rejoignez des milliers de parieurs qui utilisent le code LTEPRO pour maximiser leurs gains
        </p>
        <a
          href="/promo-code"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-amber-500/30"
        >
          <span>Découvrir le code promo</span>
        </a>
      </div>
    </div>
  );
}

