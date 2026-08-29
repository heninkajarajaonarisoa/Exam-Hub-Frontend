import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Lock, Check } from "lucide-react";
import * as api from "../../api/realApi";
import { PageHeader, ErrorBanner, Badge, Button, Modal, Field, inputClass, EmptyState } from "../../components/ui";

const emptyForm = {
  text: "",
  points: 1,
  choices: [
    { text: "", correct: true },
    { text: "", correct: false },
  ],
};

export default function AdminExamQuestions() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [locked, setLocked] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function load() {
    const [e, qs, isLocked] = await Promise.all([
      api.getExam(id),
      api.getExamQuestions(id),
      api.isExamLocked(id),
    ]);
    setExam(e);
    setQuestions(qs);
    setLocked(isLocked);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function openCreate() {
    setForm(emptyForm);
    setModalOpen(true);
  }

  function updateChoiceText(index, text) {
    const choices = form.choices.map((c, i) => (i === index ? { ...c, text } : c));
    setForm({ ...form, choices });
  }

  function setCorrectChoice(index) {
    const choices = form.choices.map((c, i) => ({ ...c, correct: i === index }));
    setForm({ ...form, choices });
  }

  function addChoice() {
    if (form.choices.length >= 6) return;
    setForm({ ...form, choices: [...form.choices, { text: "", correct: false }] });
  }

  function removeChoice(index) {
    if (form.choices.length <= 2) return;
    const choices = form.choices.filter((_, i) => i !== index);
    if (!choices.some((c) => c.correct)) choices[0].correct = true;
    setForm({ ...form, choices });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await api.createQuestion(id, { ...form, points: Number(form.points) });
      setModalOpen(false);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(question) {
    if (!window.confirm("Supprimer cette question ?")) return;
    setError("");
    try {
      await api.deleteQuestion(question.id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  if (!exam) return null;

  return (
    <div>
      <Link to="/admin/exams" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-700 mb-4">
        <ArrowLeft className="w-3.5 h-3.5" /> Retour aux examens
      </Link>

      <PageHeader
        title={`Questions — ${exam.title}`}
        subtitle={locked ? "Cet examen a des tentatives : les questions sont verrouillées." : "Ajoutez les questions et leurs choix de réponse."}
        action={
          !locked && (
            <Button onClick={openCreate}>
              <span className="inline-flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Nouvelle question</span>
            </Button>
          )
        }
      />

      {locked && (
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold rounded-xl px-4 py-3 mb-4">
          <Lock className="w-3.5 h-3.5" /> Verrouillé — au moins une tentative a déjà été soumise pour cet examen.
        </div>
      )}

      <ErrorBanner message={error} />

      {questions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100">
          <EmptyState label="Aucune question pour le moment." />
        </div>
      ) : (
        <div className="space-y-3">
          {questions.map((q, idx) => (
            <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-bold text-slate-400">Q{idx + 1}</span>
                    <Badge tone="orange">{q.points} pt{q.points > 1 ? "s" : ""}</Badge>
                  </div>
                  <p className="font-semibold text-slate-800 text-sm mb-3">{q.text}</p>
                  <div className="space-y-1.5">
                    {q.choices.map((c) => (
                      <div key={c.id} className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg ${c.correct ? "bg-emerald-50 text-emerald-700 font-semibold" : "bg-slate-50 text-slate-500"}`}>
                        {c.correct && <Check className="w-3.5 h-3.5" />}
                        {c.text}
                      </div>
                    ))}
                  </div>
                </div>
                {!locked && (
                  <button onClick={() => handleDelete(q)} className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nouvelle question">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Énoncé">
            <textarea required rows={2} className={inputClass} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
          </Field>
          <Field label="Points">
            <input required type="number" min={1} className={inputClass} value={form.points} onChange={(e) => setForm({ ...form, points: e.target.value })} />
          </Field>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-600">Choix de réponse (2 à 6, un seul correct)</span>
            {form.choices.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCorrectChoice(i)}
                  title="Marquer comme correct"
                  className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                    c.correct ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300"
                  }`}
                >
                  {c.correct && <Check className="w-3.5 h-3.5" />}
                </button>
                <input
                  required
                  placeholder={`Choix ${i + 1}`}
                  className={inputClass}
                  value={c.text}
                  onChange={(e) => updateChoiceText(i, e.target.value)}
                />
                {form.choices.length > 2 && (
                  <button type="button" onClick={() => removeChoice(i)} className="p-1.5 text-slate-300 hover:text-red-500 cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
            {form.choices.length < 6 && (
              <button type="button" onClick={addChoice} className="text-xs font-bold text-orange-600 hover:underline cursor-pointer">
                + Ajouter un choix
              </button>
            )}
          </div>

          <Button type="submit" disabled={saving} className="w-full">
            {saving ? "Enregistrement..." : "Ajouter la question"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
