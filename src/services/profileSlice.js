import { emptySlice } from "./emptySlice";

export const profileSlice = emptySlice.injectEndpoints({
  endpoints: (build) => ({
    getAllProfiles: build.query({
      query: () => ({
        url: "profile",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllProfilesQuery } = profileSlice;
