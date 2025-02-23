import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import io from "socket.io-client";

const socket = io("http://localhost:5000", { autoConnect: false });

const LogoutButton = ({ setUsers }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    socket.connect(); // Ensure connection on mount

    return () => {
      socket.disconnect(); // Cleanup on unmount
    };
  }, []);

  const handleLogout = () => {
    if (username) {
      socket.emit("leave", { username });
    }
    if (typeof setUsers === "function") {
      setUsers([]); // Clear active users
    }
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };  

  return (
    <FiLogOut
      onClick={handleLogout}
      style={{ fontSize: "24px", cursor: "pointer", color: "#ff4d4d" }}
      title="Logout"
    />
  );
};

export default LogoutButton;
