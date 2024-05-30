import React, { useState, useEffect } from 'react';
import { OrderList } from 'primereact/orderlist';
// import { ProductService } from './service/ProductService';
import {useGetUsersQuery,useDeleteUserMutation} from '../app/userApiSlice'
import { Button } from 'primereact/button';
import UpdateUser from './UpdateUser'
import { useNavigate } from 'react-router-dom';
export default function ShowAllUsersOriginal() {
    const { refetch,data, isError, isSuccess } =useGetUsersQuery()
    const [products, setProducts] = useState([])
    const[delete1,{data:data1,isError:isError1,isSuccess:isSuccess1}]=useDeleteUserMutation()
const navigate=useNavigate()
    useEffect(()=>{
        if(isSuccess)setProducts(data)
    },[isSuccess])

   

    const deleteUser=(item)=>{
        const id=item._id
        delete1(id);
        
    }
    
const itemTemplate = (item) => {
        return (
            <div className=" btn flex flex-wrap p-2 align-items-center gap-3" style={{direction:'rtl'}} tabindex="-1">
                
                <div className="w-4rem shadow-2 flex-shrink-0 border-round pi pi-user" tabindex="-1"/>
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{item.name}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span>{item.roles}</span>
                    </div>
                </div>
                {item.phone && <span className="font-bold text-900 pi pi-phone" >{item.phone}</span>}
                {item.name &&<span className="font-bold text-900 pi pi-phone" >{item.name}</span>}
                {item.email && <span className="font-bold text-900 pi pi-at">email:{item.email}</span> }
                <br/>
                {<Button className='btn'onClick={()=>{deleteUser(item)}} accessKey='false'>מחיקה</Button>}
                {<Button className='btn'onClick={()=>{navigate('../UpdateUser' ,{state:{user:item}})}} accessKey='false'>עדכון</Button>}
                <br/><br/>
            </div>
        );
    };
    
    return (
        <div className="card xl:flex xl:justify-content-center">
            {/* <OrderList dataKey="id" value={products} onChange={(e) => setProducts(e.value)} itemTemplate={itemTemplate} header="Users" filter filterBy="name"></OrderList> */}
            <OrderList dataKey="id" value={products} onChange={(e) => setProducts(e.value)} itemTemplate={itemTemplate} header="Users"style={{height:'2000px',maxHeight:'200000px'}} tabindex="-1"></OrderList>
        </div>
    )
}
         