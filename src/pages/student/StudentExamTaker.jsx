import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import * as api from "../../api/mockApi";
import { PageHeader, ErrorBanner, Button, Modal } from "../../components/ui";

export default function StudentExamTaker() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({}); // questionId -> choiceId
  const [error, setError] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.getMyExam(user.id, id).then(setExam).catch((err) => setError(err.message));
  }, [id, user.id]);

  function selectAnswer(questionId, choiceId) {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceId }));
  }

  async function handleConfirmSubmit() {
    setSubmitting(true);
    setError("");
    try {
      const payload = Object.entries(answers).map(([questionId, choiceId]) => ({ questionId, choiceId }));
      await api.submitExam(user.id, id, payload);
      navigate(`/student/exams/${id}/result`, { replace: true });
    } catch (err) {
      setError(err.message);
      setConfirmOpen(false);
    } finally {
      setSubmitting(false);
    }
  }

  if (error && !exam) {
    return (
      <div>
        <Link to="/student" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-700 mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Retour
        </Link>
        <ErrorBanner message={error} />
      </div>
    );
  }

  if (!exam) return null;

  const answeredCount = Object.keys(answers).length;

  return (
    <div>
      <PageHeader title={exam.title} subtitle={exam.description} />
      <ErrorBanner message={error} />

      <div className="space-y-4">
        {exam.questions.map((q, idx) => (
          <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 mb-1.5">Question {idx + 1} · {q.points} pt{q.points > 1 ? "s" : ""}</p>
            <p className="font-semibold text-slate-800 mb-4">{q.text}</p>
            <div className="space-y-2">
              {q.choices.map((c) => (
                <label
                  key={c.id}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm cursor-pointer transition-colors ${
                    answers[q.id] === c.id ? "border-orange-400 bg-orange-50 font-semibold text-orange-700" : "border-slate-200 hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  <input
                    type="radio"
                    name={q.id}
                    checked={answers[q.id] === c.id}
                    onChange={() => selectAnswer(q.id, c.id)}
                    className="accent-orange-500"
                  />
                  {c.text}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 mt-6 bg-white/90 backdrop-blur border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-lg">
        <p className="text-xs font-semibold text-slate-500">
          {answeredCount} / {exam.questions.length} question(s) répondue(s)
        </p>
        <Button onClick={() => setConfirmOpen(true)}>Soumettre l'examen</Button>
      </div>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Confirmer la soumission">
        <p className="text-sm text-slate-600 mb-2">
          Vous avez répondu à {answeredCount} question(s) sur {exam.questions.length}.
        </p>
        <p className="text-xs text-slate-400 mb-5">
          La soumission est définitive et unique : vous ne pourrez pas repasser cet examen ni modifier vos réponses ensuite.
        </p>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => setConfirmOpen(false)} className="flex-1">Annuler</Button>
          <Button onClick={handleConfirmSubmit} disabled={submitting} className="flex-1">
            {submitting ? "Envoi..." : "Confirmer et soumettre"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
