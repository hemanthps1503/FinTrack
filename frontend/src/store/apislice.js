import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseurl = "http://localhost:8080";

export const apislice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: baseurl }),
    endpoints: (builder) => ({
        // get categories
        getcategories: builder.query({
            query: () => '/api/categories',
            providesTags:['categories']
        }),
        // get labels
        getlabels: builder.query({
            query: () => '/api/labels',
            providesTags:['transaction']
        }),
        // add transaction
        addtransaction: builder.mutation({
            query: (initialTransaction) => ({
                url: '/api/transaction',
                method: 'POST',
                body: initialTransaction,
            }),
            invalidatesTags:['transaction']
        }),
        // delete transaction
        deletetransaction: builder.mutation({
            query: recordid => ({
                url: '/api/transaction/',
                method: 'DELETE',
                body:recordid
            }),
            invalidatesTags:['transaction']
        }),
    }),
});

export default apislice;

export const {
    useGetcategoriesQuery,
    useGetlabelsQuery,
    useAddtransactionMutation,
    useDeletetransactionMutation,
} = apislice;