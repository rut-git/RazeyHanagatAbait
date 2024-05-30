
import React, { useEffect, useState } from 'react';
import './Article.css';
import { useGetAllVideosQuery, useDeleteVideoMutation, useGetVideoByRoleQuery } from '../app/videoApiSlice';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import DecodeToken from '../DecodeToken'
import axios from "axios";

export default function VideoList() {
    // const { data: videos, isLoading, isError, isSuccess, error, refetch } = useGetAllVideosQuery();
    const { data: videos, isLoading, isError, isSuccess, error, refetch } = useGetVideoByRoleQuery(roles);
    // console.log(roles);
    useEffect(() => {
        if (isSuccess) {

            console.log(videos);
        }
    }, [isSuccess])
    const [deleteVideo, { isError: isDeleteError, isSuccess: isDeleteSuccess, error: deleteError }] = useDeleteVideoMutation();

    const navigate = useNavigate();
    const [userRole, setUserRole] = useState('');

    const [ready, setReady] = useState(false)

    let roles = null;
    const Request = async () => {

        const ans = await axios("http://localhost:1260/api/functionToken/" + localStorage.getItem("token"))

        if (ans.data.ans == false) {

            navigate("/login")
        }
    }
    useEffect(() => {

        Request();

        setReady(true)
    }, [])
    useEffect(() => {

        roles = DecodeToken()
    }, [ready])
    const handleAddVideoClick = () => {
        navigate('../addVideo');
    };

    const handleEditVideoClick = (video) => {
        navigate('/editVideo', { state: { video } });
    };

    const handleDeleteVideoClick = async (videoId) => {
        try {
            await deleteVideo(videoId).unwrap();
            alert('Video deleted successfully');
            refetch();
        } catch (error) {
            console.error('Failed to delete the video: ', error);
            alert('Failed to delete the video');
        }
    };

    const fileName = (element) => {
        let fileName = element.path.split('\\');
        return fileName[fileName.length - 1];
    };

    return (
        <div>
             <br />
                {roles === 'admin' || roles === 'secretary' ? (
                    <Button onClick={handleAddVideoClick}>Add Video</Button>
                ) : null}
                {isError && console.log(error)}
                {isSuccess && console.log(videos)}
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {isSuccess &&
                        videos.map((element) => (
                            <div key={element._id} style={{ position: 'relative', flex: '33%', margin: '10px' }}>
                                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                    <h3>{element.name}</h3> {/* הצגת שם הסרטה */}
                                </div>
                                <video
                                    width="500"
                                    height="240"
                                    controls
                                    onContextMenu={(e) => e.preventDefault()} // Prevent right-click menu
                                    controlsList='nodownload'
                                >
                                    <source src={`http://localhost:1260/upload/${element.path}`} type="video/mp4" />
                                </video>
                                {(roles === 'admin' || roles === 'secretary') && (
                                    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                        <Button
                                            icon="pi pi-pencil"
                                            className="p-button-rounded p-button-warning"
                                            onClick={() => handleEditVideoClick(element)}
                                            style={{ marginRight: '5px' }}
                                        />
                                        <Button
                                            icon="pi pi-trash"
                                            className="p-button-rounded p-button-danger"
                                            onClick={() => handleDeleteVideoClick(element._id)}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            
        </div>
    );
}
