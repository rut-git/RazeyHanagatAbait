import { Card } from "primereact/card";
import React, { useEffect } from "react";
import { render } from 'react-dom';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetDiscussionsQuery, useGetDiscussionByNameQuery } from '../app/discussionApiSlice'
import Disscussionbutton from './Discussionbutton'
import ShowDiscussion from './ShowDiscussion'
import { Button } from 'primereact/button';
import { useState } from 'react';
import axios from "axios";
import AddDiscussion from './AddDiscussion'

const Discussions = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { data, isError, isSuccess, refetch } = useGetDiscussionsQuery()
    const { refe, discussion } = location.state || "false"
    const [add,setAdd]=useState(false)

    const Request = async () => {

        const ans = await axios("http://localhost:1260/api/functionToken/" + localStorage.getItem("token"))

        if (ans.data.ans == false) {
            navigate("/login")
        }
    }
    useEffect(() => {
        Request();

    }, [])
    
    // console.log(discussion?discussion:'aaa'); 
    // const { data: data1, isError: isError1, isSuccess: isSuccess1 } = useGetDiscussionByNameQuery(discussion?.name)
    // useEffect(() => {
    //     console.log(data1);
    // }, [isSuccess1])
    useEffect(() => {
    if (refe) {
        // render()
        
        console.log("before ShowDiscussion refe is ", refe);
        navigate(`/discussionButton`, { state: { discussion: discussion, name: discussion?.userId?.name } })
        console.log("after ShowDiscussion refe is ", refe);
    }
}, [])


    return (

        <div style={{ marginLeft: '30%' }}>

            {/* <br /><br /> */}
            {/* {add || <Button label='הוסף דיון' onClick={() => setAdd(true)} />} */}
            {/* {add && <AddDiscussion refetch={refetch} />} */}
            {/* <br /><br /><br /> */}
            {/* {data?console.log(data):"aaa"}
            {data?data.map(() => { console.log(data) }):"a"} */}
            {/* {data?.map(element=>console.log(element?.userId.name?element.userId.name:"aaa"))} */}
            <br/><br/>
            {add ||<Button label='הוסף דיון'  onClick={() =>setAdd(true)} />}


            {add &&  <AddDiscussion refetch={refetch}/>}
            <br/><br/><br/>
            {isSuccess && data?.map(element => <Disscussionbutton discussion={element} name={element?.userId?.name} />)}
        </div>
    )
}

export default Discussions
