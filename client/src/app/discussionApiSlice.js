import apiSlice from "./apiSlice"

const discussionApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getDiscussions: build.query({
            query: () => ({
                url: '/api/discussions'
            }),
            providesTags:["discussions"]
           
        }),
        createDiscussion: build.mutation({
            query: (disc) => ({
                url: '/api/discussions',
                method:"POST",
                body:disc
            }),
           invalidatesTags:["discussions"]
        }),
        updateDiscussion: build.mutation({
            query: (obj) => ({
                url: '/api/discussions/'+obj.id,
                method:"PUT",
                body:obj.message
            }),
            invalidatesTags:["discussions"]
        }),
        updateDiscussionRead: build.mutation({
            query: (obj) => ({
                url: '/api/discussions/read/'+obj.id,
                method:"PUT",
                body:obj
            }),
            invalidatesTags:["discussions"]
        }),
    })

})
export const { useGetDiscussionsQuery,useCreateDiscussionMutation,useUpdateDiscussionMutation ,useUpdateDiscussionReadMutation} = discussionApiSlice
