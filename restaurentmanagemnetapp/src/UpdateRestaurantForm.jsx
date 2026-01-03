import React , {useState,useEffect} from 'react';
import { getRestaurants,setRestaurants } from './storage';
export default function UpdateRestaurantForm({selectedID,onUpdated}) {
    const [restaurantName,setRestaurantName]=useState("");
    const [address,setAddress]=useState("");
    const [type,setType]=useState("");
    const [parkingLot,setParkingLot]=useState("true");
    const [image,setImage]=useState("");
    useEffect(()=>{
        const list=getRestaurants();
        const item=list.find((r)=>r.restaurantID===selectedID);
        if (item){
            setRestaurantName(item.restaurantName);
            setAddress(item.address);
            setType(item.type);
            setParkingLot(item.parkingLot?"true":"false");
            setImage(item.image);
        }
    },[selectedID]);
    const handleUpdate=()=>{
        if(!restaurantName.trim() || !address.trim()){
            alert("Please fill in all required fields.");
            return;
        }
        const ok=confirm("Are you sure you want to update this restaurant?");
        if (!ok) return;
        const list=getRestaurants();
        const next=list.map((r)=>
            r.restaurantID===selectedID?{...r,restaurantName,address,type,parkingLot:parkingLot==="true",image,}:r
        );
        setRestaurants(next);
        alert("Restaurant updated successfully!");
        onUpdated?.(next);
    };
    return (
        <div className='form'>
            <input type="text" placeholder="Restaurant Name" value={restaurantName} onChange={(e)=>setRestaurantName(e.target.value)}/>
            <input type="text" placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
            <select value={type} onChange={(e)=>setType(e.target.value)}>
                <option value="Rajasthani">Rajasthani</option>
                <option value="Gujarati">Gujarati</option>
                <option value='Mughlai'>Mughlai</option>
                <option value="Jain">Jain</option>
                <option value="Thai">Thai</option>
                <option value="North Indian">North Indian</option>
                <option value="South Indian">South Indian</option>
            </select>
            <select value={parkingLot} onChange={(e)=>setParkingLot(e.target.value)}>
                <option value="true">Parking Available</option>
                <option value="false">No Parking</option>
            </select>
            <input type="text" placeholder="Image URL" value={image} onChange={(e)=>setImage(e.target.value)}/>
            <button onClick={handleUpdate}>Update Restaurant</button>
        </div>
    );
}