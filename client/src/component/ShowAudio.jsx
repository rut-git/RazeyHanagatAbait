
import { useGetAudioByRoleQuery } from '../app/audioApiSlice';
import React, { useEffect, useState } from "react";

const ShowAudio = (props) => {
    // קבלת ה-ROLE מ-localStorage
    const role = localStorage.getItem("role");

    // קריאה לפונקציה getVideo עם role
    const { data, isError, isSuccess, error } = useGetAudioByRoleQuery();
    
    // מניעת תפריט קליק ימני על הקובץ
    const preventContextMenu = (event) => {
        event.preventDefault();
    };



    return (
        <div>
            {isSuccess && console.log("Audio fetched successfully")}
            {isError && console.log("Error fetching audio")}
            <audio
                controls 
                controlsList="nodownload" 
                onContextMenu={preventContextMenu}
            >
                <source src={`http://localhost:1260/uploadAudio/${data?.fileName}`} type="audio/*" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default ShowAudio;
