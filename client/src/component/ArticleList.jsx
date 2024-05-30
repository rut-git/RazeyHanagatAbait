import React, { useState } from 'react';
import './Article.css'
import { useGetArticleByRoleQuery } from '../app/articleApiSlice'
import Article from './Article'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DecodeToken from '../DecodeToken'
import axios from "axios";
export default function ArticleList() {
    
const roles=DecodeToken()
    const navigate = useNavigate();
  

    const [ready, setReady] = useState(false)

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
  
    const { data, isLoading, isError, isSuccess, error, refetch } = useGetArticleByRoleQuery();

    useEffect(() => {
        if (roles.roles == "admin"||roles.roles == "secretary") {
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
            }

        </div>
    )
}