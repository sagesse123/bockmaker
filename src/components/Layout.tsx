import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Trophy, Gift, Menu, X } from "lucide-react";
import PromoBanner from "./PromoBanner"; // 🔥 Ajout du bandeau promo

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Accueil" },
    { path: "/matches", label: "Matchs" },
    { path: "/calendar", label: "Calendrier" },
    { path: "/standings", label: "Classements" },
    { path: "/bonus", label: "Bonus" },
    { path: "/promo-code", label: "Code Promo" },
    { path: "/bookmakers", label: "Bookmakers" },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* NAVBAR */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Trophy className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Best Promo
              </span>
            </Link>

            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    location.pathname === item.path
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/50"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <Link
                to="/bonus"
                className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg shadow-orange-500/50 hover:shadow-orange-600/50"
              >
                <Gift className="w-5 h-5" />
                <span>Bonus</span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                    location.pathname === item.path
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/bonus"
                onClick={closeMobileMenu}
                className="sm:hidden flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-3 rounded-lg font-semibold mt-2"
              >
                <Gift className="w-5 h-5" />
                <span>Bonus Exclusifs</span>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* 🔥 Bandeau promo visible sur toutes les pages */}
      <PromoBanner />

      <main className="min-h-[calc(100vh-4rem)]">{children}</main>

      {/* FOOTER */}
      <footer className="bg-slate-900/80 backdrop-blur-md border-t border-slate-700/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Best Promo</h3>
              <p className="text-slate-400 text-sm">
                Votre plateforme de référence pour comparer les meilleures cotes et bonus des bookmakers.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
              <p className="text-slate-400 text-sm mb-2">
                Contact télégramme:{" "}
                <a
                  href="https://t.me/tfahaku"
                  className="text-blue-400 hover:text-blue-300"
                >
                  @tfahaku
                </a>
              </p>
              <p className="text-slate-400 text-sm">
                Canal télégramme:{" "}
                <a
                  href="https://t.me/rejoindre"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Rejoindre
                </a>
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-700/50">
            <p className="text-center text-slate-500 text-sm">
              © 2025 Best Promo. Tous droits réservés. Jouez responsable.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

