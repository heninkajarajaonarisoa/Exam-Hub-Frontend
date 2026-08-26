import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
      <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-orange-500/20">
        <ShieldCheck className="w-6 h-6" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
        Exam<span className="text-orange-500">Hub</span>
      </h1>
      <p className="text-sm text-slate-500 max-w-sm mb-6">
        Prototype de routing — la vraie landing page (déjà designée) se branche ici.
      </p>
      <Link to="/login" className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20">
        Se connecter
      </Link>
    </div>
  );
}
