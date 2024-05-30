import React, { useState, useRef, useEffect } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useForm } from 'react-hook-form';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useCreateLessonAudioMutation } from '../app/audioApiSlice';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

export default function AddVideo() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [moveList, setMoveList] = useState(false);
    const navigate = useNavigate();
    const toast = useRef(null);
    const [uploadAudio, { isError, isSuccess, error }] = useCreateLessonAudioMutation();
    const { control, handleSubmit, reset, setValue } = useForm({
        defaultValues: {
            name: '',
            role: '',
            path: ''
        }
    });

    const [name, setName] = useState('');
    const [selectedRole, setSelectedRole] = useState(null);
    const roles = [
        { name: 'רענון', code: 'refresh' },
        { name: 'זינוק', code: 'leap' },
        { name: 'וארשתיך', code: 'engaged' }
    ];

    useEffect(() => {
        if (moveList) {
            navigate("/audioList");
        }
    }, [moveList, navigate]);

    const customUpload = async ({ files }) => {
        const file = files[0];
        setSelectedFile(file);

        const formData = new FormData();
        formData.append('name', name || "Audio-" + Math.round(Math.random() * 100));
        formData.append('role', selectedRole ? selectedRole.code : "refresh");
        formData.append('path', file);

        try {
            const response = await uploadAudio(formData).unwrap();
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Audio uploaded successfully' });
            reset();
            setSelectedFile(null); // Clear the selected file after upload
            setMoveList(true);
        } catch (uploadError) {
            console.error('Upload error:', uploadError);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to upload audio' });
        }
    };

    return (
        <div className="p-fluid p-grid p-formgrid">
            <Toast ref={toast} />
            <div className="p-field p-col-12">
                <InputText 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter name"
                    style={{ width: '100%', marginBottom: '10px' }}
                />
                <Dropdown 
                    value={selectedRole} 
                    onChange={(e) => setSelectedRole(e.value)} 
                    options={roles} 
                    optionLabel="name"
                    placeholder="Select role" 
                    className="w-full md:w-14rem" 
                    style={{ width: '100%', marginBottom: '10px' }}
                />
                <FileUpload 
                    name="path" 
                    customUpload 
                    accept="audio/*"
                    uploadHandler={customUpload}
                    auto
                    mode='basic'
                    multiple={false}
                    onUpload={e => setUploadProgress(100)}
                    onProgress={e => setUploadProgress(Math.round((e.loaded / e.total) * 100))}
                    style={{ width: '100%', marginTop: '10px' }}
                />
            </div>
            {selectedFile && (
                <div className="p-field p-col-12">
                    <audio controls>
                        <source src={URL.createObjectURL(selectedFile)} type="audio/*" />
                        Your browser does not support the audio element.
                    </audio>
                    <div>
                        {!moveList && <ProgressSpinner />}
                    </div>
                </div>
            )}
        </div>
    );
}

