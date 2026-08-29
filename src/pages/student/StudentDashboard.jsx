import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import * as api from "../../api/realApi";
import { PageHeader, EmptyState } from "../../components/ui";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    api.getMyExams(user.id).then(setExams);
  }, [user.id]);

  return (
    <div>
      <PageHeader title="Mes Examens Disponibles" subtitle="Sélectionnez un examen pour commencer l'épreuve." />

      {exams.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100">
          <EmptyState label="Aucun examen disponible pour le moment." />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exams.map((exam) => (
            <div key={exam.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-md mb-2">
                  {exam.courseCode}
                </span>
                <h3 className="text-xl font-bold text-slate-900">{exam.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{exam.description}</p>
                <div className="flex items-center gap-4 mt-4 text-xs text-slate-400 font-medium">
                  <span className="inline-flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {exam.questionCount} questions</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> jusqu'au {new Date(exam.endAt).toLocaleDateString("fr-FR")}</span>
                </div>
              </div>
              <Link
                to={`/student/exams/${exam.id}`}
                className="mt-5 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold transition-all"
              >
                Commencer l'épreuve <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
