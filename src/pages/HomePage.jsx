import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  FileCheck2, 
  Clock, 
  BarChart3, 
  Award,
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#fafaf9] text-slate-900 font-mono tracking-tight">
      

      <header className="max-w-7xl mx-auto px-8 pt-8 pb-4">
        <div className="flex justify-between items-center pb-6 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-900 text-stone-100 rounded-sm">
              <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-none">EXAM HUB</h1>
              <p className="text-[10px] uppercase tracking-widest text-stone-500 font-medium mt-1">Plateforme & Évaluation</p>
            </div>
          </div>

          <div className="hidden sm:flex gap-10 text-[11px] uppercase tracking-wider text-stone-500">
            <div>
              <span className="block text-stone-400 font-light">Écrivez-nous</span>
              <span className="text-slate-900 font-bold lowercase">contact@examhub.edu</span>
            </div>
            <div>
              <span className="block text-stone-400 font-light">Appelez-nous</span>
              <span className="text-slate-900 font-bold">+261 34 00 000 00</span>
            </div>
          </div>
        </div>

        
        <div className="flex justify-between items-center pt-5 text-xs uppercase tracking-widest text-stone-600 font-semibold">
          <nav className="flex gap-8">
            <a href="#about" className="hover:text-black transition-colors">À Propos</a>
            <a href="#features" className="hover:text-black transition-colors">Fonctionnalités</a>
            <a href="#impact" className="hover:text-black transition-colors">Statistiques</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </nav>

          <div>
            <Link
              to="/login"
              className="text-xs uppercase tracking-widest font-bold text-slate-900 hover:text-stone-600 border-b-2 border-slate-900 pb-0.5 transition-all"
            >
              Se Connecter
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-8 my-6">
        <div className="bg-[#f3f2ee] p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between min-h-[460px] relative border border-stone-200">
          
          <div className="lg:w-1/2 space-y-6 z-10">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.15]">
              Bienvenue sur <br />
              <span className="text-slate-900 underline decoration-stone-400 decoration-2 underline-offset-8">EXAM HUB</span>
            </h2>
            
            <p className="text-base sm:text-lg text-stone-600 font-medium tracking-normal">
              Plateforme certifiée de gestion d'examens QCM —
            </p>

            <div className="pt-4">
              <Link
                to="/login"
                className="inline-block border-2 border-slate-900 bg-transparent text-slate-900 hover:bg-slate-900 hover:text-white px-8 py-3 text-xs uppercase tracking-widest font-bold transition-all duration-200"
              >
                Accéder à l'espace
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center lg:justify-end z-10">
            <div className="bg-white p-10 border-2 border-stone-300 shadow-lg max-w-sm w-full space-y-6">
              <div className="flex items-center gap-4 pb-4 border-b border-stone-200">
                <ShieldCheck className="w-8 h-8 text-slate-900 stroke-[1.5]" />
                <div>
                  <p className="font-bold text-base text-slate-900">Session d'Évaluation</p>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Système Certifié v2.0</p>
                </div>
              </div>
              <div className="space-y-3 text-xs text-stone-700 font-semibold">
                <p>— Génération automatisée des sujets</p>
                <p>— Correction instantanée sécurisée</p>
                <p>— Édition des procès-verbaux</p>
              </div>
              <div className="pt-2">
                <span className="block w-full text-center bg-slate-900 text-stone-100 py-3 text-[10px] uppercase tracking-widest font-bold">
                  Service d'Évaluation Actif
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section id="features" className="max-w-7xl mx-auto px-8 py-16 relative">
        <button className="absolute left-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-black transition-colors">
          <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
        </button>
        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-black transition-colors">
          <ChevronRight className="w-6 h-6 stroke-[1.5]" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div className="space-y-4">
            <FileCheck2 className="w-8 h-8 text-amber-600 stroke-[1.5]" />
            <h3 className="text-base font-bold text-slate-900">
              Création QCM <span className="text-stone-400">—</span>
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              Créez et structurez vos épreuves avec élégance et simplicité grâce à notre banque de questions.
            </p>
          </div>

          <div className="space-y-4">
            <Clock className="w-8 h-8 text-amber-600 stroke-[1.5]" />
            <h3 className="text-base font-bold text-slate-900">
              Gestion du Temps <span className="text-stone-400">—</span>
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              Définissez des fenêtres d'examen précises et des chronomètres automatisés pour chaque épreuve.
            </p>
          </div>

          <div className="space-y-4">
            <BarChart3 className="w-8 h-8 text-amber-600 stroke-[1.5]" />
            <h3 className="text-base font-bold text-slate-900">
              Correction Directe <span className="text-stone-400">—</span>
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              Obtenez le calcul automatique des résultats et un classement instantané des promotions.
            </p>
          </div>

          <div className="space-y-4">
            <Award className="w-8 h-8 text-amber-600 stroke-[1.5]" />
            <h3 className="text-base font-bold text-slate-900">
              Rapports Détaillés <span className="text-stone-400">—</span>
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              Accédez à des données analytiques poussées et suivez l'évolution académique globale.
            </p>
          </div>

        </div>
      </section>

      <section id="about" className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="absolute -left-4 -bottom-4 w-full h-full bg-[#dbe4d8] z-0 border border-stone-300"></div>
            
            <div className="relative z-10 bg-slate-900 text-stone-100 p-10 space-y-6 shadow-xl">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
                  Architecture & Infrastructure
                </span>
                <h4 className="text-2xl font-bold leading-tight">Conçu Pour L'Excellence Académique</h4>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-medium">
                EXAM HUB garantit la confidentialité de vos sujets, la centralisation des données d'évaluation et une stabilité parfaite lors des sessions à fort trafic.
              </p>
              <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-stone-400">
                <span>Infrastructure certifiée</span>
                <span className="text-emerald-400 font-bold text-[10px] uppercase tracking-wider">✓ Opérationnel</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 pl-0 lg:pl-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              Quelques Mots À <br />
              <span>Propos d'Exam Hub</span>
            </h2>

            <p className="text-base text-stone-600 font-semibold">
              L'évaluation académique propulsée par l'innovation —
            </p>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
              Nous proposons une solution raffinée et hautement sécurisée permettant aux universités et établissements d'enseignement supérieur d'optimiser leurs processus d'évaluation. Notre plateforme élimine le temps consacré aux corrections manuelles et garantit une rigueur absolue dans le traitement des résultats.
            </p>

            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs text-slate-900 pt-2 font-bold tracking-wide">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-slate-900 stroke-[2.5]" />
                <span>Gestion d'Examens</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-slate-900 stroke-[2.5]" />
                <span>Banque de Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-slate-900 stroke-[2.5]" />
                <span>Calcul Automatique</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-slate-900 stroke-[2.5]" />
                <span>Analyse Statistique</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-slate-900 stroke-[2.5]" />
                <span>Sécurité Avancée</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-slate-900 stroke-[2.5]" />
                <span>Exportation des PV</span>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed font-medium pt-2">
              Une solution clé en main développée pour s'adapter à vos exigences pédagogiques et administratives.
            </p>

            <div className="pt-4">
              <Link
                to="/login"
                className="inline-block border-2 border-slate-900 bg-transparent text-slate-900 hover:bg-slate-900 hover:text-white px-8 py-3 text-xs uppercase tracking-widest font-bold transition-all duration-200"
              >
                Se Connecter
              </Link>
            </div>
          </div>

        </div>
      </section>

      <footer id="contact" className="border-t border-stone-300 mt-20 py-10 text-xs text-stone-600 font-medium">
        <div className="max-w-7xl mx-auto px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Exam Hub — Tous droits réservés.</p>
          <div className="flex gap-8 uppercase tracking-widest text-[10px] font-bold">
            <a href="#about" className="hover:text-slate-900 transition-colors">Mentions légales</a>
            <a href="#contact" className="hover:text-slate-900 transition-colors">Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;