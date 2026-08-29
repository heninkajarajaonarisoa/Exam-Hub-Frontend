import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as api from "../../api/mockApi";
import { PageHeader, EmptyState } from "../../components/ui";

export default function StudentResults() {
  const { user } = useAuth();
  const [results, setResults] = useState([]);

  useEffect(() => {
    api.getMyResults(user.id).then(setResults);
  }, [user.id]);

  return (
    <div>
      <PageHeader title="Mes Résultats" subtitle="Historique de vos examens passés." />

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {results.length === 0 ? (
          <EmptyState label="Vous n'avez encore passé aucun examen." />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-[11px] uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3 font-bold">Examen</th>
                <th className="px-5 py-3 font-bold">Score</th>
                <th className="px-5 py-3 font-bold">Submitted on</th>
                <th className="px-5 py-3 font-bold text-right">Détails</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.examId} className="border-b border-slate-50 last:border-0">
                  <td className="px-5 py-3.5 font-semibold text-slate-800">{r.examTitle}</td>
                  <td className="px-5 py-3.5 text-slate-600 font-bold">{r.score}</td>
                  <td className="px-5 py-3.5 text-slate-400">{new Date(r.submittedAt).toLocaleString("fr-FR")}</td>
                  <td className="px-5 py-3.5 text-right">
                    <Link to={`/student/exams/${r.examId}/result`} className="text-xs font-bold text-orange-600 hover:underline">
                      View the correction 
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
