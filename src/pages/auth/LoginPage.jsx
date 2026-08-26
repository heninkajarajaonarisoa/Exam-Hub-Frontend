import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { User, Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { ErrorBanner } from "../../components/ui";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(email, password);
      const from = location.state?.from;
      const fallback = user.role === "admin" ? "/admin" : "/student";
      navigate(from || fallback, { replace: true });
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#6C5CE7] via-[#A29BFE] to-[#FD79A8] p-4 sm:p-6 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
        <div className="md:col-span-6 bg-gradient-to-br from-[#6C5CE7] via-[#8C7AE6] to-[#E84393] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden text-white">
          <div className="absolute top-[-20%] left-[-10%] w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-28 h-64 bg-gradient-to-t from-[#FF7675]/80 to-[#FAB1A0]/40 rounded-full transform -rotate-45 pointer-events-none" />

          <div className="relative z-10">
            <Link to="/" className="text-xs font-bold tracking-widest uppercase text-white/80 hover:text-white transition-colors">
              ← Retour au site
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

          <div className="relative z-10 text-[11px] text-white/60">© 2026 EXAM HUB Systems</div>
        </div>

        <div className="md:col-span-6 bg-white p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-xs mx-auto w-full space-y-6">
            <div className="text-center">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#6C5CE7]">USER LOGIN</h2>
            </div>

            <ErrorBanner message={error} />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6C5CE7]/60">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#EE5253]/5 border-none rounded-full text-xs text-slate-800 placeholder-[#6C5CE7]/40 focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]/50 transition-all"
                />
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-auto px-8 py-2.5 bg-gradient-to-r from-[#8C7AE6] to-[#E84393] hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md shadow-[#6C5CE7]/30 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Connexion..." : "LOGIN"}
                </button>
              </div>
            </form>

            <div className="text-center text-[10px] text-slate-400 pt-4 space-y-1">
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
