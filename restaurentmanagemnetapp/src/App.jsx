import {Routes,Route,Navigate} from "react-router-dom"
import Login from "./Login.jsx"
import AdminDashboard from "./AdminDashboard.jsx"
import CustomerDashboard from "./CustomerDashboard.jsx"
import UpdateRestaurant from "./UpdateRestaurant.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx"
export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/dashboard" element={
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/customers/dashboard" element={
        <ProtectedRoute requiredRole="customer">
          <CustomerDashboard />
        </ProtectedRoute>
      }
      />
      <Route path="/admin/restaurants/update" element={
        <ProtectedRoute requiredRole="admin">
          <UpdateRestaurant />
        </ProtectedRoute>
      }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}