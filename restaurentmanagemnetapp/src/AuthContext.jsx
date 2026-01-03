import React,{createContext,useContext,useState,useEffect} from 'react';
const AuthContext=createContext(null);
export function AuthProvider({children}){
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [role,setRole]=useState(null);
    useEffect(()=>{
        const stored=localStorage.getItem("auth");
        if(stored){
            const parsed=JSON.parse(stored);
            setIsAuthenticated(parsed.isAuthenticated);
            setRole(parsed.role);
        }
    },[]);
    const login=(email,password)=>{
        const adminOK=email==="admin@gmail.com" && password==="admin1234";
        const customerOK=email==="customer@gmail.com" && password==="customer1234";
        if (!adminOK && !customerOK){
            alert("Invalid email or password");
            return {ok:false};
        }
        const nextRole=adminOK?"admin":"customer";
        setIsAuthenticated(true);
        setRole(nextRole);
        localStorage.setItem("auth",JSON.stringify({isAuthenticated:true,role:nextRole}));
        return {ok:true,role:nextRole};
    };
    const logout=()=>{
        setIsAuthenticated(false);
        setRole(null);
        localStorage.removeItem("auth");
    };
    return (
        <AuthContext.Provider value={{isAuthenticated,role,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth(){
    return useContext(AuthContext);
}