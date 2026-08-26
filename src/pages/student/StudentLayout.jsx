import { Outlet } from "react-router-dom";
import { FileCheck2, History } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout";

const links = [
  { to: "/student", label: "Examens disponibles", icon: FileCheck2, end: true },
  { to: "/student/results", label: "Mes résultats", icon: History },
];

export default function StudentLayout() {
  return (
    <DashboardLayout links={links}>
      <Outlet />
    </DashboardLayout>
  );
}
