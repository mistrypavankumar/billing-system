import React, { useState } from "react";
import toast from "react-hot-toast";
import { addUser } from "../../services/UserService";

interface UserFormProps {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserForm: React.FC<UserFormProps> = ({ setUsers }) => {
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    name: "",
    email: "",
    role: "ROLE_USER",
    password: "",
    confirmpassword: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, password, confirmpassword, role } = state;

    if (!name || !email || !password || !confirmpassword) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await addUser({
        name,
        email,
        role,
        password,
      });

      if (res.status === 201) {
        toast.success("User added successfully!");
        setUsers((prevUsers: any) => [...prevUsers, res.data]);
        setState({
          name: "",
          email: "",
          role: "ROLE_USER",
          password: "",
          confirmpassword: "",
        });
      }
    } catch (err) {
      toast.error("Failed to add user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-2 mt-2 ">
      <div className="row">
        <div className="card col-md-12 form-container bg-dark">
          <div className="card-body">
            <form className="theme-dark" onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  placeholder="Jhon Doe"
                  value={state.name}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="yourname@example.com"
                  value={state.email}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="***********"
                  value={state.password}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmpassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  className="form-control"
                  placeholder="***********"
                  value={state.confirmpassword}
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
                  "Add User"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
