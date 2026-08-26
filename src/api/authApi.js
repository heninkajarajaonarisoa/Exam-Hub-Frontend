import { fetchApi } from "./client";

export async function login(email, password) {
  
  return await fetchApi("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}