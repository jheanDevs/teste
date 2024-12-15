import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { 
  Dashboard,
  Properties,
  Tenants,
  Contracts,
  Payments,
  Login
} from '../pages';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="properties" element={<Properties />} />
        <Route path="tenants" element={<Tenants />} />
        <Route path="contracts" element={<Contracts />} />
        <Route path="payments" element={<Payments />} />
      </Route>
    </Routes>
  );
}