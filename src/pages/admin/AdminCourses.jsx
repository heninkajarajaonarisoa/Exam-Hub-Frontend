import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import * as api from "../../api/realApi";
import { PageHeader, ErrorBanner, Button, Modal, Field, inputClass, EmptyState } from "../../components/ui";

const emptyForm = { code: "", name: "", description: "" };

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function load() {
    setCourses(await api.getCourses());
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(course) {
    setEditingId(course.id);
    setForm({ code: course.code, name: course.name, description: course.description });
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      if (editingId) {
        await api.updateCourse(editingId, form);
      } else {
        await api.createCourse(form);
      }
      setModalOpen(false);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(course) {
    if (!window.confirm(`Supprimer le cours ${course.code} ?`)) return;
    setError("");
    try {
      await api.deleteCourse(course.id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <PageHeader
        title="Cours"
        subtitle="Gérez le catalogue de cours."
        action={
          <Button onClick={openCreate}>
            <span className="inline-flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Nouveau cours</span>
          </Button>
        }
      />

      <ErrorBanner message={error} />

      {courses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100">
          <EmptyState label="Aucun cours pour le moment." />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((c) => (
            <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
              <div className="flex items-start justify-between">
                <span className="inline-block bg-orange-50 text-orange-600 text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {c.code}
                </span>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(c)} className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{c.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Modifier le cours" : "Nouveau cours"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Code (unique)">
            <input required placeholder="ex. PROG2" className={inputClass} value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
          </Field>
          <Field label="Nom">
            <input required className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Description">
            <textarea required rows={3} className={inputClass} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>
          <Button type="submit" disabled={saving} className="w-full">
            {saving ? "Enregistrement..." : editingId ? "Enregistrer" : "Créer le cours"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
