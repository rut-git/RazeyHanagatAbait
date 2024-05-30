import React from 'react';
import './Article.css'
import { useGetArticlesQuery } from '../app/articleApiSlice'
import ShowArticleName from './ShowArticleName'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {button} from 'primereact/button'
import axios from "axios";
import ArticleAdmin from './ArticleAdmin';
import { Button } from 'primereact/button';

export default function ArticleListAdmin() {
  
    const { data, isError, isSuccess, refetch } = useGetArticlesQuery()
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
    
    return (
        <div>
            <Button onClick={()=>{navigate('/createArticle')}} style={{marginTop:'2%',fontSize:'large'}}>הוסף מאמר</Button>
            <br></br><br></br><br></br><br></br>
            {isSuccess &&
                data.map(element =>
                    <ArticleAdmin name={element} refetch={refetch}/>
                )
            }

        </div>
    )
}