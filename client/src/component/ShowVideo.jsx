
import { useGetVideoByRoleMutation} from '../app/videoApiSlice';
import React, { useEffect, useState } from "react";
import UploadVideo from './UploadVideo'

const ShowVideo = (props) => {
    
    const role = localStorage.getItem("role");

  
    const [getVideo,{ data, isError, isSuccess, error }] = useGetVideoByRoleMutation();
    
    const preventContextMenu = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        getVideo(role)
    }, [data,role]);
    
    return (
        <div>
            
            <video
                controls 
                controlsList="nodownload" 
                onContextMenu={preventContextMenu}
            >
                <source src={`http://localhost:1260/upload/${data?.fileName}`} type="video/*" />
                Your browser does not support the video element.
            </video>
        </div>
    );
};

export default ShowVideo;
