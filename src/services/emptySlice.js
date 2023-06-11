import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils/base_url";

export const emptySlice = createApi({
  reducerPath: "emptySlice",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api/` }),
  tagTypes: ["Serviceman"],
  endpoints: (build) => ({
    // getServiceMen: build.query({
    //   query: () => "serviceman",
    //   providesTags: ["Serviceman"],
    // }),
  }),
});

export const { useGetServiceMenQuery } = emptySlice;
