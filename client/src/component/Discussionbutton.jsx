import { Button } from 'primereact/button';
import { useState,useEffect } from 'react';
import ShowDiscussion from './ShowDiscussion'
// import { useHistory } from 'react-router-dom';
import { InputTextarea } from 'primereact/inputtextarea';

// import { useUpdateDiscussionReadMutation } from '../app/discussionApiSlice'
import { useNavigate ,useLocation} from 'react-router-dom';
const Disscussionbutton = (props) => {
    // const history = useHistory();
    const location = useLocation()
    const { discussion,name } = location.state||{}
    const date=props?.discussion?.updatedAt?.slice(0,10) 

   
    // console.log(props.discussion);
    // const [update, { data, isError, isSuccess }] = useUpdateDiscussionReadMutation()
    const [show, setShow] = useState(false)
    // const [read, setRead] = useState(props.discussion.read)
    // const c = read ? 'unset' : 'large'
    // const w=read?'150px':'180px'
    const navigate = useNavigate()
    const onClickButton = () => {
        setShow(!show)
        if(props.discussion)
        console.log("discussion",props.discussion);
        const obj = { id: props.discussion?props.discussion._id:discussion._id }
        console.log("obj",obj);
        // setRead(true)
        // update(obj)
        navigate(`/ShowDiscussion`, { state: { discussion: props?.discussion?props.discussion:discussion, name: props?.name?props.name:name } })

        // history.push({
        //     pathname: '/ShowDiscussion',
        //     state: { discussion: props.discussion },
        //     refetch: true // You can pass additional data to indicate a refetch is needed
        // });
        // props.refetch(); // Trigger the refetch function after navigation

    }
    useEffect(() => {
        if(discussion)
        {console.log("qqqqqqqqqqqqqqqq",discussion.discussion);
        onClickButton();}
            }, [])
    const a = ''
    return (
        <div style={{ width: '100%', alignItems: 'center' }}>

            {/* <Button onClick={() => onClickButton()}  >{`${props?.discussion?.discussionName} ${a}\n   ${props?.discussion?.userId?.name}`}</Button> */}
            <div style={{ borderColor: 'white' }}><InputTextarea autoResize value={` created by: ${props?.discussion?.userId?.name}\t\t\t\t\tupdated at:${date}\t\t\t\t\t\t\t\t${props?.discussion?.discussionName}`} style={{  width: '80%' }} onClick={()=>onClickButton()}></InputTextarea ></div>

            {/* <button  onClick={() =>onClickButton()} style={{width:'100%',backgroundColor:'white',color:'#111827',fontSize:'20px',textAlign:'end',borderRadius:'5px',margin:'-15%'}} >{`${props.discussion.discussionName} ${a}\n   ${props.discussion._id}`}</button> */}
            <br /><br />
            {/* {show && <ShowDiscussion discussion={props.discussion} refetch={props.refetch} />} */}
        </div>
    )
}
export default Disscussionbutton
