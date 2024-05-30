import React from 'react';
import './Article.css'
import Article from './Article'
import { useNavigate } from 'react-router-dom';

export default function ShowArticleName(props) {
    const navigate = useNavigate()

    return (
        <div id='articleName'>
       
            <button onClick={() => { navigate("/article/" + props.name) }}>{props.name}</button>

        </div>
    )
}