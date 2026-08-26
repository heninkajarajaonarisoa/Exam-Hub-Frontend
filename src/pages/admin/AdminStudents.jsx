import { useEffect, useState } from "react";
import { Plus, KeyRound, UserX } from "lucide-react";
import * as api from "../../api/mockApi";
import { PageHeader, ErrorBanner, Badge, Button, Modal, Field, inputClass, EmptyState } from "../../components/ui";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [saving, setSaving] = useState(false);

  async function load() {
    setStudents(await api.getStudents());
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await api.createStudent(form);
      setForm({ name: "", email: "", password: "" });
      setShowCreate(false);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleResetPassword(student) {
    const newPassword = window.prompt(`Nouveau mot de passe pour ${student.name} :`);
    if (!newPassword) return;
    try {
      await api.updateStudent(student.id, { password: newPassword });
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeactivate(student) {
    if (!window.confirm(`Désactiver le compte de ${student.name} ?`)) return;
    try {
      await api.deactivateStudent(student.id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <PageHeader
        title="Étudiants"
        subtitle="Créez et gérez les comptes étudiants."
        action={
          <Button onClick={() => setShowCreate(true)}>
            <span className="inline-flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Nouvel étudiant</span>
          </Button>
        }
      />

      <ErrorBanner message={error} />

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {students.length === 0 ? (
          <EmptyState label="Aucun étudiant pour le moment." />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-[11px] uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3 font-bold">Nom</th>
                <th className="px-5 py-3 font-bold">Email</th>
                <th className="px-5 py-3 font-bold">Statut</th>
                <th className="px-5 py-3 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-b border-slate-50 last:border-0">
                  <td className="px-5 py-3.5 font-semibold text-slate-800">{s.name}</td>
                  <td className="px-5 py-3.5 text-slate-500">{s.email}</td>
                  <td className="px-5 py-3.5">
                    <Badge tone={s.active ? "green" : "red"}>{s.active ? "Actif" : "Désactivé"}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleResetPassword(s)}
                        title="Réinitialiser le mot de passe"
                        className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
                      >
                        <KeyRound className="w-4 h-4" />
                      </button>
                      {s.active && (
                        <button
                          onClick={() => handleDeactivate(s)}
                          title="Désactiver"
                          className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 cursor-pointer"
                        >
                          <UserX className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Nouvel étudiant">
        <form onSubmit={handleCreate} className="space-y-4">
          <Field label="Nom">
            <input required className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Email">
            <input required type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </Field>
          <Field label="Mot de passe initial">
            <input required className={inputClass} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </Field>
          <Button type="submit" disabled={saving} className="w-full">
            {saving ? "Création..." : "Créer le compte"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
