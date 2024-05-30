import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from "primereact/checkbox";
import { useCreateDialogsMutation } from '../app/dialogApiSlice';
import { Dropdown } from 'primereact/dropdown';
import { useNavigate } from "react-router-dom";
import DecodeToken from '../DecodeToken'

export default function AddDialog(props) {
    const [visible, setVisible] = useState(true);
    const [CreateDialog, { isError, isSuccess, error }] = useCreateDialogsMutation()
    const onclickadd = () => {
        setVisible(false)
        const dialogueName = document.getElementById("dialogueName").value
        const message = document.getElementById("message").value
        const {_id}=DecodeToken()
        const obj = {dialogueName ,dialogue:{userId:_id,message:message},userId:_id,workerStatus:props.role}
        CreateDialog(obj)
        props.refetch()

    }
   
    return (
        
        <div className="card flex justify-content-center">
            
        <Button label=' שליחת הודעה'  onClick={() =>setVisible(true)} />

            <Dialog
                visible={visible}

                modal
                onHide={() => {
                    setVisible(false)
                }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" dir="rtl">
                        <span >שליחת הודעה</span>
                        <div className="inline-flex flex-column gap-2" >
                            <label htmlFor="dialogueName" className="text-primary-50 font-semibold">
                            נושא הודעה                           </label>
                            <InputText id="dialogueName" label="discussionName" className="bg-white-alpha-20 border-none p-3 text-primary-50" ></InputText>
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
