import React,{useEffect,useRef} from 'react';
export default function Navbar({
    typeFilter,
    setTypeFilter,
    parkingFilter,
    setParkingFilter,
    search,
    setSearch,
}){
    const searchRef=useRef(null);
    useEffect(()=>{
        if(searchRef.current) searchRef.current.focus();
    },[]);
    return (
        <nav className="navbar">
            <select value={typeFilter} onChange={(e)=>setTypeFilter(e.target.value)}>
                <option value="">All</option>
                <option value="Rajasthani">Rajasthani</option>
                <option value="Gujarati">Gujarati</option>
                <option value='Mughlai'>Mughlai</option>
                <option value="Jain">Jain</option>
                <option value="Thai">Thai</option>
                <option value="North Indian">North Indian</option>
                <option value="South Indian">South Indian</option>
            </select>
            <select value={parkingFilter} onChange={(e)=>setParkingFilter(e.target.value)}>
                <option value="">All</option>
                <option value="true">Available</option>
                <option value="false">Not Available</option>
            </select>
            <input
                ref={searchRef}
                type="text"
                placeholder="Search by name or address"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
            />
        </nav>
    );
}
