import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// role: "admin" | "student" | undefined (any authenticated role)
export default function ProtectedRoute({ role, children }) {
  const { user, ready } = useAuth();

  if (!ready) return null; // avoid flash-redirect while session is loading

  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role) {
    // Connecté mais mauvais espace : on renvoie vers son propre espace.
    return <Navigate to={user.role === "admin" ? "/admin" : "/student"} replace />;
  }

  return children;
}
