export const AppConstants = {
  RAZORPAY_KEY_ID: import.meta.env.VITE_RAZORPAY_KEY_ID ?? "",
  API_BASE_URL:
     import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api/v1.0",
  COMPANY_NAME: "Your Company Name",
  COMPANY_ADDRESS: "1234 Your Street, City, State, ZIP",
  COMPANY_PHONE: "+1-234-567-8900",
  COMPANY_EMAIL: "",
  COMPANY_COLOR: "#3399cc",
  TAX: 0.18, // 18% tax
};


export const MenuLinksData = [
  {
    path: "/dashboard",
    label: "Dashboard",
    isAdmin: false,
  },
  {
    path: "/explore",
    label: "Explore",
    isAdmin: false,
  },
  {
    path: "/manage/items",
    label: "Manage Items",
    isAdmin: true,
  },
  {
    path: "/manage/categories",
    label: "Manage Categories",
    isAdmin: true,
  },
  {
    path: "/manage/users",
    label: "Manage Users",
    isAdmin: true,
  },
  {
    path: "/manage/orders",
    label: "Order History",
    isAdmin: false,
  },
];