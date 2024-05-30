import React from 'react';
import './Article.css'
import { useGetArticleByRoleQuery } from '../app/articleApiSlice'
import Article from './Article'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DecodeToken from '../DecodeToken'
import axios from "axios";
export default function ArticleList() {
    
    const { data, isError, isSuccess, refetch } = useGetArticleByRoleQuery()
    const navigate = useNavigate()

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
        if (isSuccess) {
            refetch()
        }
    }, [isSuccess])

    const {roles} = DecodeToken()

    useEffect(() => {
        if (roles == "admin") {
            navigate("/articleListAdmin")
        }
        

    }, [roles])

    return (
        <div>
        
<br/>
            {isSuccess &&
                data.map(element =>
                    <Article name={element} />
                )
                //    console.log("data") 
            }

        </div>
    )
}