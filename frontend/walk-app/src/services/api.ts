const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem("token");

const api = {
  async get<T>(url: string): Promise<T> {
    const token = getToken();

    const res = await fetch(`${API_URL}${url}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as { message?: string };
      throw new Error(err.message || "Erro na requisição");
    }

    return res.json() as Promise<T>;
  },

  async post<T, B>(url: string, body: B): Promise<T> {
    const token = getToken();

    const res = await fetch(`${API_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as { message?: string };
      throw new Error(err.message || "Erro na requisição");
    }

    return res.json() as Promise<T>;
  },
};

export default api;