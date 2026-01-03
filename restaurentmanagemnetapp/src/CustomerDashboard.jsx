import React,{useState,useMemo,useEffect} from 'react';
import { useAuth } from './AuthContext.jsx';
import Navbar from './Navbar.jsx';
import RestaurantCard from './RestaurantCard';
import { getRestaurants } from './storage';
export default function CustomerDashboard(){
    const {logout}=useAuth();
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
    return (
        <div className='container'>
            <h2>Customer Dashboard</h2>
            <button onClick={logout}>Logout</button>
            <Navbar
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                parkingFilter={parkingFilter}
                setParkingFilter={setParkingFilter}
                search={searchText}
                setSearch={setSearchText}
            />
            <h3>Restaurants</h3>
            {filtered.map((r)=>(
                <RestaurantCard
                    key={r.restaurantID}
                    restaurant={r}
                />
            ))}
        </div>
    );
}