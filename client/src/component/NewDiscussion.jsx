import React, { useState, useEffect } from 'react';
// import { ProductService } from './service/ProductService';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {useGetDiscussionsQuery} from '../app/discussionApiSlice'
import image from "./penguins_small.png"
export default function NewDiscussion() {
    const navigate=useNavigate()

    const Request = async () => {
       
        const ans = await axios("http://localhost:1260/api/functionToken/" + localStorage.getItem("token"))
        
        if (ans.data.ans == false) {

            navigate("/login")
        }
    }
    useEffect(() => {
         Request();
        
}, [])

    const { data, isError, isSuccess, refetch } = useGetDiscussionsQuery()
    const [discussions, setDiscussions] = useState([]);
    const [layout, setLayout] = useState('grid');

    useEffect(() => {
        setDiscussions(data)
    }, [data]);

   

    const listItem = (discussion, index) => {
        return (
            <div className="col-12" key={discussion._id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={image} alt={discussion.discussionName} style={{width:'160px',height:'120px'}}/>
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{discussion.discussionName}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{discussion.discussionName}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${discussion.discussionName}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" ></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (discussion) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={discussion._id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{discussion.discussionName}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={image} alt={discussion.discussionName} style={{width:'160px',height:'120px'}}/>

                        <div className="text-2xl font-bold">{discussion.discussionName}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${discussion.discussionName}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded"></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter">{products?.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={discussions} listTemplate={listTemplate} layout={layout} header={header()} />
        </div>
    )
}
        
