import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { addCategory } from "../../services/CategoryServices";
import { AppContext } from "../../context/AppContext";

const CategoryForm = () => {
  const appContext = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const [data, setData] = useState({
    name: "",
    description: "",
    bgColor: "#212529",
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    if (!data.name || !data.description) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("category", JSON.stringify(data));
      formData.append("file", image);

      console.log(formData);

      const res = await addCategory(formData);

      if (!res) {
        toast.error("Failed to add category");
        return;
      }

      toast.success("Category added successfully");
      appContext?.setCategories((prev) => [...prev, res]);

      setData({
        name: "",
        description: "",
        bgColor: "#212529",
      });

      setImage(null);
    } catch (err) {
      console.error("Error adding category:", err);
      toast.error("An error occurred while adding the category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-12 form-container bg-dark">
          <div className="card-body">
            <form className="theme-dark" onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <img
                    src={image ? URL.createObjectURL(image) : assets.upload}
                    alt="category image"
                    width={48}
                  />
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="form-control"
                  accept="image/*"
                  placeholder="Upload Image"
                  hidden
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  placeholder="Category Name"
                  value={data.name}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  className="form-control"
                  placeholder="Write a short description here..."
                  rows={5}
                  value={data.description}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="bgColor" className="form-label">
                  Background Color
                </label>
                <br />
                <input
                  type="color"
                  name="bgColor"
                  id="bgColor"
                  placeholder="#ffffff"
                  value={data.bgColor}
                  onChange={onChangeHandler}
                />
              </div>
              <button
                type="submit"
                className="btn btn-warning w-100"
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm" />
                ) : (
                  "Add Category"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
