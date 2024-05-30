
import { useGetVideoByRoleMutation} from '../app/videoApiSlice';
import React, { useEffect, useState } from "react";
import UploadVideo from './UploadVideo'

const ShowVideo = (props) => {
    // קבלת ה-ROLE מ-localStorage
    console.log("video1");
    const role = localStorage.getItem("role");

    // קריאה לפונקציה getVideo עם role
    const [getVideo,{ data, isError, isSuccess, error }] = useGetVideoByRoleMutation();
    
    // מניעת תפריט קליק ימני על הקובץ
    const preventContextMenu = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        console.log(data);
        getVideo(role)
    }, [data,role]);
    const upload=()=>{
        console.log(props);
        console.log(data);
{/* <UploadVideo props={props}/> */}
    }

    return (
        <div>
            {console.log("video")}
            {isSuccess && console.log("Video fetched successfully")}
            {isError && console.log("Error fetching video")}
            <video
                controls 
                controlsList="nodownload" 
                onContextMenu={preventContextMenu}
            >
                <source src={`http://localhost:1260/upload/${data?.fileName}`} type="video/*" />
                Your browser does not support the video element.
            </video>
            {/* <button onClick={()=>{upload()}}></button> */}
        </div>
    );
};

export default ShowVideo;
