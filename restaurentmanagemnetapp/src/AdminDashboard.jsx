import React,{useState,useEffect,useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import Navbar from './Navbar.jsx';
import AddRestaurantForm from './AddRestaurantForm';
import RestaurantCard from './RestaurantCard';
import { getRestaurants,setRestaurants } from './storage';
export default function AdminDashboard(){
    const {logout}=useAuth();
    const navigate=useNavigate();
    const [list,setList]=useState([]);
    const [typeFilter,setTypeFilter]=useState("");
    const [parkingFilter,setParkingFilter]=useState("");
    const [searchText,setSearchText]=useState("");
    useEffect(()=>{
        const restaurants=getRestaurants();
        setList(restaurants);
    },[]);
    const filtered=useMemo(()=>{
        return list
        .filter((r)=>(typeFilter?r.type===typeFilter:true))
        .filter((r)=>(parkingFilter?String(r.parkingLot)===parkingFilter:true))
        .filter((r)=>(searchText?r.restaurantName.toLowerCase().includes(searchText.toLowerCase())||r.address.toLowerCase().includes(searchText.toLowerCase()):true));
    },[list,typeFilter,parkingFilter,searchText]);
    const handleDelete=(restaurant)=>{
        const ok=confirm(`Are you sure you want to delete?`);
        if (!ok) return;
        const next=list.filter((r)=>r.restaurantID!==restaurant.restaurantID);
        setRestaurants(next);
        setList(next);
        alert("Restaurant deleted successfully!");
    }
    const handleUpdate=(restaurant)=>{
        navigate("/admin/restaurants/update/",{state:{id:restaurant.restaurantID}});
    };
    return (
        <div className='container'>
            <h2>Admin Dashboard</h2>
            <button onClick={logout}>Logout</button>
            <Navbar
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                parkingFilter={parkingFilter}
                setParkingFilter={setParkingFilter}
                search={searchText}
                setSearch={setSearchText}
            />
            <AddRestaurantForm onAdded={setList}/>
            <h3>Restaurants</h3>
            {filtered.map((r)=>(
                <RestaurantCard
                    key={r.restaurantID}
                    restaurant={r}
                    isAdmin={true}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    )
}
