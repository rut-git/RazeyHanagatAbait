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
        setValue('name', video.name);
        setValue('role', video.role);
        setValue('path', video.path);
    }, [video, setValue]);

    const customUpload = async () => {
        const formData = new FormData();
        formData.append('name', valueName);
        formData.append('role', selectedRole.code ? selectedRole.code : video.role);
        formData.append('id', video._id);

        try {
            const response = await updateVideo(formData).unwrap();
            reset();
            setSelectedFile(null); 
            setMoveList(true);
        } catch (uploadError) {
            console.error('Upload error:', uploadError);
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
