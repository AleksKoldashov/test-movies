import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const moviesApi = createApi({
    reducerPath: 'movies',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://www.omdbapi.com/' }),
    endpoints: (builder) => ({
      getMovies: builder.query({
        query: ({str, pagin,movType}) => `?apikey=e0620bd4&page=${pagin}&s=${str}&type=${movType}`,
      }),
      getMoviesId: builder.query({
        query: (id) => `?apikey=e0620bd4&i=${id}`,
      }),
    }),
  })

export const {useGetMoviesQuery, useGetMoviesIdQuery}=moviesApi;

// key=c1f4b487