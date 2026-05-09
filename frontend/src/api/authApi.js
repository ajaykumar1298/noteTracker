import api from "./axios";

export const loginUser = async (body) => {
  const res = await api.post("/auth/login", body);
  return res.data;
};

export const registerUser = async (body) => {
  const res = await api.post("/auth/register", body);
  return res.data;
};

export const updateUser = async (body) => {
  const res = await api.patch("/auth/update-user", body);
  return res.data;
};

export const deleteUser = async () => {
  const res = await api.delete("/auth/remove-user");
  return res.data;
};
