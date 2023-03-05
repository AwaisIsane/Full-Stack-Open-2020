import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  window.localStorage.setItem("creds", JSON.stringify(response.data));
  return response.data;
};

const logout = async () => {
  window.localStorage.removeItem("creds");
};

const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem("creds"));
};

const loginSrv = { login, logout, getUserFromStorage };
export default loginSrv;
