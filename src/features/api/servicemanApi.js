import { emptyApi } from "./emptyApi";

export const serviceManApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getServiceMen: build.query({
      query: () => "serviceman",
      providesTags: ["Serviceman"],
    }),
    getServiceMan: build.query({
      query: (serviceManId) => `serviceman/${serviceManId}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetServiceMenQuery, useGetServiceManQuery } = serviceManApi;
