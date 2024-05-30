
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import UpdateUser from './UpdateUser';
import { useGetUsersQuery, useDeleteUserMutation } from '../app/userApiSlice';

export default function ShowAllUsers() {
    const { data: users, refetch } = useGetUsersQuery();
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [deleteUserMutation] = useDeleteUserMutation();

    const onUpdate = (user) => {
        setSelectedUser(user);
        setShowUpdateForm(true);
    };

    const onDelete = async (user) => {
        try {
            await deleteUserMutation(user._id);
            refetch();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="card">
            {showUpdateForm && (
                <UpdateUser 
                    user={selectedUser} 
                    refetch={refetch} 
                    onClose={() => setShowUpdateForm(false)} 
                />
            )}
            <DataTable value={users} tableStyle={{ minWidth: '50rem' }}>
                <Column field="phone" header="טלפון" />
                <Column field="roles" header="הרשאה" />
                <Column field="email" header="אימייל" />
                <Column field="name" header="שם" />
                <Column header="פעולות" body={(rowData) => (
                    <div className="p-grid p-align-center p-justify-center">
                        <Button onClick={() => onUpdate(rowData)} icon="pi pi-pencil" className="p-button-rounded p-button-info p-mr-2" />
                        <Button onClick={() => onDelete(rowData)} icon="pi pi-trash" className="p-button-rounded p-button-danger" />
                    </div>
                )} />
            </DataTable>
        </div>
    );
}

