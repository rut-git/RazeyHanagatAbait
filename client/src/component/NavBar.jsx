
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import 'primeicons/primeicons.css';
import DecodeToken from '../DecodeToken'

import './Nav.css'
import logo from './logo/רזי הנהגת הבית.mp4'
import { Link } from 'react-router-dom';
import {  useNavigate } from "react-router-dom"
import { useSelector , useDispatch } from "react-redux"
import { removeToken } from "../authSlice"
import apiSlice from "../app/apiSlice"
export default function TemplateDemo() {
    const navigate=useNavigate();
    const decodeToken=DecodeToken()
   const users=decodeToken?.roles=='admin'||decodeToken?.roles=='secretary'
   
    const itemRenderer = (item) => (
        <Link to={item.label=='יציאה' ? isUserLoggedIn?item.url:item.secondUrl:item.url}> 
            <span className="mx-2" class="bar">{item.label=='יציאה' ? isUserLoggedIn?item.label:item.secondLabel:item.label=='משתמשים'? users && item.label :item.label}</span>
            <span className={item.label=='יציאה' ? isUserLoggedIn?item.icon:item.secondIcon:item.label=='משתמשים'? users && item.icon :item.icon} style={{color:'white'}} />
            {/* {item.icon && <Badge className="mx-2" value={item.icon} />} */}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.icon}</span>}
        </Link>
   
    );
    const itemRenderer1 = (item) => (
        <Link to={item.url}>
            <span className="mx-2" style={{color:'white',width:'250px'}}>{item.label}</span>
            
            <span className={item.icon}  style={{color:'white'}}/>
            
            {/* {item.badge && <Badge className="ml-auto" value={item.badge} />} */}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.icon}</span>}
        </Link>
    );

    const items = [
        {
            label: 'יציאה',
            secondLabel:'התחברות',
            icon: 'pi pi-sign-out',
            secondIcon:'pi pi-sign-in',
            template: itemRenderer,
            url: './logout',
            secondUrl:'./login'
        },
        {
            label: 'משתמשים',
            icon: 'pi pi-user',
            template: itemRenderer,
            url: './users',
        },
        
        {
            label: 'שיעורים',
            icon: 'pi pi-book',
            template: itemRenderer,
            items: [
                {
                    label: 'הקלטות',
                    icon: 'pi pi-microphone',
                    // shortcut: '⌘+S',
                    template: itemRenderer1,
                    url:'./audioList'
                    
                },
                {
                    label: 'הסרטות',
                    icon: 'pi pi-video',
                    // shortcut: '⌘+B',
                    template: itemRenderer1,
                    url:'./videoList'
                    
                },
                {
                    label: 'מאמרים',
                    icon: 'pi pi-pencil',
                    // shortcut: '⌘+U',
                    template: itemRenderer1,
                    url:'./ArticleList'
                   
                },
                {
                    separator: true
                },]
        },
        {
            label: 'דיונים',
            icon: 'pi pi-comments',
            template: itemRenderer,
            url: 'discussions'
        },
        {
            label: 'אזור אישי',
            icon: 'pi pi-star',
            url: './personalArea',
            template: itemRenderer,
        },
        {
            label: 'דף הבית',
            icon: 'pi pi-home',
            url: './',
            template: itemRenderer,
        }
    ];

    const navBarlogo = <video alt="logo" src={logo} height="50" className="mr-2" autoPlay muted loop  onClick={()=>{navigate('/')}}></video>;
    // const searchInput = (
    //     <InputText type="text" className="w-8rem sm:w-auto" class="search" />
    // )
    const {isUserLoggedIn} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const handleLogoutClick = () =>{
    dispatch(removeToken())
    dispatch(apiSlice.util.resetApiState())
    navigate("/")
    }
    return (
        <div className="nav">
            <Menubar model={items} end={navBarlogo} />
            {/* {isUserLoggedIn &&  <button onClick={handleLogoutClick} className='pi pi-sign-out'> Logout </button> } */}
        </div>
    )
}