import { emptyApi } from "./emptyApi";

export const serviceManApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getServiceMen: build.query({
      query: (queryValue) => ({
        url: "serviceman",
        method: "GET",
        params: queryValue,
      }),
      providesTags: ["Serviceman"],
      invalidatesTags: ["Serviceman"],
      keepUnusedDataFor: 0.01,
    }),
    getServiceMan: build.query({
      query: (serviceManId) => `serviceman/${serviceManId}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetServiceMenQuery, useGetServiceManQuery } = serviceManApi;
