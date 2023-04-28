import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/auth/";

// Register user
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL + "register/", userData);
    console.log(JSON.stringify(response.data));
    console.log(response.data.name);
    if (response.data) {
      localStorage.setItem("user", response.data.name);
      localStorage.setItem("token", response.data.token); // Add this line
    }
    return response.data.name;
  } catch (error) {
    console.log("authService: register");
    console.log(error);
  }
};

// login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", response.data.name);
    localStorage.setItem("token", response.data.token); // Add this line
  }
  console.log(response.data);
  return response.data;
};

// logout user
const logout = () => {
  localStorage.setItem("user", null);
  localStorage.setItem("token", null);
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
