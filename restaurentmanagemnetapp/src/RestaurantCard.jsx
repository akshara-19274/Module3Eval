import React from 'react';
export default function RestaurantCard({
    restaurant,
    isAdmin=false,
    onUpdate,
    onDelete,
}) {
    const {image,restaurantName,address,type,parkingLot}=restaurant;
    return (
        <div className="card">
            <img src={image} alt={restaurantName}/>
            <div className='card-details'>
                <div><strong>Name:</strong>{restaurantName}</div>
                <div><strong>Address:</strong>{address}</div>
                <div><strong>Type:</strong>{type}</div>
                <div><strong>Parking:</strong>{parkingLot?"Available":"Not Available"}</div>
            </div>
            {isAdmin && (
                <div className="card-actions">
                    <button onClick={()=>onUpdate(restaurant)}>Update</button>
                    <button onClick={()=>onDelete(restaurant)}>Delete</button>
                </div>
            )}
        </div>
    );
}