// import { Button } from 'primereact/button';
// import { useState } from 'react';
// import ShowDiscussion from './ShowDiscussion'
// import {useUpdateDiscussionReadMutation} from '../app/discussionApiSlice'
// import { useNavigate } from 'react-router-dom';
// const Disscussionbutton = (props) => {
//     // const [update,{ data, isError, isSuccess }] = useUpdateDiscussionReadMutation()
//     const [show, setShow] = useState(false)
//     // const [read, setRead] = useState(props.discussion.read)
//     // const c = read ? 'unset' : 'large'
//     // const w=read?'150px':'180px'
//     const navigate=useNavigate()
//     const onClickButton = () => {
//         setShow(!show)
//         const obj={id:props.discussion._id,read:"true"}
        
//         // setRead(true)
//         // update(obj)
//         navigate(`/ShowDiscussion`,{state:{discussion:props.discussion}})
//     }

//     return (
//         <>
//            <Button label={props.discussion.discussionName} onClick={() =>onClickButton()} style={{width:'150px',justifyContent:'center'}}/>
//             <br /><br />
//             {/* {show && <ShowDiscussion discussion={props.discussion} refetch={props.refetch} />} */}
//         </>
//     )
// }
// export default Disscussionbutton

import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import ShowDiscussion from './ShowDiscussion'
import {useUpdateDiscussionReadMutation} from '../app/discussionApiSlice'
import { useNavigate,useLocation } from 'react-router-dom';
import { InputTextarea } from 'primereact/inputtextarea';

const Disscussionbutton = (props) => {
    const [update,{ data, isError, isSuccess }] = useUpdateDiscussionReadMutation() 
    const location = useLocation()

    const { discussion,name } = location.state||{}
    const [show, setShow] = useState(false)
   const date=props?.discussion?.updatedAt?.slice(0,10) 
   
//    props?.discussion?.userId?.name}
//    props?.discussion?.discussionName
    // const [read, setRead] = useState(props.discussion.read)
    // const c = read ? 'unset' : 'large'
    // const w=read?'150px':'180px'
    const navigate=useNavigate()
    const onClickButton = () => {
        setShow(!show)
        const obj={id:props.discussion._id,read:"true"}
        
        // setRead(true)
        update(obj)
        // navigate(`/ShowDiscussion`,{state:{discussion:props.discussion}})
        navigate(`/ShowDiscussion`, { state: { discussion: props?.discussion?props.discussion:discussion, name: props?.name?props.name:name  } })

    }
    
    // ||discussion.updatedAt.slice(0,10)
    return (
        <div style={{ width: '100%', alignItems: 'center' }}>
            <br />
            <div style={{ borderColor: 'white' }}><InputTextarea autoResize value={` created by: ${props?.discussion?.userId?.name}\t\t\t\t\tupdated at:${date}\t\t\t\t\t\t\t\t${props?.discussion?.discussionName}`} style={{  width: '80%' }} onClick={()=>onClickButton()}></InputTextarea ></div>

        {/* <div style={{ borderColor: 'white' }}><InputTextarea autoResize value={`${props.discussion.discussionName},updated at:${date}`} style={{ direction: 'rtl', width: '100%'}} onClick={()=>onClickButton()} ></InputTextarea ></div> */}
           {/* <Button label={props.discussion.discussionName} onClick={() =>onClickButton()} style={{width:'150px',justifyContent:'center'}}/> */}
            
            {/* {show && <ShowDiscussion discussion={props.discussion} refetch={props.refetch} />} */}
        </div>
    )
}
export default Disscussionbutton
