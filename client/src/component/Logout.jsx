
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
import { removeToken } from "../authSlice"
import apiSlice from "../app/apiSlice"

export default function Logout() {
    const dispatch = useDispatch()

    const navigate=useNavigate();
    useEffect(()=>{
        dispatch(removeToken())
        dispatch(apiSlice.util.resetApiState())
        navigate("/")
    })

    return(

        <>
        </>
    )
}
        