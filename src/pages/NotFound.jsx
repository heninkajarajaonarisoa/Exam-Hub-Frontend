import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p className="text-6xl font-extrabold text-slate-200 mb-2">404</p>
      <p className="text-sm text-slate-500 mb-6">This page does not exist.</p>
      <Link to="/" className="text-xs font-bold text-orange-600 hover:underline">
      Back to home
      </Link>
    </div>
  );
}
