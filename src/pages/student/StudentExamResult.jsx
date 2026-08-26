import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import * as api from "../../api/mockApi";
import { PageHeader, ErrorBanner } from "../../components/ui";

export default function StudentExamResult() {
  const { id } = useParams();
  const { user } = useAuth();
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getMyExamResult(user.id, id).then(setResult).catch((err) => setError(err.message));
  }, [id, user.id]);

  if (error) {
    return (
      <div>
        <Link to="/student" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-700 mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Retour
        </Link>
        <ErrorBanner message={error} />
      </div>
    );
  }

  if (!result) return null;

  const total = result.correction.reduce((s, q) => s + q.points, 0);

  return (
    <div>
      <Link to="/student" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-700 mb-4">
        <ArrowLeft className="w-3.5 h-3.5" /> Retour aux examens
      </Link>

      <PageHeader title={result.examTitle} subtitle="Correction détaillée de votre épreuve." />

      <div className="bg-white p-6 rounded-2xl border border-slate-100 mb-6 flex items-center justify-between">
        <div>
          <p className="text-3xl font-extrabold text-slate-900">{result.score} / {total}</p>
          <p className="text-xs text-slate-400 mt-1">Soumis le {new Date(result.submittedAt).toLocaleString("fr-FR")}</p>
        </div>
      </div>

      <div className="space-y-4">
        {result.correction.map((q, idx) => (
          <div key={q.questionId} className="bg-white p-6 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2 mb-1.5">
              <p className="text-[11px] font-bold text-slate-400">Question {idx + 1}</p>
              {q.isCorrect ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600"><Check className="w-3.5 h-3.5" /> Correct</span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-500"><X className="w-3.5 h-3.5" /> Incorrect</span>
              )}
            </div>
            <p className="font-semibold text-slate-800 mb-4">{q.text}</p>
            <div className="space-y-1.5">
              {q.choices.map((c) => {
                const isSelected = c.id === q.selectedChoiceId;
                const isCorrectChoice = c.id === q.correctChoiceId;
                let style = "bg-slate-50 text-slate-500";
                if (isCorrectChoice) style = "bg-emerald-50 text-emerald-700 font-semibold";
                if (isSelected && !isCorrectChoice) style = "bg-red-50 text-red-600 font-semibold";
                return (
                  <div key={c.id} className={`flex items-center justify-between text-xs px-3 py-2 rounded-lg ${style}`}>
                    <span>{c.text}</span>
                    <span className="flex items-center gap-2">
                      {isSelected && <span className="text-[10px] uppercase font-bold opacity-70">Votre choix</span>}
                      {isCorrectChoice && <Check className="w-3.5 h-3.5" />}
                      {isSelected && !isCorrectChoice && <X className="w-3.5 h-3.5" />}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
