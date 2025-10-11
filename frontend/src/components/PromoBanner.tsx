import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PromoBanner() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* ✅ Bandeau promo */}
      <div className="w-full bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white py-3 px-6 flex items-center justify-between shadow-lg">
        <span className="text-sm sm:text-base font-medium tracking-wide">
          🎉 Inscrivez-vous avec notre code promo
        </span>

        {/* ✅ Bouton LTEPRO clignotant */}
        <button
          onClick={() => setOpen(true)}
          className="relative ml-4 px-5 py-2 rounded-full font-extrabold text-indigo-700 bg-white shadow-lg overflow-hidden animate-blink-glow hover:scale-105 transition-transform duration-300"
        >
          {/* Halo lumineux animé */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 blur-lg opacity-80 animate-glow-pulse"></span>
          <span className="relative z-10">LTEPRO</span>
        </button>
      </div>

      {/* ✅ Modal d'information */}
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              🔗 Utilisez le code promo{" "}
              <span className="text-indigo-600 font-bold">LTEPRO</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Cliquez sur le bouton ci-dessous pour découvrir nos bookmakers partenaires.
            </p>
            <button
              onClick={() => {
                setOpen(false);
                navigate("/bookmakers");
              }}
              className="bg-indigo-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-indigo-700 transition-colors"
            >
              Voir les bookmakers
            </button>
          </div>
        </div>
      )}
    </>
  );
}

