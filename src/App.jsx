import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminExams from "./pages/admin/AdminExams";
import AdminExamQuestions from "./pages/admin/AdminExamQuestions";
import AdminExamResults from "./pages/admin/AdminExamResults";

import StudentLayout from "./pages/student/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentExamTaker from "./pages/student/StudentExamTaker";
import StudentExamResult from "./pages/student/StudentExamResult";
import StudentResults from "./pages/student/StudentResults";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Espace admin (role admin requis) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="exams" element={<AdminExams />} />
            <Route path="exams/:id/questions" element={<AdminExamQuestions />} />
            <Route path="exams/:id/results" element={<AdminExamResults />} />
          </Route>

          {/* Espace étudiant (role student requis) */}
          <Route
            path="/student"
            element={
              <ProtectedRoute role="student">
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentDashboard />} />
            <Route path="results" element={<StudentResults />} />
          </Route>

          {/* Passage d'examen et résultat : pages autonomes, sans sidebar, pour rester concentré */}
          <Route
            path="/student/exams/:id"
            element={
              <ProtectedRoute role="student">
                <div className="min-h-screen bg-slate-50">
                  <div className="max-w-3xl mx-auto px-6 py-8">
                    <StudentExamTaker />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/exams/:id/result"
            element={
              <ProtectedRoute role="student">
                <div className="min-h-screen bg-slate-50">
                  <div className="max-w-3xl mx-auto px-6 py-8">
                    <StudentExamResult />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
