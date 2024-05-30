import { useNavigate } from "react-router-dom";
import React, { useState,useEffect } from "react";
import PersonalArea from "./PersonalArea";

const PrivateRoute= ({ Component }) => {
 
// const [isAuthenticated, setIsAuthenticated] = useState(0);
const navigate=useNavigate()


// useEffect(()=>{
//   debugger
//   if(localStorage.getItem("token"))
//   {setIsAuthenticated(1)
//   console.log("aaaaaa");}
    
// },[])

useEffect(()=>{
 
 localStorage.getItem("token") ? <PersonalArea/> : navigate("/login");
  
},[])
// return(
//   <>
//   {!isAuthenticated && navigate("/login")}
//   </>
// )
return (<></>)

}
export default PrivateRoute;