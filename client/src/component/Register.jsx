
// import React, { useState } from "react";
// import { Button } from 'primereact/button';
// import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';
// import { Checkbox } from "primereact/checkbox";
// import { useCreateUserMutation } from '../app/userApiSlice';
// import { Dropdown } from 'primereact/dropdown';
// import { useNavigate } from "react-router-dom";


// export default function HeadlessDemo() {
//     const [visible, setVisible] = useState(true);

//     const [CreateUser, { isError, isSuccess, error }] = useCreateUserMutation()
//     const navigate = useNavigate()
//     const onclickCancal=()=>{
//         setVisible(false)
//         navigate('/users')
//     }
//     const onclickadd = () => {
//         setVisible(false)
//         const userName = document.getElementById("username").value
//         const name = document.getElementById("name").value
//         const password = document.getElementById("password").value
//         const email = document.getElementById("email").value
//         const phone = document.getElementById("phone").value
//         const roles = selectedRole.code
//         CreateUser({ userName: userName, name: name, password: password, email: email, phone: phone, roles: roles })
//         navigate('/users')
//     }


//     const [selectedRole, setSelectedRole] = useState("refresh");
//     const roles = [
//         { name: 'מנהל', code: 'admin' },
//         { name: 'מזכירה', code: 'secretary' },
//         { name: 'רענון', code: 'refresh' },
//         { name: 'זינוק', code: 'leap' },
//         { name: 'וארשתיך', code: 'engaged' }
//     ];

//     return (
//         <div className="card flex justify-content-center" >
//             {/* <Button label="הוסף משתמש" onClick={() => setVisible(true)} style={{ marginTop: "50px", width: '150px', height: '50px', borderRadius: '10px', marginRight: '5%', backgroundColor: 'black', color: '#bd8e17' }} /> */}
//             <Dialog
//                 visible={visible}
//                 style={{ direction: 'rtl',padding: '7px'}}
//                 modal
//                 onHide={() => {
//                     setVisible(false)
//                 }}
//                 content={({ hide }) => (
//                     <div className="flex flex-column px-8 py-5 gap-4" ><br/>
//                         <div style={{textAlign:'center'}}>הוספת משתמש</div><br/>
//                         <div className="inline-flex flex-column gap-2" >
//                             <label htmlFor="username" className="text-primary-50 font-semibold" >
//                                 שם משתמש
//                             </label>
//                             <InputText id="username" label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50" ></InputText>
//                         </div>
//                         <br/>
//                         <div className="inline-flex flex-column gap-2" >
//                             <label htmlFor="name" className="text-primary-50 font-semibold" >
//                                 שם
//                             </label>
//                             <InputText id="name" label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50" ></InputText>
//                         </div>
//                         <br/>

//                         <div className="inline-flex flex-column gap-2" >
//                             <label htmlFor="username" className="text-primary-50 font-semibold" >
//                                 סיסמה
//                             </label>
//                             <InputText id="password" label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="password" />
//                             <div />
//                             <div></div>
//                             <br/>

//                             <label htmlFor="email" className="text-primary-50 font-semibold">
//                                 מייל
//                             </label>
//                             <InputText id="email" label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="email" ></InputText>
//                         </div>
//                         <br/>

//                         <div className="inline-flex flex-column gap-2" >
//                             <label htmlFor="phone" className="text-primary-50 font-semibold">
//                                 טלפון
//                             </label>
//                             <InputText id="phone" label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" ></InputText>
//                         </div>
//                         <br/>

//                         <div className="card flex justify-content-center" >
//                             <Dropdown value={selectedRole} onChange={(e) => setSelectedRole(e.value)} options={roles} optionLabel="name"
//                                 placeholder="בחר הרשאה" className="w-full md:w-14rem" />
//                         </div>
//                         <br/>

//                         <div className="flex align-items-center gap-2" >
//                             <Button label="הוסף" onClick={(e) => onclickadd()} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" ></Button>
//                             <Button label="ביטול" onClick={(e) =>onclickCancal()} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" ></Button>
//                         </div>
//                     </div>
//                 )}
//             ></Dialog>
//         </div>
//     )
// }





import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useRef, useState } from 'react';
import { useCreateUserMutation } from '../app/userApiSlice';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { Password } from 'primereact/password';
import { RadioButton } from "primereact/radiobutton";
import { useFormik } from 'formik';
import { classNames } from 'primereact/utils';
import { AutoComplete } from 'primereact/autocomplete';
const Register = (props) => {
    const [visible, setVisible] = useState(true)

    const [registerFunc, { isError, error, isSuccess, data }] =useCreateUserMutation()
    const [selectedRole, setSelectedRole] = useState("refresh");
    

    const role = [
        { name: 'מנהל', code: 'admin' },
        { name: 'מזכירה', code: 'secretary' },
        { name: 'רענון', code: 'refresh' },
        { name: 'זינוק', code: 'leap' },
        { name: 'וארשתיך', code: 'engaged' }
    ];
    var name = useRef('')
    var password = useRef('')
    var phone = useRef('')
    var username = useRef('')
    var email = useRef('')
    const roles = selectedRole.code
    const register = (e) => {
       
        registerFunc({ name: name.current.value, userName: username.current.value, password: password.current.value, phone: phone.current.value, email: email.current.value, roles: roles})
    };
    const [value, setValue] = useState('');
    const [date, setDate] = useState(null);
    const [ingredient, setIngredient] = useState('');
   
    const [selectedCategory, setSelectedCategory] = useState('');
    const [textn, setTextn] = useState('')
    const [textu, setTextu] = useState('')
    const [textp, setTextp] = useState('')

    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            password: ""

        },
        validate: (data) => {
            let errors = {};
            if (!data.name) {
                errors.name = 'שדה חובה';
              }
            if (!data.username) {
                errors.username = 'שדה חובה';
            } if (!data.password) {
                errors.password = 'שדה חובה';
            }


            return errors;
        },
        onSubmit: async () => {

            await register();
            setVisible(false)

        }
    });
    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };
    const footerContent = (
        <div>
            <Button label="ביטול" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="הוסף" icon="pi pi-check" type='submit' onClick={() => { formik.handleSubmit() }} autoFocus />
        </div>
    );

    return (
        <div className="newUser">


            <Dialog header="Header" visible={visible} style={{ minWidth: '30vw', maxWidth: '50vw', textAlign: 'center' }} onHide={() => setVisible(false)} footer={footerContent}>
                <div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="name" className="font-semibold">
                            name
                        </label>

                        <AutoComplete id="name" style={{ width: '400px' ,}} label="Name" /*className="bg-white-alpha-20 border-#black p-3"*/ inputRef={name} value={formik.values.name} /*placeholder={title.current}*/
                            name='name'
                            className={classNames({ 'p-invalid': isFormFieldInvalid('name') })}
                            onChange={(e) => {
                                console.log(e.value);

                                setTextn(e.value)
                                formik.setFieldValue('name', e.value);
                            }}
                        />
                        {getFormErrorMessage('name')}
                    </div><br /><br /><br />
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="username" className="font-semibold">
                            Username
                        </label>
                        <AutoComplete style={{ width: '400px' }} id="username" label="Username" /*className="bg-white-alpha-20 border-#black p-3"*/ inputRef={username} value={formik.values.username}
                            name='username'
                            className={classNames({ 'p-invalid': isFormFieldInvalid('username') })}
                            onChange={(e) => {
                                setTextu(e.value)
                                formik.setFieldValue('username', e.value);
                            }}
                        />
                        {getFormErrorMessage('username')}
                    </div><br /><br /><br />
                    <div className="inline-flex flex-column gap-2 p-fluid">
                        <label htmlFor="password" className="font-semibold">
                            password
                        </label>
                        <Password style={{ width: '400px', height: '50px' }} value={formik.values.password} toggleMask
                            promptLabel="Choose a password" weakLabel="Too simple" mediumLabel="Average complexity" strongLabel="Complex password"
                            inputRef={password}
                            name="password"
                            className={classNames({ 'p-invalid': isFormFieldInvalid('password') })}
                            onChange={(e) => {
                                setValue(e.target.value)
                                setTextp(e.target.value)
                                formik.setFieldValue('password', e.target.value);
                            }}
                        />
                        {getFormErrorMessage('password')}

                        <br /><br />
                    </div>
                    
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="email" className="font-semibold">
                            email
                        </label>
                        <InputText style={{ width: '400px' }} id="email" label="Email" keyfilter="email" className="bg-white-alpha-20 border-#black p-3" ref={email}>

                        </InputText>
                    </div><br /><br />
                    <label htmlFor="sex" className="font-semibold">
                        roles
                    </label>
                    <div className="card flex justify-content-center" >
                            <Dropdown value={selectedRole} onChange={(e) => setSelectedRole(e.value)} options={role} optionLabel="name"
                                 placeholder="בחר הרשאה" className="w-full md:w-14rem" />
                         </div> 
                    {/* <div className="bg-white-alpha-20 border-#black p-3">

                        <div className="flex align-items-center gap-2">

                            <div className="flex align-items-center gap-2" ref={roles}>

                                <label htmlFor="ingredient2" className="ml-2">זינוק&nbsp;</label>
                                <RadioButton inputId="ingredient2" name="leap" value="זינוק" onChange={(e) => { setIngredient(e.value); roles.current.value = e.value }}
                                    checked={ingredient === 'זינוק'}
                                />
                            </div>
                            <div className="flex align-items-center gap-2" ref={roles}>

                        <label htmlFor="ingredient2" className="ml-2">וארשתיך&nbsp;</label>
                        <RadioButton inputId="ingredient2" name="engaged" value="וארשתיך" onChange={(e) => { setIngredient(e.value); roles.current.value = e.value }}
                            checked={ingredient === 'וארשתיך'} */}
                        {/* />
                        </div>
                            <div className="flex align-items-center gap-2">

                                <label htmlFor="ingredient1" className="ml-2">רענון&nbsp;</label>
                                <RadioButton inputId="ingredient1" name="refresh" value="רענון" onChange={(e) => { setIngredient(e.value); roles.current.value = e.value }}
                                    checked={ingredient === 'רענון'}

                                /> */}
                            {/* </div>
                            <div className="flex align-items-center gap-2" ref={roles}>

                            <label htmlFor="ingredient2" className="ml-2">מנהל&nbsp;</label>
                            <RadioButton inputId="ingredient2" name="admin" value="מנהל" onChange={(e) => { setIngredient(e.value); roles.current.value = e.value }}
                                checked={ingredient === 'מנהל'}
                            />
                            </div>
                            <div className="flex align-items-center gap-2" ref={roles}> */}

                            {/* <label htmlFor="ingredient2" className="ml-2">מזכירה&nbsp;</label>
                            <RadioButton inputId="ingredient2" name="secretary" value="מזכירה" onChange={(e) => { setIngredient(e.value); roles.current.value = e.value }}
                                checked={ingredient === 'מזכירה'}
                            />
                            </div> */}
                        {/* </div> */}
                    {/* </div> */}
                   


                    {/* <div className="flex align-items-center gap-2">
                            <Button label="Sign-In" onClick={(e) => {register();setVisible(false)}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="Cancel" onClick={setVisible(false)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div> */}
                </div>
            </Dialog>
        </div>
    )
}
export default Register

