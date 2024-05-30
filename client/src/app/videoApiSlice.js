import apiSlice from "./apiSlice"

const videoApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllVideos: build.query({
            query: () => ({
                url: '/api/lessonVideo'
            }),
            providesTags:["videoes"]
        }),
        getPathById: build.query({
            query: (id) => ({
                url: '/api/lessonVideo/'+id,
            }),
            invalidatesTags:["videoes"]
        }),
        getVideoByRole: build.query({
            query: (role) => ({
                url: `/api/lessonVideo/role/${role}`,
                
            }),
            invalidatesTags:["videoes"]
        }),
        getVideoByName: build.mutation({
            query: (fileName) => ({
                url: '/upload',
                method:"POST",
                body:fileName
            }),
            invalidatesTags:["videoes"]
        }),
        createLessonVideo: build.mutation({
            query: (data) => ({
                url: '/api/lessonVideo',
                method:"POST",
                body:data
            }),
            invalidatesTags:["videoes"]
        }),
        updateVideo: build.mutation({
            query: (obj) => ({
                url: '/api/lessonVideo/',
                method:"PUT",
                body:obj
            }),
            invalidatesTags:["videoes"]
        }),
        deleteVideo: build.mutation({
            query: (id) => ({
                url: `/api/lessonVideo/${id}`,
                method: "DELETE"
            }),
            invalidatesTags:["videoes"]
        }),
        
     }),
})
export const {  useGetAllVideosQuery,useGetPathByIdQuery,useCreateLessonVideoMutation,useGetVideoByRoleQuery,useGetVideoByNameMutation,useUpdateVideoMutation,useDeleteVideoMutation } = videoApiSlice