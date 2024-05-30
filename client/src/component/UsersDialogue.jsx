import { useGetPathByIdQuery } from '../app/videoApiSlice';
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DecodeToken from '../DecodeToken'
import {useGetDialogsByUserIdQuery} from '../app/dialogApiSlice'
import { Button } from 'primereact/button';
import AddDialog from './AddDialog';
import Dialogbutton from './Dialogbutton';
const UsersDialogue = () => {

    const location = useLocation()

    const { role } = location.state
const {_id}=DecodeToken()
    let { data, isError, isSuccess, refetch } = useGetDialogsByUserIdQuery(_id)
    const[dataShow,setDataShow]=useState(false)
    const[filteredData,setFilteredData]=useState([])
    const navigate = useNavigate()
    const [add, setAdd]=useState(false)
    const Request = async () => {
        
        
        
        const ans = await axios("http://localhost:1260/api/functionToken/" + localStorage.getItem("token"))

        if (ans.data.ans == false) {

            navigate("/login")
        }
    }
    useEffect(() => {
        Request();

    }, [])
    useEffect(() => {
        if(isSuccess){
            
            setFilteredData(data.filter(d=>d.workerStatus==role.code))
        setDataShow(true)
    }
    }, [isSuccess])

    const {roles} = DecodeToken()


    return(
        <div style={{marginLeft:'30%'}}>
        
        <br/><br/>
        {add||<Button label='שליחת הודעה'  onClick={() =>{setAdd(true)}} />}
       
        {add &&  <AddDialog refetch={refetch} role={role.code}/>}
        <br/><br/><br/>
    
        {dataShow && filteredData?.map(element=><Dialogbutton dialogue={element} refetch={refetch}/>)}
    
        </div>
            ) 
}
export default UsersDialogue

