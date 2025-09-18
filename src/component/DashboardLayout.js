import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar fixed left */}
      <div style={{ width: "250px" }}>
        <Sidebar />
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <div style={{ flex: 1, padding: "20px", backgroundColor: "#f1f1f1" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
