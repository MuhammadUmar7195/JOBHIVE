import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import JobDescription from "./components/JobDescription";
import Profile from "./components/Profile";
import Browse from "./components/Browse";
import { useSelector } from "react-redux";
import Companies from "./components/admin/Companies";
import AdminJobs from "./components/admin/AdminJobs";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";

//For protection for student
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state?.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state?.auth);
  if (!user) return <Navigate to="/login" />;
  if (user.role === "student") return <Navigate to="/" />;
  return children;
};

const App = () => {
  const { user } = useSelector((state) => state?.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/browse"
          element={
            <ProtectedRoute>
              <Browse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/description/:id"
          element={
            <ProtectedRoute>
              <JobDescription />
            </ProtectedRoute>
          }
        />
        {/* Admin Routes */}
        <Route path="/admin/companies" element={<AdminRoute><Companies /></AdminRoute>} />
        <Route path="/admin/jobs" element={<AdminRoute><AdminJobs /></AdminRoute>} />
        <Route path="/admin/companies/create" element={<AdminRoute><CompanyCreate /></AdminRoute>} />
        <Route path="/admin/companies/:id" element={<AdminRoute><CompanySetup /></AdminRoute>} />
        <Route path="/admin/jobs/create" element={<AdminRoute><PostJob /></AdminRoute>} />
        <Route path="/admin/jobs/:id/applicants" element={<AdminRoute><Applicants /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
