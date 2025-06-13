import React, { useState } from "react";
import toast from "react-hot-toast";
import { deleteUser } from "../../services/UserService";

interface UsersListProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
}

const UsersList: React.FC<UsersListProps> = ({ users, setUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteByUserId = async (userId: string) => {
    try {
      const res = await deleteUser(userId);

      if (res.status === 204) {
        toast.success("User deleted successfully!");
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.userId !== userId)
        );
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user. Please try again later.");
    }
  };

  return (
    <div
      className="category-list-container"
      style={{
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input
            type="text"
            name="keyword"
            id="keyword"
            placeholder="Search by keyword..."
            className="form-control"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            autoComplete="off"
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
      <div className="row g-3 pe-2">
        {filteredUsers.map((user) => (
          <div className="col-12" key={user.userId}>
            <div className="card p-3 bg-dark">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5 className="mb-1 text-white">{user.name}</h5>
                  <p className="mb-0 text-white-50">{user.email}</p>
                </div>
                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteByUserId(user.userId)}
                    disabled={user.role === "ROLE_ADMIN"}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
