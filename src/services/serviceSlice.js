import { emptySlice } from "./emptySlice";

export const serviceSlice = emptySlice.injectEndpoints({
  endpoints: (build) => ({
    getServices: build.query({
      query: () => "service",
    }),
  }),
  overrideExisting: false,
});

export const { useGetServicesQuery } = serviceSlice;
