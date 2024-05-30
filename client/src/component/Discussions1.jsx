// import { Card } from "primereact/card";
// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {useGetDiscussionsQuery} from '../app/discussionApiSlice'
// import Disscussionbutton from './Discussionbutton'
// import AddDiscussion from './AddDiscussion'
// import { Button } from 'primereact/button';
// import { useState } from 'react';
// import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // import axios from "axios";
// const Discussions = () => {
//     const navigate=useNavigate()

//     const Request = async () => {
       
//         const ans = await axios("http://localhost:1260/api/functionToken/" + localStorage.getItem("token"))
        
//         if (ans.data.ans == false) {

//             navigate("/login")
//         }
//     }
//     useEffect(() => {
//          Request();
        
// }, [])

// const { data, isError, isSuccess, refetch } = useGetDiscussionsQuery()
// const [add,setAdd]=useState(false)


//     return(
// <div style={{marginLeft:'30%'}}>

// <br/><br/>
// {add ||<Button label='הוסף דיון'  onClick={() =>setAdd(true)} />}


// {add &&  <AddDiscussion refetch={refetch}/>}
// <br/><br/><br/>
// {isSuccess && data.map(element=><Disscussionbutton discussion={element} refetch={refetch}/>)}

// </div>
//     ) 
// }
// export default Discussions


import { Card } from "primereact/card";
import React, { useEffect } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import {useGetDiscussionsQuery} from '../app/discussionApiSlice'
import Disscussionbutton from './Discussionbutton'
import AddDiscussion from './AddDiscussion'
import { Button } from 'primereact/button';
import { useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';

import axios from "axios";

const Discussions = () => {
    const navigate=useNavigate()
    const location = useLocation()
    const { refe, discussion } = location.state || "false"

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
    if (refe) {
        // render()
        
        navigate(`/discussionButton`, { state: { discussion: discussion}, name: discussion?.userId?.name  })
    }
}, [])
const { data, isError, isSuccess, refetch } = useGetDiscussionsQuery()
const [add,setAdd]=useState(false)

    return(
<div style={{marginLeft:'30%'}}>

<br/><br/>
{add ||<Button label='הוסף דיון'  onClick={() =>setAdd(true)} />}


{add &&  <AddDiscussion refetch={refetch}/>}
<br/><br/><br/>
{isSuccess && data.map(element=><Disscussionbutton discussion={element} refetch={refetch}/>)}

</div>
    ) 
}
export default Discussions
