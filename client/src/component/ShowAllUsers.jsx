
// // import { DataTable } from 'primereact/datatable';
// // import { Column } from 'primereact/column';
        


// import React, { useState, useEffect } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// // import { ProductService } from './service/ProductService';
// import { Button } from 'primereact/button';
// import UpdateUser from './UpdateUser';
// import {useGetUsersQuery,useDeleteUserMutation} from '../app/userApiSlice'

// export default function ShowAllUsers() {
//     const [users, setUsers] = useState([]);
//     const [toDelete,setToDelete]=useState(false);
//     const [currentUser,setcurrentUser]=useState("");
//     const { refetch,data, isError, isSuccess } =useGetUsersQuery()
//     const[deleteUser,{data:data1,isError:isError1,isSuccess:isSuccess1}]=useDeleteUserMutation()

//     useEffect(() => {
//         setUsers(data); 
//         console.log(data);
//     }, [data]);
   
    

//     const update=(user)=>{
//         return <button onClick={()=>onUpdate(user)}>עדכון</button>
//     }
//     const onUpdate=(user)=>{
//         setToDelete(true)
//         setcurrentUser(user)
//     }
//     const deleteUser1=(user)=>{
//         return <button onClick={()=>onDelete1(user)}>מחיקה</button>
//     }
//     const onDelete1=(item)=>{
//         const id=item._id
//         deleteUser(id); 
//     }

//     return (
//         <div className="card">
            
//             {toDelete&& <UpdateUser user={currentUser} refetch={refetch}/>}
//             <DataTable value={users} tableStyle={{ minWidth: '50rem' }}>
//                 <Column header="update" body={update}></Column>
//                 <Column header="delete" body={deleteUser1}></Column>
//                 <Column field="phone" header="טלפון"></Column>
//                 <Column field="roles" header="הרשאה"></Column>
//                 <Column field="email" header="אימייל"></Column>
//                 <Column field="name" header="שם"></Column>
//             </DataTable>
//         </div>
//     );
// }
        
// -------------------------
// import React, { useState, useEffect } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import UpdateUser from './UpdateUser';
// import { useGetUsersQuery, useDeleteUserMutation } from '../app/userApiSlice';

// export default function ShowAllUsers() {
//     const { data: users, refetch } = useGetUsersQuery();
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [showUpdateForm, setShowUpdateForm] = useState(false);
//     const [deleteUserMutation] = useDeleteUserMutation();

//     const onUpdate = (user) => {
//         setSelectedUser(user);
//         setShowUpdateForm(true);
//     };

//     const onDelete = async (user) => {
//         try {
//             await deleteUserMutation(user._id);
//             refetch();
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     return (
//         <div className="card">
//             {showUpdateForm && <UpdateUser user={selectedUser} refetch={refetch} onClose={() => setShowUpdateForm(false)} />}
//             <DataTable value={users} tableStyle={{ minWidth: '50rem' }}>
//                 <Column header="עדכון" body={(rowData) => <Button onClick={() => onUpdate(rowData)} icon="pi pi-pencil" />} />
//                 <Column header="מחיקה" body={(rowData) => <Button onClick={() => onDelete(rowData)} icon="pi pi-trash" />} />
//                 <Column field="phone" header="טלפון" />
//                 <Column field="roles" header="הרשאה" />
//                 <Column field="email" header="אימייל" />
//                 <Column field="name" header="שם" />
//             </DataTable>
//         </div>
//     );
// }
//-----------------------------------------------
// import React, { useState } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import UpdateUser from './UpdateUser';
// import { useGetUsersQuery, useDeleteUserMutation } from '../app/userApiSlice';

// export default function ShowAllUsers() {
//     const { data: users, refetch } = useGetUsersQuery();
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [showUpdateForm, setShowUpdateForm] = useState(false);
//     const [deleteUserMutation] = useDeleteUserMutation();

//     const onUpdate = (user) => {
//         setSelectedUser(user);
//         setShowUpdateForm(true);
//     };

//     const onDelete = async (user) => {
//         try {
//             await deleteUserMutation(user._id);
//             refetch();
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     return (
//         <div className="card">
//             {showUpdateForm && <UpdateUser user={selectedUser} refetch={refetch} onClose={() => setShowUpdateForm(false)} />}
//             <DataTable value={users} tableStyle={{ minWidth: '50rem' }}>
//                 <Column field="phone" header="טלפון" />
//                 <Column field="roles" header="הרשאה" />
//                 <Column field="email" header="אימייל" />
//                 <Column field="name" header="שם" />
//                 <Column header="פעולות" body={(rowData) => (
//                     <>
//                         <Button onClick={() => onUpdate(rowData)} icon="pi pi-pencil" className="p-button-rounded p-button-info" />
//                         <Button onClick={() => onDelete(rowData)} icon="pi pi-trash" className="p-button-rounded p-button-danger p-ml-2" />
//                     </>
//                 )} />
//             </DataTable>
//         </div>
//     );
// }

// import React, { useState } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import UpdateUser from './UpdateUser';
// import { useGetUsersQuery, useDeleteUserMutation } from '../app/userApiSlice';

// export default function ShowAllUsers() {
//     const { data: users, refetch } = useGetUsersQuery();
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [showUpdateForm, setShowUpdateForm] = useState(false);
//     const [deleteUserMutation] = useDeleteUserMutation();

//     const onUpdate = (user) => {
//         setSelectedUser(user);
//         setShowUpdateForm(true);
//     };

//     const onDelete = async (user) => {
//         try {
//             await deleteUserMutation(user._id);
//             refetch();
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     return (
//         <div className="card">
//             {showUpdateForm && <UpdateUser user={selectedUser} refetch={refetch} onClose={() => setShowUpdateForm(false)} />}
//             <DataTable value={users} tableStyle={{ minWidth: '50rem' }}>
//                 <Column field="phone" header="טלפון" />
//                 <Column field="roles" header="הרשאה" />
//                 <Column field="email" header="אימייל" />
//                 <Column field="name" header="שם" />
//                 <Column header="פעולות" body={(rowData) => (
//                     <div className="p-grid p-align-center p-justify-center">
//                         <Button onClick={() => onUpdate(rowData)} icon="pi pi-pencil" className="p-button-rounded p-button-info p-mr-2" />
//                         <Button onClick={() => onDelete(rowData)} icon="pi pi-trash" className="p-button-rounded p-button-danger" />
//                     </div>
//                 )} />
//             </DataTable>
//         </div>
//     );
// }

// import React, { useState } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import UpdateUser from './UpdateUser';
// import { useGetUsersQuery, useDeleteUserMutation } from '../app/userApiSlice';

// export default function ShowAllUsers() {
//     const { data: users, refetch } = useGetUsersQuery();
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [showUpdateForm, setShowUpdateForm] = useState(false);
//     const [deleteUserMutation] = useDeleteUserMutation();

//     const onUpdate = (user) => {
//         setSelectedUser(user);
//         setShowUpdateForm(true);
//     };

//     const onDelete = async (user) => {
//         try {
//             await deleteUserMutation(user._id);
//             refetch();
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     const handleUpdateClose = () => {
//         console.log("aaa");
//         setShowUpdateForm(false);
//         setSelectedUser(null);
//         refetch();
//     };

//     return (
//         <div className="card">
//             {showUpdateForm && <UpdateUser user={selectedUser} onClose={handleUpdateClose} />}
//             <DataTable value={users} tableStyle={{ minWidth: '50rem' }}>
//                 <Column field="phone" header="טלפון" />
//                 <Column field="roles" header="הרשאה" />
//                 <Column field="email" header="אימייל" />
//                 <Column field="name" header="שם" />
//                 <Column header="פעולות" body={(rowData) => (
//                     <div className="p-grid p-align-center p-justify-center">
//                         <Button onClick={() => onUpdate(rowData)} icon="pi pi-pencil" className="p-button-rounded p-button-info p-mr-2" />
//                         <Button onClick={() => onDelete(rowData)} icon="pi pi-trash" className="p-button-rounded p-button-danger" />
//                     </div>
//                 )} />
//             </DataTable>
//         </div>
//     );
// }
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

