
import { useGetAudioByRoleQuery } from '../app/audioApiSlice';
import React, { useEffect, useState } from "react";

const ShowAudio = (props) => {
    const role = localStorage.getItem("role");

    const { data, isError, isSuccess, error } = useGetAudioByRoleQuery();
    
    const preventContextMenu = (event) => {
        event.preventDefault();
    };



    return (
        <div>
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
