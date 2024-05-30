import { useGetPathByIdQuery } from '../app/videoApiSlice';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DecodeToken from '../DecodeToken'
import { Button } from 'primereact/button';
import UsersDialogue from './UsersDialogue';
import { Dropdown } from 'primereact/dropdown';

const PersonalArea = (props) => {
    
    const [show,setShow]=useState(false)

    const navigate = useNavigate()
    const [selectedRole, setSelectedRole] = useState("");
    
 const role = [
            { name: 'מנהל', code: 'admin' },
            { name: 'מזכירה', code: 'secretary' }
        ];
        const [ready,setReady]=useState(false)

        let roles=null ;
    const Request = async () => {
        
       const ans = await axios("http://localhost:1260/api/functionToken/" + localStorage.getItem("token"))

        if (ans.data.ans == false) {

            navigate("/login")
        }
    }
    useEffect(() => {

        Request();

        setReady(true)
    }, [])
    useEffect(() => {

         roles = DecodeToken()
    }, [ready])

    

    useEffect(() => {
        if (roles.roles == "admin"||roles.roles=="secretary") {
            navigate("/personalAreaAdmin")
        }
        // else {
        //     navigate("/login")
        // }

    }, [roles])

    const openDialogue=(e)=>{
    setSelectedRole(e.value)
    setShow(true)
}

    return (

        <div>
          {/* <Button onClick={()=>{setShow(true)}} className="pi pi-messages" style={{marginTop:'3%'}}>הצג הודעות</Button> */}
            <Dropdown value={selectedRole} onChange={(e) => openDialogue(e)} options={role} optionLabel="name"
                        placeholder="בחר הרשאה" className="w-full md:w-14rem" />

            {/* /<Button onClick={()=>{navigate('/register')}}className="pi pi-user-plus">הוסף משתמש</Button> */}
            {show&& navigate('/UsersDialogue', {state:{role:selectedRole}})} 
        </div>)
}
export default PersonalArea