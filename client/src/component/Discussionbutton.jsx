import { Button } from 'primereact/button';
import { useState,useEffect } from 'react';
import ShowDiscussion from './ShowDiscussion'
import { InputTextarea } from 'primereact/inputtextarea';

import { useNavigate ,useLocation} from 'react-router-dom';
const Disscussionbutton = (props) => {
    const location = useLocation()
    const { discussion,name } = location.state||{}
    const date=props?.discussion?.updatedAt?.slice(0,10) 

   

    const [show, setShow] = useState(false)

    const navigate = useNavigate()
    const onClickButton = () => {
        setShow(!show)
      
        const obj = { id: props.discussion?props.discussion._id:discussion._id }

        navigate(`/ShowDiscussion`, { state: { discussion: props?.discussion?props.discussion:discussion, name: props?.name?props.name:name } })


    }

    const a = ''
    return (
        <div style={{ width: '100%', alignItems: 'center' }}>

            <div style={{ borderColor: 'white' }}><InputTextarea autoResize value={` created by: ${props?.discussion?.userId?.name}\t\t\t\t\tupdated at:${date}\t\t\t\t\t\t\t\t${props?.discussion?.discussionName}`} style={{  width: '80%' }} onClick={()=>onClickButton()}></InputTextarea ></div>

            <br /><br />
        </div>
    )
}
export default Disscussionbutton
