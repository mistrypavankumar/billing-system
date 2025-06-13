import axios from "axios";

export const login = async (email: string, password: string) => {
  try {
    const res = await axios.post("http://localhost:8080/api/v1.0/login", {
      email,
      password,
    });

    return res;
  } catch (err) {
    console.error("Login failed:", err);
    throw err;
  }
};
