
// import { useEffect, useState } from 'react';
// import { useUpdateDiscussionMutation } from '../app/discussionApiSlice';
// import DecodeToken from '../DecodeToken';
// import { Card } from 'primereact/card';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { useLocation, useNavigate } from 'react-router-dom';

// const ShowDiscussion = () => {
//     const location = useLocation();
//     const { discussion } = location.state || {};
//     const navigate = useNavigate();
//     const [updateDiscussion, { isSuccess, data }] = useUpdateDiscussionMutation();
//     const [buttonValue, setButtonValue] = useState('');

//     const sendMessage = () => {
//         const id = discussion._id;
//         const { _id } = DecodeToken();
//         const obj = { id, message: { message: buttonValue, userId: _id } };
//         updateDiscussion(obj);
//         setButtonValue("");
//     };

//     useEffect(() => {
//         if (isSuccess) {
//             navigate('/discussions', { state: { refe: 'true', discussion: data } });
//         }
//     }, [isSuccess, data, navigate]);

//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter' && !e.shiftKey) {
//             e.preventDefault();
//             setButtonValue(prevValue => prevValue + '\n');
//         }
//     };

//     return (
//         <div style={{ width: '100%', alignItems: 'center' }}>
//             <br /><br /><br />
//             {discussion.discussion.map((element, index) => (
//                 <Card
//                     key={index}
//                     title={element.name}
//                     style={{
//                         textAlign: 'right',
//                         marginTop: "10px",
//                         borderRadius: '10px',
//                         direction: 'rtl',
//                         width: '70%',
//                         backgroundColor: 'white',
//                         color: '#1f2937',
//                         marginLeft: '15%',
//                         wordWrap: 'break-word',
//                         whiteSpace: 'pre-wrap'
//                     }}
//                 >
//                     {element.message}
//                 </Card>
//             ))}
//             <br />
//             <InputTextarea
//                 value={buttonValue}
//                 onChange={(e) => setButtonValue(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 dir='rtl'
//                 placeholder='תגובה'
//                 rows={5}
//                 cols={30}
//                 style={{ whiteSpace: 'pre-wrap' }}
//             />
//             <br />
//             <button onClick={sendMessage} style={{ width: '150px', height: '30px' }}>שלח</button>
//         </div>
//     );
// };

// export default ShowDiscussion;

import { useEffect, useState } from 'react';
import { useUpdateDiscussionMutation } from '../app/discussionApiSlice';
import DecodeToken from '../DecodeToken';
import { Card } from 'primereact/card';
import { InputTextarea } from 'primereact/inputtextarea';
import { useLocation, useNavigate } from 'react-router-dom';

const ShowDiscussion = () => {
    const location = useLocation();
    const { discussion } = location.state || {};
    const navigate = useNavigate();
    const [updateDiscussion, { isSuccess, data }] = useUpdateDiscussionMutation();
    const [buttonValue, setButtonValue] = useState('');

    const sendMessage = () => {
        const id = discussion._id;
        const { _id } = DecodeToken();
        const obj = { id, message: { message: buttonValue, userId: _id } };
        updateDiscussion(obj);
        setButtonValue("");
    };

    useEffect(() => {
        if (isSuccess) {
            navigate('/discussions', { state: { refe: 'true', discussion: data } });
        }
    }, [isSuccess, data, navigate]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            setButtonValue(prevValue => prevValue + '\n');
        }
    };

    const determineDirection = (text) => {
        const rtlChars = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F]/;
        return rtlChars.test(text) ? 'rtl' : 'ltr';
    };

    return (
        <div style={{ width: '100%', alignItems: 'center' }}>
            <br /><br /><br />
            {discussion.discussion.map((element, index) => (
                <Card
                    key={index}
                    title={element.name}
                    style={{
                        textAlign: determineDirection(element.message) === 'rtl' ? 'right' : 'left',
                        marginTop: "10px",
                        borderRadius: '10px',
                        direction: determineDirection(element.message),
                        width: '70%',
                        backgroundColor: 'white',
                        color: '#1f2937',
                        marginLeft: '15%',
                        wordWrap: 'break-word',
                        whiteSpace: 'pre-wrap',
                        unicodeBidi: 'plaintext'
                    }}
                >
                    {element.message}
                </Card>
            ))}
            <br />
            <InputTextarea
                value={buttonValue}
                onChange={(e) => setButtonValue(e.target.value)}
                onKeyDown={handleKeyDown}
                dir='rtl'
                placeholder='תגובה'
                rows={5}
                cols={30}
                style={{ whiteSpace: 'pre-wrap' }}
            />
            <br />
            <button onClick={sendMessage} style={{ width: '150px', height: '30px' }}>שלח</button>
        </div>
    );
};

export default ShowDiscussion;
