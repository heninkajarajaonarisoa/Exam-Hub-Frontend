import { Outlet } from "react-router-dom";
import { LayoutDashboard, Users, BookOpen, FileCheck2 } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout";

const links = [
  { to: "/admin", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { to: "/admin/students", label: "Étudiants", icon: Users },
  { to: "/admin/courses", label: "Cours", icon: BookOpen },
  { to: "/admin/exams", label: "Examens", icon: FileCheck2 },
];

export default function AdminLayout() {
  return (
    <DashboardLayout links={links}>
      <Outlet />
    </DashboardLayout>
  );
}
