import apiSlice from "./apiSlice"

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => ({
                url: '/api/user'
            }),
            providesTags:["users"]
        }),
        createUser: build.mutation({
            query: (user) => ({
                url: '/api/auth/register',
                method:"POST",
                body:user
            }),
            invalidatesTags:["users"]
        }),
        loginUser: build.mutation({
            query: (user) => ({
                url: '/api/auth/login',
                method:"POST",
                body:user
            })
        }),  
        deleteUser: build.mutation({
            query: (id) => ({
                url: `/api/user/${id}`,
                method:"DELETE"
                
            }),
            invalidatesTags:["users"]
        }),
        updateUser: build.mutation({
            query: (obj) => ({
                url: `/api/user/${obj.id}`,
                method:"PUT",
                body:obj.user
            }),
            invalidatesTags:["users"]
        }),
    

    }),
})

export const { useGetUsersQuery,useCreateUserMutation,useLoginUserMutation,useDeleteUserMutation ,useUpdateUserMutation} = userApiSlice