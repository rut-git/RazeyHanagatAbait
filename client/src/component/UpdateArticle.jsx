import './EditArticle.css'
import React, { useRef, useState, useEffect } from "react";
import { useFormik } from 'formik';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { useUpdateArticleMutation } from '../app/articleApiSlice'
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';

export default function UpdateArticle() {
    const location = useLocation();

    const { article } = location.state


    const navigate = useNavigate()
    const toast = useRef(null);
    const [value, setValue] = useState(article.name);
    const [role, setRole] = useState(article.role);
    const [selectedRole, setSelectedRole] = useState(article.role);
    const roles = [
        { name: 'מנהל', code: 'admin' },
        { name: 'מזכירה', code: 'secretary' },
        { name: 'רענון', code: 'refresh' },
        { name: 'זינוק', code: 'leap' },
        { name: 'וארשתיך', code: 'engaged' }
    ];


    const [UpdateArticle, { isError, isSuccess, error, isLoading, data }] = useUpdateArticleMutation()


    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Blog Submitted', detail: 'The blog is updated' });
    };
    const saveArticle = () => {
        const id = article._id
        const roles = selectedRole.code || selectedRole
        const obj = { id:id, article: { name: value, article: formik.values.blog, role:roles} }
        UpdateArticle(obj)


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
            blog: article.article
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
                {/* <InputText value={role} onChange={(e) => setRole(e.target.value)} placeholder='הרשאה' /> */}
                <div className="card flex justify-content-center" >
                    <Dropdown value={selectedRole} onChange={(e) => setSelectedRole(e.value)} options={roles} optionLabel="name"
                        placeholder={selectedRole} className="w-full md:w-14rem" />
                </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <Toast ref={toast} />
                <Editor
                    id="blog"
                    name="blog"
                    value={formik.values.blog}
                    headerTemplate={header}
                    onTextChange={(e) => {
                        formik.setFieldValue('blog', e.textValue);
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