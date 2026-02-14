import api from "./apiService";

export async function createNote({ title, content }) {
  const res = await api.post("/api/notes", {
    title,
    content,
  });

  return res.data;
}

export async function getAllNotes() {
  const res = await api.get("/api/notes")
  return res.data
}

export async function deleteNote(id) {
  const res = await api.delete(`/api/notes/${id}`);
  return res.data;
}

export async function updateNote(id, data) {
  const res = await api.put(`/api/notes/${id}`, data);
  return res.data;
}