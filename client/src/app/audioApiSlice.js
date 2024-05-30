import apiSlice from "./apiSlice"

const audioApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllAudios: build.query({
            query: () => ({
                url: '/api/lessonAudio'
            }),
            providesTags:["audioes"]
        }),
        
        getPathById: build.query({
            query: (id) => ({
                url: '/api/lessonAudio/'+id,
            }),
            invalidatesTags:["audioes"]
        }),
        getAudioByRole: build.query({
            query: (role) => ({
                url: `/api/lessonAudio/role/${role}`,
                
            }),
            invalidatesTags:["audioes"]
        }),
        getAudioByName: build.mutation({
            query: (fileName) => ({
                url: '/uploadAudio',
                method:"POST",
                body:fileName
            }),
            invalidatesTags:["audioes"]
        }),
        createLessonAudio: build.mutation({
            query: (data) => ({
                url: '/api/lessonAudio',
                method:"POST",
                body:data
            }),
            invalidatesTags:["audioes"]
        }),
        deleteAudio: build.mutation({
            query: (id) => ({
                url: `/api/lessonAudio/${id}`,
                method: "DELETE"
            }),
            invalidatesTags:["audioes"]
        }),
        updateAudio: build.mutation({
            query: (obj) => ({
                url: '/api/lessonAudio/',
                method:"PUT",
                body:obj
            }),
            invalidatesTags:["audioes"]
        }),
     }),
})
export const {  useGetAllAudiosQuery,useGetPathByIdQuery,useCreateLessonAudioMutation,useGetAudioByRoleQuery,useGetAudioByNameMutation ,useDeleteAudioMutation,useUpdateAudioMutation} = audioApiSlice