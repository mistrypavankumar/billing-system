import axios from "axios";

export const addUser = async (user: any) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1.0/admin/register",
      user,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return res;
  } catch (err) {
    console.error("Add user failed:", err);
    throw err;
  }
};

export const deleteUser = async (userid: string) => {
  try {
    const res = await axios.delete(
      `http://localhost:8080/api/v1.0/admin/users/${userid}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return res;
  } catch (err) {
    throw err;
  }
};

export const getUsers = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/v1.0/admin/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return res;
  } catch (err) {
    console.error("Get users failed:", err);
    throw err;
  }
};
