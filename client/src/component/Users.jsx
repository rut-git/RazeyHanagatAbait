import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useGetUsersQuery} from '../app/userApiSlice'
import { Button } from "primereact/button";
import ShowAllUsers from './ShowAllUsers'

const Users = (props) => {
    const [show,setShow]=useState(false)
   const navigate=useNavigate()
   const { data, isError, isSuccess, refetch } = useGetUsersQuery()
    const Request = async () => {
       
        const ans = await axios("http://localhost:1260/api/functionToken/" + localStorage.getItem("token"))
        
        if (ans.data.ans == false) {

            navigate("/login")
        }
    }
    useEffect(() => {
         Request();
        
}, [])
// const getAllUsers=()=>{
    
    
    
// }


    return (

        <div style={{alignItems:"center"}}>
            <Button onClick={()=>{setShow(true)}} className="pi pi-users" style={{marginTop:'3%'}}>הצג משתמשים</Button>
            <br/><br/>
            <Button onClick={()=>{navigate('/register')}}className="pi pi-user-plus">הוסף משתמש</Button>
            {show&&<ShowAllUsers/>}
        </div>)
}
export default Users