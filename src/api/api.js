const API_URL = "http://localhost:8080";

// ---------------- GET ----------------
export async function apiGet(path) {
  const res = await fetch(API_URL + path);

  if (!res.ok) {
    throw new Error("Erro ao buscar dados");
  }

  return res.json();
}

// ---------------- POST ----------------
export async function apiPost(path, body = {}) {
  const res = await fetch(API_URL + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Erro na requisição");
  }

  return res.json();
}

// ---------------- PUT ----------------
export async function apiPut(path, body = {}) {
  const res = await fetch(API_URL + path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar");
  }

  return res.json();
}

// ---------------- DELETE ----------------
export async function apiDelete(path) {
  const res = await fetch(API_URL + path, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Erro ao deletar");
  }

  return res.json();
}
