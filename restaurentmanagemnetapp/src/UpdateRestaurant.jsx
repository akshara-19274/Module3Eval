import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import UpdateRestaurantForm from './UpdateRestaurantForm';
export default function UpdateRestaurant(){
    const {logout}=useAuth();
    const navigate=useNavigate();
    const location=useLocation();
    const id=location.state?.id;
    if (!id){
        return <div>No Restaurant selected for update.</div>
    }
    return (
        <div className='container'>
            <h2>Update Restaurant</h2>
            <button onClick={logout}>Logout</button>
            <UpdateRestaurantForm
            selectedID={id}
            onUpdated={()=>navigate("/admin/dashboard")}
            />
        </div>
    );
}