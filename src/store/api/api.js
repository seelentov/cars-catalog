/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'http://localhost:5000/'

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['cars'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
  }),
  endpoints: builder => ({
    getUsers: builder.query({
      query: (item) => ({
        query: () => '/users'
      })
    })
  })
})

// db.json находится в корне, можно поднять для теста через json-server

export const { useGetUsersQuery } = api