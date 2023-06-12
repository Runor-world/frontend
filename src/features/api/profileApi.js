import { emptyApi } from "./emptyApi";
import { setMessage } from "../profile/profileSlice";
import { authHeader } from "../../utils/headers";
import { setUser } from "../auth/authSlice";

export const profileApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProfiles: build.query({
      query: () => ({
        url: "profile",
        headers: authHeader,
      }),
      providesTags: ["profile", "user"],
    }),
    updateUserProfile: build.mutation({
      query: (value) => ({
        url: "profile/personal",
        headers: authHeader,
        method: "PATCH",
        body: value,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // update user state in user slice
          dispatch(setUser(data.user));
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch(setMessage({ text: data.msg, type: true }));
        } catch (error) {
          dispatch(setMessage({ text: error.error.data.msg, type: false }));
        }
      },
      invalidatesTags: ["profile", "user"],
    }),
    createServiceProfile: build.mutation({
      query: (value) => ({
        url: "profile/service",
        method: "POST",
        headers: authHeader,
        body: value,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setMessage({ text: data.msg, type: true }));
        } catch (error) {
          dispatch(setMessage({ text: error.error.data.msg, type: false }));
        }
      },
      invalidatesTags: ["profile"],
    }),
    updateUserProfilePhoto: build.mutation({
      query: (value) => ({
        url: "profile/photo",
        method: "PATCH",
        headers: authHeader,
        body: value,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setMessage({ text: data.msg, type: true }));
        } catch (error) {
          console.log(error);
          dispatch(setMessage({ text: error.error.data.msg, type: false }));
        }
      },
      invalidatesTags: ["profile"],
    }),
    updateUserProfileBackgroundPhoto: build.mutation({
      query: (value) => ({
        url: "profile/backgroundphoto",
        method: "PATCH",
        headers: authHeader,
        body: value,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setMessage({ text: data.msg, type: true }));
        } catch (error) {
          console.log(error);
          dispatch(setMessage({ text: error.error.data.msg, type: false }));
        }
      },
      invalidatesTags: ["profile"],
    }),
    addUserPhoneNumber: build.mutation({
      query: (value) => ({
        url: "profile/phonenumber",
        method: "PATCH",
        headers: authHeader,
        body: value,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // update user store on local storage
          dispatch(setUser(data.user));
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch(setMessage({ text: data.msg, type: true }));
        } catch (error) {
          console.log(error);
          dispatch(setMessage({ text: error.error.data.msg, type: false }));
        }
      },
      invalidatesTags: ["profile"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllProfilesQuery,
  useUpdateUserProfileMutation,
  useCreateServiceProfileMutation,
  useUpdateUserProfilePhotoMutation,
  useUpdateUserProfileBackgroundPhotoMutation,
  useAddUserPhoneNumberMutation,
} = profileApi;
