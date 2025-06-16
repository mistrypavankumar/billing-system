import axios from "axios";

export const fetchDashboardData = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/v1.0/dashboard", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return res;
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    throw err;
  }
};
