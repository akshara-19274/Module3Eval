import { Navigate } from "react-router-dom";
import {useAuth} from"./AuthContext.jsx";
export default function ProtectedRoute({children,requiredRole}){
    const {isAuthenticated,role}=useAuth();
    if(!isAuthenticated){
        return <Navigate to="/login" replace />;
    }
    if (requiredRole && role!==requiredRole){
        const fallback=role==="admin"?"/admin/dashboard":"/customers/dashboard";
        return <Navigate to={fallback} replace />;
    }
    return children;
}