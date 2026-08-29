import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, ListChecks, BarChart3 } from "lucide-react";
import * as api from "../../api/realApi";
import { PageHeader, ErrorBanner, Badge, Button, Modal, Field, inputClass, EmptyState } from "../../components/ui";

const emptyForm = { courseId: "", title: "", description: "", startAt: "", endAt: "" };

function toLocalInput(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function AdminExams() {
  const [exams, setExams] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function load() {
    const [e, c] = await Promise.all([api.getExams(), api.getCourses()]);
    setExams(e);
    setCourses(c);
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm({ ...emptyForm, courseId: courses[0]?.id ?? "" });
    setModalOpen(true);
  }

  function openEdit(exam) {
    setEditingId(exam.id);
    setForm({
      courseId: exam.courseId,
      title: exam.title,
      description: exam.description,
      startAt: toLocalInput(exam.startAt),
      endAt: toLocalInput(exam.endAt),
    });
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        ...form,
        startAt: new Date(form.startAt).toISOString(),
        endAt: new Date(form.endAt).toISOString(),
      };
      if (editingId) {
        await api.updateExam(editingId, payload);
      } else {
        await api.createExam(payload);
      }
      setModalOpen(false);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(exam) {
    if (!window.confirm(`Supprimer l'examen "${exam.title}" ?`)) return;
    setError("");
    try {
      await api.deleteExam(exam.id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  function windowLabel(exam) {
    const now = Date.now();
    const start = new Date(exam.startAt).getTime();
    const end = new Date(exam.endAt).getTime();
    if (now < start) return { label: "À venir", tone: "slate" };
    if (now > end) return { label: "Terminé", tone: "red" };
    return { label: "Ouvert", tone: "green" };
  }

  return (
    <div>
      <PageHeader
        title="Examens"
        subtitle="Créez des examens et leur fenêtre de disponibilité."
        action={
          <Button onClick={openCreate} disabled={courses.length === 0}>
            <span className="inline-flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Nouvel examen</span>
          </Button>
        }
      />

      <ErrorBanner message={error} />
      {courses.length === 0 && (
        <p className="text-xs text-slate-400 mb-4">Créez d'abord un cours avant de créer un examen.</p>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {exams.length === 0 ? (
          <EmptyState label="Aucun examen pour le moment." />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-[11px] uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3 font-bold">Examen</th>
                <th className="px-5 py-3 font-bold">Cours</th>
                <th className="px-5 py-3 font-bold">Statut</th>
                <th className="px-5 py-3 font-bold">Tentatives</th>
                <th className="px-5 py-3 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((e) => {
                const status = windowLabel(e);
                const locked = e.attemptCount > 0;
                return (
                  <tr key={e.id} className="border-b border-slate-50 last:border-0">
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-slate-800">{e.title}</p>
                      <p className="text-[11px] text-slate-400">{e.questionCount} question(s)</p>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">{e.courseCode}</td>
                    <td className="px-5 py-3.5"><Badge tone={status.tone}>{status.label}</Badge></td>
                    <td className="px-5 py-3.5 text-slate-500">{e.attemptCount}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end gap-1.5">
                        <Link to={`/admin/exams/${e.id}/questions`} title="Questions" className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                          <ListChecks className="w-4 h-4" />
                        </Link>
                        <Link to={`/admin/exams/${e.id}/results`} title="Résultats" className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                          <BarChart3 className="w-4 h-4" />
                        </Link>
                        <button onClick={() => openEdit(e)} title="Modifier" className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(e)}
                          disabled={locked}
                          title={locked ? "Impossible : tentatives existantes" : "Supprimer"}
                          className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Modifier l'examen" : "Nouvel examen"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Cours">
            <select required className={inputClass} value={form.courseId} onChange={(e) => setForm({ ...form, courseId: e.target.value })}>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.code} — {c.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Titre">
            <input required className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <Field label="Description">
            <textarea required rows={2} className={inputClass} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Ouverture">
              <input required type="datetime-local" className={inputClass} value={form.startAt} onChange={(e) => setForm({ ...form, startAt: e.target.value })} />
            </Field>
            <Field label="Fermeture">
              <input required type="datetime-local" className={inputClass} value={form.endAt} onChange={(e) => setForm({ ...form, endAt: e.target.value })} />
            </Field>
          </div>
          <Button type="submit" disabled={saving} className="w-full">
            {saving ? "Enregistrement..." : editingId ? "Enregistrer" : "Créer l'examen"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
