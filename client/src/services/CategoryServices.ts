import axios from "axios";

export const addCategory = async (category: any) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1.0/categories",
      category
    );

    if (res.status === 201) {
      return res.data;
    } else {
      throw new Error("Failed to add category");
    }
  } catch (err) {
    throw err;
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    await axios.delete(
      `http://localhost:8080/api/v1.0/categories/${categoryId}`
    );
  } catch (err) {
    throw err;
  }
};

export const getCategories = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/v1.0/categories");

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("Failed to fetch categories");
    }
  } catch (err) {
    throw err;
  }
};
