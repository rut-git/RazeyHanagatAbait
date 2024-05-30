import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from "primereact/checkbox";
import { useCreateDiscussionMutation } from '../app/discussionApiSlice';
import { Dropdown } from 'primereact/dropdown';
import { useNavigate } from "react-router-dom";
import DecodeToken from '../DecodeToken'

export default function AddDiscussion(props) {
    const [visible, setVisible] = useState(true);
   
    const [CreateDiscussion, { isError, isSuccess, error }] = useCreateDiscussionMutation()
    const onclickadd = () => {
        setVisible(false)
        const discussionName = document.getElementById("discussionName").value
        const message = document.getElementById("message").value
        const {_id}=DecodeToken()
        const obj = {discussionName ,discussion:{userId:_id,message: message},userId:_id}
        CreateDiscussion(obj)

        props.refetch()
    }
   

  

    return (
        
        <div className="card flex justify-content-center">
            
        <Button label='הוסף דיון'  onClick={() =>setVisible(true)} />

            <Dialog
                visible={visible}

                modal
                onHide={() => {
                    setVisible(false)
                }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4"  dir="rtl">
                        <span >הוספת דיון</span>
                        <div className="inline-flex flex-column gap-2" >
                            <label htmlFor="discussionName" className="text-primary-50 font-semibold">
                            נושא הדיון                           </label>
                            <InputText id="discussionName" label="discussionName" className="bg-white-alpha-20 border-none p-3 text-primary-50" ></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2" >
                            <label htmlFor="message" className="text-primary-50 font-semibold" >
                            ההודעה שלך
                            </label>
                            <InputText id="message" label="message" className="bg-white-alpha-20 border-none p-3 text-primary-50" ></InputText>
                        </div>
                        <div className="flex align-items-center gap-2" >
                            <Button label="הוסף" onClick={(e) => onclickadd()} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="ביטול" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" ></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    )
}
