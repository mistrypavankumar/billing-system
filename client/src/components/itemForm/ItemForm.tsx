import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { addItem } from "../../services/ItemService";

const ItemForm = () => {
  const appContext = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [state, setState] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
  });

  const onChangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    if (
      !state.name ||
      !state.categoryId ||
      !state.price ||
      !state.description
    ) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("item", JSON.stringify(state));
    formData.append("file", image);

    try {
      const res = await addItem(formData);

      if (res.status === 201) {
        appContext?.setItemsData((prev) => [...prev, res.data]);

        appContext?.setCategories((prev) =>
          prev.map((category) =>
            category.categoryId === state.categoryId
              ? { ...category, items: category.items + 1 }
              : category
          )
        );

        toast.success("Item added successfully");
        setState({
          name: "",
          categoryId: "",
          price: "",
          description: "",
        });
        setImage(null);
      } else {
        toast.error("Failed to add item");
      }
    } catch (err) {
      toast.error("Failed to add item");
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="item-form-container"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="mx-2 mt-2 ">
        <div className="row">
          <div className="card col-md-8 form-container bg-dark">
            <div className="card-body">
              <form className="theme-dark" onSubmit={onSubmitHandler}>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    <img
                      src={image ? URL.createObjectURL(image) : assets.upload}
                      alt=""
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
                    placeholder="Item Name"
                    value={state.name}
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    name="categoryId"
                    id="category"
                    className="form-control"
                    value={state.categoryId}
                    onChange={onChangeHandler}
                  >
                    <option value="">Select Category</option>
                    {appContext?.categories.map((category, index) => {
                      return (
                        <option key={index} value={category.categoryId}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    placeholder="$50.00"
                    value={state.price}
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
                    value={state.description}
                    onChange={onChangeHandler}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-warning w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
