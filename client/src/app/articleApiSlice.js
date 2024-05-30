import apiSlice from "./apiSlice"

const articleApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getArticles: build.query({
            query: () => ({
                url: '/api/lessonArticle'
            }),
           
        }),
        getArticleByName: build.query({
            query: (name) => ({
                url: '/api/lessonArticle/'+name
            })
        }),
        getArticleByRole: build.query({
            query: () => ({
                url: '/api/lessonArticle/role'
            })
        }),
        createArticle: build.mutation({
            query: (article) => ({
                url: '/api/lessonArticle',
                method:"POST",
                body:article
            }),
           
        }),
        deleteArticle: build.mutation({
            
            query: (id) => ({
                url: '/api/lessonArticle/'+id,
                method:"DELETE",
                
            }),
           
        }),
        updateArticle: build.mutation({
            query: (obj) => ({
                url: '/api/lessonArticle/'+obj.id,
                method:"PUT",
                body:obj.article
            }),
           
        }),
    }),
})

export const { useGetArticlesQuery,useGetArticleByNameQuery,useGetArticleByRoleQuery,useCreateArticleMutation,useDeleteArticleMutation,useUpdateArticleMutation } = articleApiSlice