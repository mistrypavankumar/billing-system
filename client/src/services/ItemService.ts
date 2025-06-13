import axios from "axios";

export const addItem = async (item: any) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1.0/admin/items",
      item,
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

export const deleteItem = async (itemId: string) => {
  try {
    const res = await axios.delete(
      `http://localhost:8080/api/v1.0/admin/items/${itemId}`,
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

export const getItems = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/v1.0/items", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return res;
  } catch (err) {
    throw err;
  }
};
