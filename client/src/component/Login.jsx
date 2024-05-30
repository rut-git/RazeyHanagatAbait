
import React, { useState,useEffect } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from "primereact/checkbox";
import { useLoginUserMutation } from '../app/userApiSlice';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../authSlice';
import { useDispatch } from 'react-redux';
import { Password } from 'primereact/password';

export default function HeadlessDemo() {
    const [visible, setVisible] = useState(true);
    const [value, setValue] = useState('');
    const navigate=useNavigate()
    const dispatch = useDispatch()

    const [Login, {isError, isSuccess, error,isLoading,data}] =useLoginUserMutation()

    const onclicklogin=()=>{
        setVisible(false)
        const userName=document.getElementById("username").value
        const password=document.getElementById("password").value
        Login({userName:userName,password:password})

    }
const onclickCancel=(e)=>{
    navigate('/')
}
    useEffect(()=>{
        if(isSuccess){
        dispatch(setToken(data))



        navigate("/")
        }

        },[isSuccess])

        useEffect(()=>{
            if(isError){
            alert("אינך מורשה")
            navigate("/")
            }
    
            },[isError])

    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={visible}
                style={{direction:'rtl' ,padding:'20px'}}
                modal
                onHide={() => {
                    setVisible(false)}}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" >
                        <div className="inline-flex flex-column gap-2" >
                            <label htmlFor="username" className="text-primary-50 font-semibold" >
                             שם משתמש  
                            </label>
                            
                            <InputText id="username" label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50" ></InputText>
                        </div>
                        <br/>
                        <div className="inline-flex flex-column gap-2" >
                            <label htmlFor="username" className="text-primary-50 font-semibold" >
                                 סיסמה
                            </label>
                            <InputText id="password" label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="password" style={{marginRight:'10.5%'}}></InputText>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="הכנס" onClick={(e) => onclicklogin()} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="ביטול" onClick={(e) => onclickCancel(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" ></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    )
}



