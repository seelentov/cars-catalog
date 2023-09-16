
import { api } from './api.js'


export const carsApi = api.injectEndpoints({
  endpoints: builder => ({
    getTask: builder.query({
      query: () => '/cars/?_sort=id&_order=desc',
      providesTags: () => [{
        type: 'cars'
      }]
    }),
    getPost: builder.query({
      query: (id) => `/cars/${id}`,
      providesTags: () => [{
        type: 'cars'
      }]
    }),
    updateDesc: builder.mutation({
      query: ({ id, text }) => ({
        url: `/cars/${id}`,
        method: 'PATCH',
        body: { desc: text }
      }),
      invalidatesTags: () => [{
        type: 'cars'
      }]
    }),
    addToFavorite: builder.mutation({
      query: ({ id, user, likes }) => ({
        url: `/cars/${id}`,
        method: 'PATCH',
        body: { likes: [...likes, user] }
      }),
      invalidatesTags: () => [{
        type: 'cars'
      }]
    }),
    unFavorite: builder.mutation({
      query: ({ id, user, likes }) => ({
        url: `/cars/${id}`,
        method: 'PATCH',
        body: { likes: likes.filter(e=>e !== user) }
      }),
      invalidatesTags: () => [{
        type: 'cars'
      }]
    }),
    postTask: builder.mutation({
      query: (item) => ({
        body: item,
        url: '/cars/',
        method: 'POST'
      }),
      invalidatesTags: () => [{
        type: 'cars'
      }]
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/cars/${taskId}`,
        method: 'DELETE'
      }),
      invalidatesTags: () => [{
        type: 'cars'
      }]
    }),
  })
})

export const { useGetTaskQuery } = carsApi
export const { usePostTaskMutation } = carsApi
export const { useDeleteTaskMutation } = carsApi
export const { useGetPostQuery } = carsApi
export const { useUpdateDescMutation } = carsApi
export const { useAddToFavoriteMutation } = carsApi
export const { useUnFavoriteMutation } = carsApi