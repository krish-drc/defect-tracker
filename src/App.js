import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./component/AdminLogin";
import AdminDashboard from "./component/Dashboard"; // Make sure path correct
import PostProject from "./component/post-project";
import AddEmployee from "./component/add-employee";
import AssignRole from "./component/add-role";
import ManageProjects from "./component/manage-project";
import ManageEmployee from "./component/manage-employee";
import ManageRoles  from "./component/manage-role";
import EditRole from "./component/edit-role";
import EditProject from "./component/edit-project";
import EditEmployee from "./component/edit-employee";

function App() {
  return (
    <Router>
      <Routes>
        {/* Existing login route */}
        <Route path="/" element={<AdminLogin />} />

        {/* Admin Dashboard route */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/post-project" element={<PostProject />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/add-role" element={<AssignRole />} />
        <Route path="/manage-project" element={<ManageProjects />} />
        <Route path="/manage-employee" element={<ManageEmployee />} />
        <Route path="/manage-role" element={<ManageRoles />} />
        <Route path="/edit-role/:id" element={<EditRole />} />
        <Route path="/edit-project/:id" element={<EditProject />} />      
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
        </Routes>
    </Router>
  );
}

export default App;
