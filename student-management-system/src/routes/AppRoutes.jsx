import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Login from '../pages/Login';      // moved to pages or auth
import Dashboard from '../pages/Dashboard';
import StudentList from '../pages/StudentList';
import AddStudent from '../pages/AddStudent';
import EditStudent from '../pages/EditStudent';
import StudentDetails from '../pages/StudentDetails';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<div>Unauthorized</div>} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/students/:id/edit" element={<EditStudent />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;