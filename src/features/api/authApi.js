import { emptyApi } from "./emptyApi";
import { setMessage } from "../auth/authSlice";
import { authHeader } from "../../utils/headers";

export const authApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (user) => ({
        url: "auth/login",
        method: "POST",
        body: user,
      }),
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
