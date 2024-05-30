import apiSlice from "./apiSlice"

const dialogApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getDialogs: build.query({
            query: (role) => ({
                url: '/api/dialogue/role/'+role
            }),
            providesTags:["dialogues"]
           
        }),
        getDialogsByUserId: build.query({
            query: (id) => ({
                url: '/api/dialogue/id/'+id
            }),
            invalidatesTags:["dialogues"]
           
        }),
        getDialogsById: build.query({
            query: (id) => ({
                url: '/api/dialogue/'+id
            }),
            invalidatesTags:["dialogues"]
           
        }),
        createDialogs: build.mutation({
            query: (dialog) => ({
                url: '/api/dialogue',
                method:"POST",
                body:dialog
            }),
           invalidatesTags:["dialogues"]
        }),
        updateDialog: build.mutation({
            query: (obj) => ({
                url: '/api/dialogue/'+obj.id,
                method:"PUT",
                body:obj.message
            }),
            invalidatesTags:["dialogues"]
        }),
        updateDialogueRead: build.mutation({
            query: (obj) => ({
                url: '/api/dialogue/read/'+obj.id,
                method:"PUT",
                body:obj
            }),
            invalidatesTags:["dialogues"]
        }),
       
    })

})
export const {  useGetDialogsQuery,useCreateDialogsMutation,useUpdateDialogMutation,useUpdateDialogueReadMutation,useGetDialogsByUserIdQuery,useGetDialogsByIdQuery} = dialogApiSlice
