
import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useUpdateUserMutation } from '../app/userApiSlice';

export default function UpdateUser(props) {
    const [visible, setVisible] = useState(true);
    const [selectedRole, setSelectedRole] = useState(props.user.roles);
    const [updateUser, { isError, isSuccess, error }] = useUpdateUserMutation();

    useEffect(() => {
        if (isSuccess) {
            props.onClose();
        }
    }, [isSuccess, props]);

    const handleCancel = () => {
        setVisible(false);
        props.onClose();
    };

    const handleUpdate = async () => {
        const userName = document.getElementById("username").value;
        const name = document.getElementById("name").value;
        const password = document.getElementById("password").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const roles = selectedRole.code || selectedRole;

        const obj = { id: props.user._id, user: { userName, name, password, email, phone, roles } };
        
        try {
            await updateUser(obj);
            props.refetch();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const rolesOptions = [
        { name: 'מנהל', code: 'admin' },
        { name: 'מזכירה', code: 'secretary' },
        { name: 'רענון', code: 'refresh' },
        { name: 'זינוק', code: 'leap' },
        { name: 'וארשתיך', code: 'engaged' }
    ];

    return (
        <Dialog
            visible={visible}
            style={{ direction: 'rtl' }}
            modal
            onHide={handleCancel}
        >
            <div className="flex flex-column px-8 py-5 gap-4">
                <span>עדכון משתמש</span>
                <div className="inline-flex flex-column gap-2">
                    <label htmlFor="username" className="text-primary-50 font-semibold">שם משתמש</label>
                    <InputText id="username" defaultValue={props.user.userName} />
                </div>
                <div className="inline-flex flex-column gap-2">
                    <label htmlFor="name" className="text-primary-50 font-semibold">שם</label>
                    <InputText id="name" defaultValue={props.user.name} />
                </div>
                {/* <div className="inline-flex flex-column gap-2">
                    <label htmlFor="password" className="text-primary-50 font-semibold">סיסמה</label>
                    <InputText id="password" type="password" defaultValue={props.user.password} />
                </div> */}
                <div className="inline-flex flex-column gap-2">
                    <label htmlFor="email" className="text-primary-50 font-semibold">מייל</label>
                    <InputText id="email" type="email" defaultValue={props.user.email} />
                </div>
                <div className="inline-flex flex-column gap-2">
                    <label htmlFor="phone" className="text-primary-50 font-semibold">טלפון</label>
                    <InputText id="phone" defaultValue={props.user.phone} />
                </div>
                <div className="card flex justify-content-center">
                    <Dropdown value={selectedRole} onChange={(e) => setSelectedRole(e.value)} options={rolesOptions} optionLabel="name" placeholder={selectedRole.name || selectedRole} className="w-full md:w-14rem" />
                </div>
                <div className="flex align-items-center gap-2">
                    <Button label="עדכון" onClick={handleUpdate} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" />
                    <Button label="ביטול" onClick={handleCancel} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" />
                </div>
            </div>
        </Dialog>
    );
}
