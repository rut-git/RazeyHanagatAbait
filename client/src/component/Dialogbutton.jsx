// import { Button } from 'primereact/button';
// import { useState } from 'react';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { useNavigate } from 'react-router-dom';
// import { useUpdateDialogueReadMutation } from '../app/dialogApiSlice';
// import { RefetchProvider } from '../context/refetchContext'; // יש לעדכן את הנתיב לנתיב הנכון

// const Dialogbutton = (props) => {
//     const navigate = useNavigate();
//     const [update, { data, isError, isSuccess }] = useUpdateDialogueReadMutation();
//     const [show, setShow] = useState(false);
//     const [read, setRead] = useState(props.dialogue.read);
//     const date = props?.dialogue?.updatedAt?.slice(0, 10);
//     const c = read ? 'unset' : 'large';

//     const onClickButton = () => {
//         setShow(!show);
//         const obj = { id: props.dialogue._id, read: "true" };
//         setRead(true);
//         update(obj);
//     }

//     const nav = () => {
//         navigate("/ShowDialogue", {
//             state: {
//                 dialogue: props.dialogue
//             }
//         });
//     }

//     return (
//         <RefetchProvider value={props.refetch}>
//             <>
//                 <div style={{ borderColor: 'white' }}>
//                     <InputTextarea
//                         autoResize
//                         value={`created by: ${props?.dialogue?.userId?.name}, ${props.dialogue?.userId?.roles}\t\t\t\t\tupdated at:${date}\t\t\t\t\t\t\t${props.dialogue.dialogueName}`}
//                         style={{ width: '80%' }}
//                         onClick={() => onClickButton()}
//                     />
//                 </div>
//                 <br /><br />
//                 {show && nav()}
//             </>
//         </RefetchProvider>
//     );
// }

// export default Dialogbutton;
// import { Button } from 'primereact/button';
// import { useState, useEffect } from 'react';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { useNavigate } from 'react-router-dom';
// import { useUpdateDialogueReadMutation } from '../app/dialogApiSlice';
// import { RefetchProvider } from '../context/refetchContext'; // יש לעדכן את הנתיב לנתיב הנכון

// const Dialogbutton = (props) => {
//     const navigate = useNavigate();
//     const [update, { data, isError, isSuccess }] = useUpdateDialogueReadMutation();
//     const [show, setShow] = useState(false);
//     const [read, setRead] = useState(props.dialogue.read);
//     const date = props?.dialogue?.updatedAt?.slice(0, 10);
//     const c = read ? 'unset' : 'large';

//     const onClickButton = async () => {
//         setShow(!show);
//         const obj = { id: props.dialogue._id, read: "true" };
//         setRead(true);
//         await update(obj);
//     };

//     useEffect(() => {
//         if (show) {
//             navigate("/ShowDialogue", {
//                 state: {
//                     dialogue: props.dialogue
//                 }
//             });
//         }
//     }, [show, navigate, props.dialogue]);

//     return (
//         <RefetchProvider value={props.refetch}>
//             <>
//                 <div style={{ borderColor: 'white' }}>
//                     <InputTextarea
//                         autoResize
//                         value={`created by: ${props?.dialogue?.userId?.name}, ${props.dialogue?.userId?.roles}\t\t\t\t\tupdated at:${date}\t\t\t\t\t\t\t${props.dialogue.dialogueName}`}
//                         style={{ width: '80%' }}
//                         onClick={onClickButton}
//                     />
//                 </div>
//                 <br /><br />
//             </>
//         </RefetchProvider>
//     );
// };

// export default Dialogbutton;
// import { Button } from 'primereact/button';
// import { useState, useEffect } from 'react';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { useNavigate } from 'react-router-dom';
// import { useUpdateDialogueReadMutation } from '../app/dialogApiSlice';
// import { RefetchProvider } from '../context/RefetchContextD'; // יש לעדכן את הנתיב לנתיב הנכון

// const Dialogbutton = (props) => {
//     const navigate = useNavigate();
//     const [update, { data, isError, isSuccess }] = useUpdateDialogueReadMutation();
//     const [show, setShow] = useState(false);
//     const [read, setRead] = useState(props.dialogue.read);
//     const date = props?.dialogue?.updatedAt?.slice(0, 10);

//     const onClickButton = async () => {
//         setShow(!show);
//         const obj = { id: props.dialogue._id, read: "true" };
//         setRead(true);
//         await update(obj);
//     };

//     useEffect(() => {
//         if (show) {
//             navigate("/ShowDialogue", {
//                 state: {
//                     dialogue: props.dialogue,
//                     refetch: props.refetch
//                 }
//             });
//         }
//     }, [show, navigate, props.dialogue, props.refetch]);

//     return (
//         <RefetchProvider value={props.refetch}>
//             <>
//                 <div style={{ borderColor: 'white' }}>
//                     <InputTextarea
//                         autoResize
//                         value={`created by: ${props?.dialogue?.userId?.name}, ${props.dialogue?.userId?.roles}\t\t\t\t\tupdated at:${date}\t\t\t\t\t\t\t${props.dialogue.dialogueName}`}
//                         style={{ width: '80%' }}
//                         onClick={onClickButton}
//                     />
//                 </div>
//                 <br /><br />
//             </>
//         </RefetchProvider>
//     );
// };

// export default Dialogbutton;
// src/components/Dialogbutton.js
// import { Button } from 'primereact/button';
// import { useState, useEffect } from 'react';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { useNavigate } from 'react-router-dom';
// import { useUpdateDialogueReadMutation } from '../app/dialogApiSlice';
// import { RefetchProvider } from '../context/RefetchContextD'; // יש לעדכן את הנתיב לנתיב הנכון

// const Dialogbutton = (props) => {
//     const navigate = useNavigate();
//     const [update, { data, isError, isSuccess }] = useUpdateDialogueReadMutation();
//     const [show, setShow] = useState(false);
//     const [read, setRead] = useState(props.dialogue.read);
//     const date = props?.dialogue?.updatedAt?.slice(0, 10);

//     const onClickButton = async () => {
//         setShow(!show);
//         const obj = { id: props.dialogue._id, read: "true" };
//         setRead(true);
//         await update(obj);
//     };

//     useEffect(() => {
//         if (show) {
//             navigate("/ShowDialogue", {
//                 state: {
//                     dialogue: props.dialogue,
//                     refetch: props.refetch
//                 }
//             });
//         }
//     }, [show, navigate, props.dialogue, props.refetch]);

//     return (
//         <RefetchProvider value={props.refetch}>
//             <>
//                 <div style={{ borderColor: 'white' }}>
//                     <InputTextarea
//                         autoResize
//                         value={`created by: ${props?.dialogue?.userId?.name}, ${props.dialogue?.userId?.roles}\t\t\t\t\tupdated at:${date}\t\t\t\t\t\t\t${props.dialogue.dialogueName}`}
//                         style={{ width: '80%' }}
//                         onClick={onClickButton}
//                     />
//                 </div>
//                 <br /><br />
//             </>
//         </RefetchProvider>
//     );
// };

// export default Dialogbutton;
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { useNavigate } from 'react-router-dom';
import { useUpdateDialogueReadMutation } from '../app/dialogApiSlice';
import { RefetchProvider } from '../context/RefetchContextD';

const Dialogbutton = (props) => {
    const navigate = useNavigate();
    // const [update, { data, isError, isSuccess }] = useUpdateDialogueReadMutation();
    const [show, setShow] = useState(false);
    const [read, setRead] = useState(props.dialogue.read);
    const date = props?.dialogue?.updatedAt?.slice(0, 10);

    const onClickButton = async () => {
        setShow(!show);
        const obj = { id: props.dialogue._id, read: "true" };
        setRead(true);
        // update(obj);
    };

    useEffect(() => {
        if (show) {
            navigate("/ShowDialogue", {
                state: {
                    dialogue: props.dialogue
                }
            });
        }
    }, [show, navigate, props.dialogue]);

    return (
        <RefetchProvider value={props.refetch}>
            <div style={{ borderColor: 'white' }}>
                <InputTextarea
                    autoResize
                    value={`created by: ${props?.dialogue?.userId?.name}, ${props.dialogue?.userId?.roles}\t\t\t\t\tupdated at:${date}\t\t\t\t\t\t\t${props.dialogue.dialogueName}`}
                    style={{ width: '80%' }}
                    onClick={onClickButton}
                />
            </div>
            <br /><br />
        </RefetchProvider>
    );
};

export default Dialogbutton;
