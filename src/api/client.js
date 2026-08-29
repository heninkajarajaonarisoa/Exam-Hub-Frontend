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
    const err = new Error(errorData.message || "Une erreur est survenue");
    err.status = response.status;
    throw err;
  }

  // Les suppressions (DELETE) renvoient 204 No Content, sans corps JSON :
  // response.json() planterait dessus ("Unexpected end of JSON input").
  if (response.status === 204) {
    return null;
  }

  return response.json();
}