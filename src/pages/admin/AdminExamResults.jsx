import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import * as api from "../../api/mockApi";
import { PageHeader, EmptyState } from "../../components/ui";

export default function AdminExamResults() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [results, setResults] = useState({ rows: [], average: 0, attemptCount: 0 });

  useEffect(() => {
    async function load() {
      const [e, r] = await Promise.all([api.getExam(id), api.getExamResults(id)]);
      setExam(e);
      setResults(r);
    }
    load();
  }, [id]);

  if (!exam) return null;

  return (
    <div>
      <Link to="/admin/exams" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-700 mb-4">
        <ArrowLeft className="w-3.5 h-3.5" /> Retour aux examens
      </Link>

      <PageHeader title={`Résultats — ${exam.title}`} subtitle="Notes des étudiants, moyenne et nombre de tentatives." />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-100">
          <p className="text-2xl font-extrabold text-slate-900">{results.attemptCount}</p>
          <p className="text-xs font-semibold text-slate-400 mt-1">Tentative(s)</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100">
          <p className="text-2xl font-extrabold text-slate-900">{results.average.toFixed(2)}</p>
          <p className="text-xs font-semibold text-slate-400 mt-1">Moyenne</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {results.rows.length === 0 ? (
          <EmptyState label="Aucune tentative pour cet examen." />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-[11px] uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3 font-bold">Étudiant</th>
                <th className="px-5 py-3 font-bold">Note</th>
                <th className="px-5 py-3 font-bold">Soumis le</th>
              </tr>
            </thead>
            <tbody>
              {results.rows.map((r) => (
                <tr key={r.studentId} className="border-b border-slate-50 last:border-0">
                  <td className="px-5 py-3.5 font-semibold text-slate-800">{r.studentName}</td>
                  <td className="px-5 py-3.5 text-slate-600 font-bold">{r.score}</td>
                  <td className="px-5 py-3.5 text-slate-400">{new Date(r.submittedAt).toLocaleString("fr-FR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
