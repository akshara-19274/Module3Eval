import React,{useState} from 'react';
import {
    autoId,
    defaultImageUrl,
    getRestaurants,
    setRestaurants,
} from "./storage.js";
const TYPES=[
    "Rajasthani",
    "Gujarati",
    "Mughlai",
    "Jain",
    "Thai",
    "North Indian",
    "South Indian",
];
export default function AddRestaurantForm({onAdded}) {
    const [restaurantName,setRestaurantName]=useState("");
    const [address,setAddress]=useState("");
    const [type,setType]=useState(TYPES[0]);
    const [parkingLot,setParkingLot]=useState("true");
    const [image,setImage]=useState(defaultImageUrl());
    const clearForm=()=>{
        setRestaurantName("");
        setAddress("");
        setType(TYPES[0]);
        setParkingLot("true");
        setImage(defaultImageUrl());
    };
    const handleAdd=()=>{
        if(!restaurantName.trim() || !address.trim()){
            alert("Please fill in all required fields.");
            return;
        }
        const newItem={
            restaurantID:autoId(),
            restaurantName,
            address,
            type,
            parkingLot:parkingLot==="true",
            image,
        };
        const list =getRestaurants();
        const next=[...list,newItem];
        setRestaurants(next);
        onAdded?.(next);
        clearForm();
        alert("Restaurant added successfully!");
    };
    return (
        <div>
            <h3>Add Restaurant</h3>
            <div className="form">
                <input type="text" placeholder="Restaurant Name" value={restaurantName} onChange={(e)=>setRestaurantName(e.target.value)}/>
                <input type="text" placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                <select value={type} onChange={(e)=>setType(e.target.value)}>
                    {TYPES.map((t)=>(<option key={t} value={t}>{t}</option>))}
                </select>
                <select value={parkingLot} onChange={(e)=>setParkingLot(e.target.value)}>
                    <option value="true">Parking Available</option>
                    <option value="false">No Parking</option>
                </select>
                <input type="text" placeholder="Image URL" value={image} onChange={(e)=>setImage(e.target.value)}/>
                <button onClick={handleAdd}>Add Restaurant</button>
            </div>
        </div>
    );
}