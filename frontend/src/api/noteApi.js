import api from "./axios";

export const getNotes = async () => {
  const res = await api.get("/note/all-notes");
  return res.data;
};

export const addNote = async (body) => {
  const res = await api.post("/note/add", body);
  return res.data;
};

export const updateNote = async (id, body) => {
  const res = await api.patch(`/note/update/${id}`, body);
  return res.data;
};

export const deleteNote = async (id) => {
  const res = await api.delete(`/note/remove/${id}`);
  return res.data;
};
