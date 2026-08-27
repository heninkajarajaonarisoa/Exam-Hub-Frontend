const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function fetchApi(endpoint, options = {}) {
  const session = localStorage.getItem("examhub_session_v1");
  const token = session ? JSON.parse(session).token : null;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Une erreur est survenue");
  }

  return response.json();
}