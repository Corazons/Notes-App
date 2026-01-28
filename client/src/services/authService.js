import api from "./apiService";

/**
 * LOGIN
 * kirim email & password ke backend
 * return accessToken
 */
export async function login({ email, password }) {
  const response = await api.post("/api/login", {
    email,
    password,
  });

  // simpan access token (sementara di localStorage)
  const { accessToken } = response.data;
  localStorage.setItem("accessToken", accessToken);

  return response.data;
}

/**
 * REGISTER
 * buat user baru
 */
export async function register({ email, password }) {
  const response = await api.post("/api/register", {
    email,
    password,
  });

  return response.data;
}

export async function refresh(){
  const response = await api.post("/api/refresh");
  return response.data.accessToken;
}

/**
 * LOGOUT
 * hapus token di client
 */
export async function logout() {
  await api.post("/api/logout");
  localStorage.removeItem("accessToken");
}

export default api;