import React, { useRef } from 'react';
import { Panel } from 'primereact/panel';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { useGetArticlesQuery } from '../app/articleApiSlice'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useDeleteArticleMutation,useUpdateArticleMutation} from '../app/articleApiSlice'
import { SpeedDial } from 'primereact/speeddial';
import { Toast } from 'primereact/toast';
import axios from "axios";
const ArticleAdmin = (props) => {
    const navigate = useNavigate()
    const [deleteA, { isError, isSuccess, error, isLoading, data }] = useDeleteArticleMutation()


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
            props.refetch()
        }
    }, [isSuccess])

    const configMenu = useRef(null);


    const items = [
        {
            label: 'עדכון',
            icon: 'pi pi-refresh',
            command:()=>{navigate(`../updateArticle`,{state:{article:props.name}})}
        },
        // {
        //     label: 'חיפוש',
        //     icon: 'pi pi-search'
        // },
        {
            separator: true
        },
        {
            label: 'מחיקה',
            icon: 'pi pi-times',
            command:()=>{deletearticle()}
        }
    ];
    
const deletearticle=()=>{
    deleteA(props.name._id)
}

    const headerTemplate = (options) => {
        const className = `${options.className} justify-content-space-between`;



        return (
            <div className={className} dir='rtl'>
                <div className="flex align-items-center gap-2" >
                    <Avatar  size="large" shape="circle" icon='pi pi-book'/>
                    <span className="font-bold">{props.name.name}</span>
                </div>
                <div>
                    <Menu model={items} popup ref={configMenu} id="config_menu" />
                    <button className="p-panel-header-icon p-link mr-2" onClick={(e) => configMenu?.current?.toggle(e)}>
                        <span className="pi pi-cog"></span>
                    </button>
                    {options.togglerElement}



                </div>
            </div>
        );
    };

    const footerTemplate = (options) => {
        // const className = `${options.className} flex flex-wrap align-items-center justify-content-between gap-3`;

        // return (
        //     <div className={className}>
        //         <div className="flex align-items-center gap-2">
        //             {/* <SpeedDial model={roles} direction="left" style={{ top: 'calc(50% - 2rem)', right: 0 }} value="הרשאות"/> */}
        //             <Button icon="pi pi-user" rounded text>הרשאות</Button>
        //             {/* <Button icon="pi pi-bookmark" severity="secondary" rounded text></Button> */}
        //             {/* <span className="p-text-secondary">Updated 2 hours ago</span> */}
        //         </div>
                
        //     </div>
        // );
    };

    return (
        <Panel headerTemplate={headerTemplate} footerTemplate={footerTemplate} toggleable >
            {/* <p className="m-0">
                {props.name.article}
            </p> */}
             <div
                            dangerouslySetInnerHTML={{
                                __html: props.name.article
                            }}></div>
        </Panel>
    )
}
export default ArticleAdmin