import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const moviesApi = createApi({
    reducerPath: 'movies',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://www.omdbapi.com/' }),
    endpoints: (builder) => ({
      getMovies: builder.query({
        query: ({str, pagin,movType}) => `?apikey=c1f4b487&page=${pagin}&s=${str}&type=${movType}`,
      }),
      getMoviesId: builder.query({
        query: (id) => `?apikey=c1f4b487&i=${id}`,
      }),
    }),
  })

export const {useGetMoviesQuery, useGetMoviesIdQuery}=moviesApi;