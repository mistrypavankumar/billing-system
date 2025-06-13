import axios from "axios";

export const addCategory = async (category: any) => {
  console.log("Adding category with data:", category);
  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1.0/admin/categories",
      category,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Add category failed:", err);
    throw err;
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    const res = await axios.delete(
      `http://localhost:8080/api/v1.0/admin/categories/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.status === 204) {
      return res;
    } else {
      throw new Error("Failed to delete category");
    }
  } catch (err) {
    throw err;
  }
};

export const getCategories = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/v1.0/categories", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("Failed to fetch categories");
    }
  } catch (err) {
    throw err;
  }
};
