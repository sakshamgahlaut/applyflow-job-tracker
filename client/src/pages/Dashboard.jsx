import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Dashboard;
