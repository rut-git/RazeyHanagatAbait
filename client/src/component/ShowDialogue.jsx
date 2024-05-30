

import { useEffect, useState } from 'react';
import { useGetDialogsByIdQuery, useUpdateDialogMutation } from '../app/dialogApiSlice';
import DecodeToken from '../DecodeToken';
import { Card } from 'primereact/card';
import { InputTextarea } from 'primereact/inputtextarea';
import { useLocation, useNavigate } from 'react-router-dom';

const ShowDialogue = () => {
    const location = useLocation();
    const { dialogue, name } = location.state || {};
    const [dialogueData, setDialogueData] = useState(dialogue?.dialogue);
    const navigate = useNavigate();
    const [updateDialogue, { isSuccess, data }] = useUpdateDialogMutation();
    const { isError, data: data1, isSuccess: isSuccess1, refetch } = useGetDialogsByIdQuery(dialogue._id);
    const { _id } = DecodeToken();
    const [buttonValue, setButtonValue] = useState('');

    const sendMessage = () => {
        const id = dialogue._id;
        const obj = { id, message: { message: buttonValue, userId: _id } };
        updateDialogue(obj);
        refetch(id);
        setButtonValue("");
    };

    useEffect(() => {
        if (isSuccess1) {
            setDialogueData(data1[0]?.dialogue);
        }
    }, [data1, isSuccess1]);



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
            {dialogueData?.map((element, index) => (
                <Card
                    key={index}
                    title={element.name}
                    style={{
                        textAlign: determineDirection(element.message) === 'rtl' ? 'right' : 'left',
                        backgroundColor: element.userId === _id ? 'white' : 'pink',
                        color: 'black',
                        marginLeft: element.userId === _id ? '40%' : '0',
                        marginRight: element.userId !== _id ? '40%' : '0',
                        marginTop: "10px",
                        borderRadius: '10px',
                        wordWrap: 'break-word',
                        whiteSpace: 'pre-wrap',
                        direction: determineDirection(element.message),
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

export default ShowDialogue;

