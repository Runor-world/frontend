import { emptyApi } from "./emptyApi";
import { setMessage, setUser } from "../auth/authSlice";
import { authHeader } from "../../utils/headers";

export const authApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (user) => ({
        url: "auth/login",
        method: "POST",
        body: user,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // update user state in user slice
          dispatch(setUser(data.user));
          // localStorage.setItem("user", JSON.stringify(data.user));#
          localStorage.setItem("token", JSON.stringify(data.token));
          dispatch(setMessage({ text: data.msg, type: true }));
        } catch (error) {
          dispatch(setMessage({ text: error.error.data.msg, type: false }));
        }
      },
    }),
    registerUser: build.mutation({
      query: (values) => ({
        url: "auth/signup",
        method: "POST",
        body: {
          email: values.email,
          password: values.password,
          otherName: values.otherName,
          firstName: values.firstName,
          phoneNumber: values.phoneNumber,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setMessage({ text: data.msg, type: true }));
        } catch (error) {
          dispatch(setMessage({ text: error.error.data.msg, type: false }));
        }
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
