
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useUpdateAudioMutation } from '../app/audioApiSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";

export default function EditAudio() {
    const location = useLocation();
    const { audio } = location.state; // קבלת הנתונים מ-location state
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [moveList, setMoveList] = useState(false);
    const navigate = useNavigate();
    const toast = useRef(null);
    const [updateAudio, { isError, isSuccess, error }] = useUpdateAudioMutation();
    const [valueName, setValueName] = useState(audio.name); // הגדרת השם המקורי של הווידאו

    const [selectedRole, setSelectedRole] = useState(audio.role); // הגדרת התפקיד המקורי של הווידאו
    const roles = [
        { name: 'רענון', code: 'refresh' },
        { name: 'זינוק', code: 'leap' },
        { name: 'וארשתיך', code: 'engaged' }
    ];

    const { control, handleSubmit, reset, setValue } = useForm({
        defaultValues: {
            name: audio.name || '',
            role: audio.role || '',
            path: audio.path || ''
        }
    });

    useEffect(() => {
        if (moveList) {
            navigate("/audioList");
        }
    }, [moveList, navigate]);

    useEffect(() => {
        setValue('name', audio.name);
        setValue('role', audio.role);
        setValue('path', audio.path);
    }, [audio, setValue]);

    const customUpload = async () => {
        const formData = new FormData();
        formData.append('name', valueName); // הוספת השם המתוקן
        formData.append('role', selectedRole ? selectedRole.code : audio.role);
        formData.append('id', audio._id); // הוספת מזהה הסרטה לעדכון

        try {
            const response = await updateAudio(formData).unwrap();
            reset();
            setSelectedFile(null); // Clear the selected file after upload
            setMoveList(true);
        } catch (uploadError) {
            console.error('Upload error:', uploadError);
        }
    };

    return (
        <div className="p-fluid p-grid p-formgrid">
            <div className="card flex justify-content-center">
                <InputText value={valueName} onChange={(e) => setValueName(e.target.value)} placeholder='שם הסרטה' />
                <Dropdown value={selectedRole} onChange={(e) => setSelectedRole(e.value)} options={roles} optionLabel="name"
                    placeholder="בחר הרשאה" className="w-full md:w-14rem" />
            </div>
            <Button onClick={customUpload}>שמור</Button>
        </div>
    );
}
