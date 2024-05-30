import { useNavigate } from "react-router-dom";
import React, { useState,useEffect } from "react";
import PersonalArea from "./PersonalArea";

const PrivateRoute= ({ Component }) => {
 
const navigate=useNavigate()



useEffect(()=>{
 
 localStorage.getItem("token") ? <PersonalArea/> : navigate("/login");
  
},[])

return (<></>)

}
export default PrivateRoute;