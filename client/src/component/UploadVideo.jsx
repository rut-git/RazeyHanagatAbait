import {useUpdateVideoMutation} from '../app/videoApiSlice'

const UploadVideo=(props)=>{
    const [updateVideo,{data1, isError1, isSuccess1, error1}]=useUpdateVideoMutation();

return(
    <>
    </>
)
}
export default UploadVideo;