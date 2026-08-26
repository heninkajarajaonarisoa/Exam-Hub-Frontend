import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  FileCheck2, 
  Clock, 
  BarChart3, 
  Award,
  Play,
  Sparkles
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-700 font-sans antialiased overflow-x-hidden">
      
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between animate-bounce-down">
        
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold shadow-md shadow-orange-500/20">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-slate-900 text-lg tracking-tight">
            Exam<span className="text-orange-500">Hub</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
          <a href="#home" className="text-orange-500 font-bold">Home</a>
          <a href="#about" className="hover:text-orange-500 transition-colors">About us</a>
          <a href="#services" className="hover:text-orange-500 transition-colors">Services</a>
          <a href="#process" className="hover:text-orange-500 transition-colors">Process</a>
          <a href="#blog" className="hover:text-orange-500 transition-colors">Blog</a>
        </nav>

        <div>
          <Link
            to="/login"
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer inline-block"
          >
            Se Connecter
          </Link>
        </div>

      </header>

      {/* Hero Section */}
      <section id="home" className="max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        
        <div className="absolute top-10 left-4 w-2 h-2 rounded-full bg-orange-400 opacity-60"></div>
        <div className="absolute top-24 left-16 w-3 h-3 rounded-full bg-orange-200 opacity-80"></div>
        
        <div className="lg:col-span-6 space-y-6 animate-bounce-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            We create <br />
            <span className="text-orange-500">solutions</span> for <br />
            your exams
          </h1>

          <p className="text-slate-500 text-xs sm:text-sm max-w-md leading-relaxed">
            Notre plateforme permet aux enseignants et étudiants de gérer l'intégralité des évaluations QCM avec simplicité, chronométrage strict et correction automatisée.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <Link
              to="/login"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-lg shadow-orange-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer inline-block"
            >
              Get Started
            </Link>

            <Link 
              to="/login"
              className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-orange-500 transition-colors cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <span>Explore more</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 flex justify-center relative animate-bounce-right">
          <div className="relative w-full max-w-lg">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
              alt="Étudiants préparant un examen" 
              className="w-full h-80 sm:h-96 object-cover rounded-3xl shadow-xl"
            />
            
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-zoom">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">100% Automatisé</p>
                <p className="text-[10px] text-slate-400">Résultats en direct</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Services Section */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-md mx-auto mb-12 space-y-2 animate-bounce-down">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            We Provide The Best <span className="text-orange-500">Services</span>
          </h2>
          <p className="text-xs text-slate-400">
            Optimisez chaque étape de vos sessions de test grâce à nos outils intelligents.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 space-y-4 animate-bounce-left">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-white flex items-center justify-center shadow-md shadow-amber-400/30">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Banque QCM</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Créez et organisez vos questions par matières et catégories en toute simplicité.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 space-y-4 animate-bounce-up">
            <div className="w-10 h-10 rounded-xl bg-emerald-400 text-white flex items-center justify-center shadow-md shadow-emerald-400/30">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Chronométrage</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gestion précise du temps imparti par question ou pour l'ensemble du sujet.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 space-y-4 animate-bounce-up">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/30">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Auto-Correction</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Obtenez le calcul automatique des résultats et un classement instantané.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 space-y-4 animate-bounce-right">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Sécurité & PV</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Génération automatique des procès-verbaux d'examen sécurisés.
            </p>
          </div>

        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="bg-[#FFF4EC] py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 flex justify-center animate-bounce-left">
            <img 
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80" 
              alt="Personne étudiant sur tablette" 
              className="w-full max-w-md h-72 sm:h-80 object-cover rounded-3xl shadow-lg"
            />
          </div>

          <div className="lg:col-span-7 space-y-6 animate-bounce-right">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Simple <span className="text-orange-500">Solutions!</span>
            </h2>
            
            <p className="text-xs text-slate-500 leading-relaxed max-w-lg">
              Une prise en main rapide pensée pour que chaque enseignant puisse déployer une épreuve en moins de 5 minutes.
            </p>

            <div className="space-y-4 pt-2">
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 animate-bounce-zoom">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Créer un compte</h4>
                  <p className="text-[11px] text-slate-500">Inscrivez-vous en tant qu'administrateur ou candidat.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 animate-bounce-zoom">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Configurer l'épreuve</h4>
                  <p className="text-[11px] text-slate-500">Choisissez le sujet, la durée et ajoutez vos questions.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 animate-bounce-zoom">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Inviter les candidats</h4>
                  <p className="text-[11px] text-slate-500">Partagez l'accès sécurisé à la session d'examen.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 animate-bounce-zoom">
                  4
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Consulter les résultats</h4>
                  <p className="text-[11px] text-slate-500">Obtenez les notes corrigées automatiquement et exportez-les.</p>
                </div>
              </div>

            </div>

            <div className="pt-4 flex gap-3">
              <Link 
                to="/login"
                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg shadow-md shadow-orange-500/20 transition-all hover:scale-105 cursor-pointer inline-block"
              >
                Get Started
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-4 animate-bounce-left">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Our <span className="text-orange-500">Platform</span>
            </h2>

            <p className="text-xs text-slate-500 leading-relaxed max-w-md">
              Nous croyons en la puissance des évaluations modernes et équitables. Notre approche sécurisée et axée sur l'expérience utilisateur garantit un déroulement sans faille de vos sessions d'examens.
            </p>

            <div className="pt-2">
              <Link 
                to="/login"
                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-all hover:scale-105 cursor-pointer inline-block"
              >
                Read more
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center animate-bounce-right">
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=700&q=80" 
              alt="Équipe travaillant sur la plateforme" 
              className="w-full max-w-md h-64 sm:h-72 object-cover rounded-3xl shadow-md"
            />
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FFF4EC] mt-12 pt-12 pb-6 border-t border-orange-100 animate-bounce-up">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-orange-200/50">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-white font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="font-extrabold text-slate-900 text-base">
                Exam<span className="text-orange-500">Hub</span>
              </span>
            </div>
            
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Plateforme certifiée d'évaluation et d'examens automatisés pour établissements d'enseignement.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900">Company</h4>
            <ul className="space-y-2 text-[11px] text-slate-500">
              <li><a href="#about" className="hover:text-orange-500">About</a></li>
              <li><a href="#contact" className="hover:text-orange-500">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900">Features</h4>
            <ul className="space-y-2 text-[11px] text-slate-500">
              <li><a href="#qcm" className="hover:text-orange-500">Gestion QCM</a></li>
              <li><a href="#pv" className="hover:text-orange-500">Procès-Verbaux</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900">Resources</h4>
            <ul className="space-y-2 text-[11px] text-slate-500">
              <li><a href="#blog" className="hover:text-orange-500">Blog</a></li>
              <li><a href="#help" className="hover:text-orange-500">Support</a></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-6 text-center text-[10px] text-slate-400 font-medium">
          © 2026 EXAM HUB — Tous droits réservés.
        </div>
      </footer>

    </div>
  );
}