import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import DashboardLayout from "../component/DashboardLayout";

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    employees: 0,
    role: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const projectsSnap = await getDocs(collection(db, "projects"));
      const employeesSnap = await getDocs(collection(db, "employees"));
      const roleSnap = await getDocs(collection(db, "projectAssignments"));


      setStats({
        projects: projectsSnap.size,
        employees: employeesSnap.size,
        role: roleSnap.size,
      });
    };
    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-4">
        <h2>Dashboard</h2>
        <div className="row">
          {[
            { label: "Projects", value: stats.projects, color: "primary" },
            { label: "Employees", value: stats.employees, color: "success" },
            { label: "Assign Roles", value: stats.role, color: "info" },
          ].map((item, idx) => (
            <div className="col-md-3 mb-3" key={idx}>
              <div className={`card text-white bg-${item.color} h-100`}>
                <div className="card-body text-center">
                  <h3>{item.value}</h3>
                  <p>{item.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
