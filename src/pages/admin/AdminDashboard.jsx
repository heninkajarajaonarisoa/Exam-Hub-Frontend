import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, BookOpen, FileCheck2, BarChart3 } from "lucide-react";
import * as api from "../../api/realApi";
import { PageHeader } from "../../components/ui";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ students: 0, courses: 0, exams: 0, attempts: 0 });

  useEffect(() => {
    async function load() {
      const [students, courses, exams] = await Promise.all([
        api.getStudents(),
        api.getCourses(),
        api.getExams(),
      ]);
      setCounts({
        students: students.length,
        courses: courses.length,
        exams: exams.length,
        attempts: exams.reduce((sum, e) => sum + e.attemptCount, 0),
      });
    }
    load();
  }, []);

  const cards = [
    { label: "Étudiants", value: counts.students, icon: Users, to: "/admin/students", tone: "bg-blue-50 text-blue-600" },
    { label: "Cours", value: counts.courses, icon: BookOpen, to: "/admin/courses", tone: "bg-emerald-50 text-emerald-600" },
    { label: "Examens", value: counts.exams, icon: FileCheck2, to: "/admin/exams", tone: "bg-orange-50 text-orange-600" },
    { label: "Tentatives", value: counts.attempts, icon: BarChart3, to: "/admin/exams", tone: "bg-indigo-50 text-indigo-600" },
  ];

  return (
    <div>
      <PageHeader title="Tableau de bord" subtitle="Vue d'ensemble de la plateforme Exam Hub." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${c.tone}`}>
              <c.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900">{c.value}</p>
            <p className="text-xs font-semibold text-slate-400 mt-1">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Liens rapides</h3>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/students" className="text-xs font-bold text-orange-600 hover:underline">Gérer les étudiants</Link>
          <span className="text-slate-200">•</span>
          <Link to="/admin/courses" className="text-xs font-bold text-orange-600 hover:underline">Gérer les cours</Link>
          <span className="text-slate-200">•</span>
          <Link to="/admin/exams" className="text-xs font-bold text-orange-600 hover:underline">Gérer les examens</Link>
        </div>
      </div>
    </div>
  );
}
