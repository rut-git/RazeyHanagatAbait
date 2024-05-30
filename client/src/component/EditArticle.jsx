import './EditArticle.css'
import React, { useRef, useState, useEffect } from "react";
import { useFormik } from 'formik';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { useCreateArticleMutation } from '../app/articleApiSlice'
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';

export default function FormikDoc() {
    const navigate = useNavigate()
    const toast = useRef(null);
    const [value, setValue] = useState('');
    // const [role, setRole] = useState('');
    const [selectedRole, setSelectedRole] = useState("refresh");
    const roles = [
        { name: 'מנהל', code: 'admin' },
        { name: 'מזכירה', code: 'secretary' },
        { name: 'רענון', code: 'refresh' },
        { name: 'זינוק', code: 'leap' },
        { name: 'וארשתיך', code: 'engaged' }
    ];


    const [CreateArticle, { isError, isSuccess, error, isLoading, data }] = useCreateArticleMutation()


    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Blog Submitted', detail: 'The blog is uploaded' });
    };
    const saveArticle = () => {
        CreateArticle({ name: value, article: formik.values.blog, role:selectedRole.code })


    }
   

    useEffect(() => {
        if (isSuccess) {

            navigate("/articleListAdmin")
        }

    }, [isSuccess])




    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
            </span>
        );
    };

    const header = renderHeader();

    const formik = useFormik({
        initialValues: {
            blog: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.blog || data.blog === `n`) {

                errors.blog = 'Content is required.';
            }

            return errors;
        },
        onSubmit: (data) => {
            data.blog && show();
            formik.resetForm();
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div className="card">
            <div className="card flex justify-content-center">
                <InputText value={value} onChange={(e) => setValue(e.target.value)} placeholder='נושא' />
                <div className="card flex justify-content-center" >
                    <Dropdown value={selectedRole} onChange={(e) => setSelectedRole(e.value)} options={roles} optionLabel="name"
                        placeholder="בחר הרשאה" className="w-full md:w-14rem" />
                </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <Toast ref={toast} />
                {/* <Editor value={text[indexForText].text} onTextChange={(e) => { text[indexForText].text = e.htmlValue; setText(text); }} style={{ height: '120px' }} /> */}

                <Editor
                    id="blog"
                    name="blog"
                    value={formik.values.blog}
                    headerTemplate={header}
                    onTextChange={(e) => {
                        
                        formik.setFieldValue('blog', e.htmlValue);
                    }}
                    style={{ height: '320px' }}
                />
                <div className="flex flex-wrap justify-content-between align-items-center gap-3 mt-3">
                    {getFormErrorMessage('blog')}
                    <Button type="submit" label="Save" onClick={() => saveArticle()} />
                </div>
            </form>
        </div>
    )
}