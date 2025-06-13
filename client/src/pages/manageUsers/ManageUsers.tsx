import { useEffect, useState } from "react";
import UserForm from "../../components/userForm/UserForm";
import UsersList from "../../components/usersList/UsersList";
import { getUsers } from "../../services/UserService";
import toast from "react-hot-toast";

import "./ManageUsers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);

        const res = await getUsers();

        if (res.status === 200) {
          setUsers(res.data);
        }
      } catch (err) {
        toast.error("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  console.log(users);

  return (
    <div className="users-container text-light">
      <div className="left-column">
        <UserForm setUsers={setUsers} />
      </div>
      <div className="right-column">
        <UsersList users={users} setUsers={setUsers} />{" "}
      </div>
    </div>
  );
};

export default ManageUsers;
