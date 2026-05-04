import axios from "axios";
const uri = `${import.meta.env.VITE_API_URL}api`;

// user

export const userApi = async function (data, suffixUrl) {
  let res = await axios.post(`${uri}${suffixUrl}`, data, {
    withCredentials: true,
  });
  return res;
};

export const updateUser = async function (data) {
  return await axios.patch(`${uri}/auth/update-user`, data, {
    withCredentials: true,
  });
};

export const deleteUser = async function () {
  await axios.delete(`${uri}/auth/remove-user`, {
    withCredentials: true,
  });
};

// notes

export const allNoteFetched = async function () {
  let res = await axios.get(`${uri}/note/all-notes`, {
    withCredentials: true,
  });
  return res;
};

export const updateNote = async function (id, data) {
  return await axios.patch(`${uri}/note/update/${id}`, data, {
    withCredentials: true,
  });
};

export const deleteNote = async function (id) {
  return await axios.delete(`${uri}/note/remove/${id}`, {
    withCredentials: true,
  });
};

export const addNote = async function (data) {
  return await axios.post(`${uri}/note/add`, data, {
    withCredentials: true,
  });
};

// set user

export const setUser = async function (res) {
  let username = res?.data?.data?.user?.username;
  let email = res?.data?.data?.user?.email;
  sessionStorage.setItem("username", username);
  sessionStorage.setItem("email", email);
};

export const removeUser = async function () {
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("email");
};
