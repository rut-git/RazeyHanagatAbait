
// import React, { useState, useRef, useEffect } from 'react';
// import { ProgressSpinner } from 'primereact/progressspinner';
// import { useForm } from 'react-hook-form';
// import { FileUpload } from 'primereact/fileupload';
// import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';
// import { useUpdateVideoMutation } from '../app/videoApiSlice';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Dropdown } from 'primereact/dropdown';
// import { InputText } from "primereact/inputtext";


// export default function EditVideo() {
//     const location = useLocation();
//     const { video } = location.state; // קבלת הנתונים מ-location state
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [moveList, setMoveList] = useState(false);
//     const navigate = useNavigate();
//     const toast = useRef(null);
//     const [updateVideo, { isError, isSuccess, error }] = useUpdateVideoMutation();
//     const [valueName, setValueName] = useState('');

//     const [selectedRole, setSelectedRole] = useState("");
//     const roles = [
//         { name: 'רענון', code: 'refresh' },
//         { name: 'זינוק', code: 'leap' },
//         { name: 'וארשתיך', code: 'engaged' }
//     ];
//     const { control, handleSubmit, reset, setValue } = useForm({
//         defaultValues: {
//             name: video.name || '',
//             role: video.role || '',
//             path: video.path || ''
//         }
//     });

//     useEffect(() => {
//         if (moveList) {
//             navigate("/videoList");
//         }
//     }, [moveList, navigate]);

//     useEffect(() => {
//         // Reset form values to video props when video changes
//         setValue('name', video.name);
//         setValue('role', video.role);
//         setValue('path', video.path);
//     }, [video, setValue]);

//     const customUpload = async () => {
//         console.log("aaaaaaabbbbbbb");
//         // const file = files[0];
//         // console.log(file);
//         // setSelectedFile(file);
//         console.log("video:" + selectedRole);
//         const formData = new FormData();
//         console.log("name",selectedRole);
//         formData.append('name', video.name);
//         formData.append('role', selectedRole?selectedRole.code:video.role);
//         // formData.append('path', file);
//         formData.append('id', video._id); // הוספת מזהה הסרטה לעדכון

//         try {
//             const response = await updateVideo(formData).unwrap();
//             console.log('Upload response:', response);
//             // toast.current.show({ severity: 'success', summary: 'Success', detail: 'Video updated successfully' });
//             reset();
//             setSelectedFile(null); // Clear the selected file after upload
//             setMoveList(true);
//         } catch (uploadError) {
//             console.error('Upload error:', uploadError);
//             console.log(formData);
//             // toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update video' });
//         }
//     };

//     return (
//         <div className="p-fluid p-grid p-formgrid">
//             <div className="card flex justify-content-center" >
//             <InputText value={valueName} onChange={(e) => setValueName(e.target.value)} placeholder='שם הסררטה' />
//                     <Dropdown value={selectedRole} onChange={(e) => setSelectedRole(e.value)} options={roles} optionLabel="name"
//                         placeholder="בחר הרשאה" className="w-full md:w-14rem" />
//                 </div>
//                 <Button onClick={()=>customUpload()}></Button>
           
//         </div>
//     );
// }
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useUpdateVideoMutation } from '../app/videoApiSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";

export default function EditVideo() {
    const location = useLocation();
    const { video } = location.state; // קבלת הנתונים מ-location state
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [moveList, setMoveList] = useState(false);
    const navigate = useNavigate();
    const toast = useRef(null);
    const [updateVideo, { isError, isSuccess, error }] = useUpdateVideoMutation();
    const [valueName, setValueName] = useState(video.name); // הגדרת השם המקורי של הווידאו

    const [selectedRole, setSelectedRole] = useState(video.role); // הגדרת התפקיד המקורי של הווידאו
    const roles = [
        { name: 'רענון', code: 'refresh' },
        { name: 'זינוק', code: 'leap' },
        { name: 'וארשתיך', code: 'engaged' }
    ];

    const { control, handleSubmit, reset, setValue } = useForm({
        defaultValues: {
            name: video.name || '',
            role: video.role || '',
            path: video.path || ''
        }
    });

    useEffect(() => {
        if (moveList) {
            navigate("/videoList");
        }
    }, [moveList, navigate]);

    useEffect(() => {
        // Reset form values to video props when video changes
        setValue('name', video.name);
        setValue('role', video.role);
        setValue('path', video.path);
        console.log("video.role:",video.role);
    }, [video, setValue]);

    const customUpload = async () => {
        console.log("selectedRole:",selectedRole);
        const formData = new FormData();
        formData.append('name', valueName); // הוספת השם המתוקן
        formData.append('role', selectedRole.code ? selectedRole.code : video.role);
        formData.append('id', video._id); // הוספת מזהה הסרטה לעדכון

        try {
            const response = await updateVideo(formData).unwrap();
            console.log('Upload response:', response);
            reset();
            setSelectedFile(null); // Clear the selected file after upload
            setMoveList(true);
        } catch (uploadError) {
            console.error('Upload error:', uploadError);
            console.log(formData);
        }
    };

    return (
        <div className="p-fluid p-grid p-formgrid">
            <div className="card flex justify-content-center">
                <InputText value={valueName} onChange={(e) => setValueName(e.target.value)} placeholder='שם הסרטה' />
                <Dropdown value={selectedRole.code} onChange={(e) => setSelectedRole(e.value)} options={roles} optionLabel="name"
                    placeholder="בחר הרשאה" className="w-full md:w-14rem" />
            </div>
            <Button onClick={customUpload}>שמור</Button>
        </div>
    );
}
