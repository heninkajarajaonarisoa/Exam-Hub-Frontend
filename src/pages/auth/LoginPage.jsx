import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User, Lock, Check } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { ErrorBanner } from "../../components/ui";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(formData.email, formData.password);
      const from = location.state?.from;
      const fallback = user.role === "admin" ? "/admin" : "/student";
      navigate(from || fallback, { replace: true });
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de la connexion.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#6C5CE7] via-[#A29BFE] to-[#FD79A8] p-4 sm:p-6 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
        
        {/* Panneau gauche */}
        <div className="md:col-span-6 bg-gradient-to-br from-[#6C5CE7] via-[#8C7AE6] to-[#E84393] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden text-white">
          <div className="absolute top-[-20%] left-[-10%] w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-28 h-64 bg-gradient-to-t from-[#FF7675]/80 to-[#FAB1A0]/40 rounded-full transform -rotate-45 pointer-events-none" />
          <div className="absolute bottom-[10%] left-[25%] w-20 h-52 bg-gradient-to-t from-[#FF7675]/90 to-[#FFEAA7]/40 rounded-full transform -rotate-45 pointer-events-none" />
          <div className="absolute bottom-[30%] left-[50%] w-16 h-40 bg-gradient-to-t from-[#FD79A8] to-[#FAB1A0]/30 rounded-full transform -rotate-45 pointer-events-none" />
          <div className="absolute bottom-[25%] left-[15%] w-2 h-24 bg-amber-300/60 rounded-full transform -rotate-45 pointer-events-none" />
          <div className="absolute bottom-[40%] left-[38%] w-1.5 h-20 bg-amber-200/50 rounded-full transform -rotate-45 pointer-events-none" />

          <div className="relative z-10">
            <Link to="/" className="text-xs font-bold tracking-widest uppercase text-white/80 hover:text-white transition-colors">
              ← EXAM HUB
            </Link>
          </div>

          <div className="relative z-10 my-auto py-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
              Bienvenue sur <br />EXAM HUB
            </h1>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-sm">
              Accédez à votre espace d'évaluation sécurisé, gérez vos épreuves QCM et consultez vos résultats en temps réel.
            </p>
          </div>

          <div className="relative z-10 text-[11px] text-white/60">
            © 2026 EXAM HUB Systems
          </div>
        </div>

        {/* Formulaire droit */}
        <div className="md:col-span-6 bg-white p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-xs mx-auto w-full space-y-6">
            <div className="text-center">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#6C5CE7]">
                Espace Connexion
              </h2>
            </div>

            {error && <ErrorBanner message={error} />}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6C5CE7]/60">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Adresse email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#EE5253]/5 border-none rounded-full text-xs text-slate-800 placeholder-[#6C5CE7]/40 focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]/50 transition-all"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6C5CE7]/60">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#EE5253]/5 border-none rounded-full text-xs text-slate-800 placeholder-[#6C5CE7]/40 focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]/50 transition-all"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 px-1">
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={formData.remember}
                      onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                      className="sr-only"
                    />
                    <div className={`w-3.5 h-3.5 rounded flex items-center justify-center transition-colors ${
                      formData.remember ? 'bg-[#6C5CE7]' : 'border border-slate-300 bg-white'
                    }`}>
                      {formData.remember && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                    </div>
                  </div>
                  <span>Se souvenir</span>
                </label>

                <a href="#forgot" className="hover:text-[#6C5CE7] transition-colors">
                  Mot de passe oublié ?
                </a>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-auto px-8 py-2.5 bg-gradient-to-r from-[#8C7AE6] to-[#E84393] hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md shadow-[#6C5CE7]/30 transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? "Connexion..." : "Connexion"}
                </button>
              </div>
            </form>

            <div className="text-center text-[10px] text-slate-400 pt-2 space-y-0.5">
              <p className="font-bold text-slate-500">Comptes de test</p>
              <p>admin@hei.mg / admin123</p>
              <p>rina@hei.mg / student123</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}