import { authHeader } from "../../utils/headers";
import { emptyApi } from "./emptyApi";

const userApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => ({
        url: "users",
        headers: authHeader,
      }),
      providesTags: ["user", "Serviceman"],
    }),
    updateUserStatus: build.mutation({
      query: (value) => ({
        url: "users/status",
        method: "PATCH",
        headers: authHeader,
        body: value,
      }),
      async onQueryStarted(setMessage, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setMessage({ text: data.msg, type: true }));
        } catch (error) {
          dispatch(setMessage({ text: error.error.data.msg, type: false }));
        }
      },
      invalidatesTags: ["user", "Serviceman"],
    }),
  }),
});

export const { useGetAllUsersQuery, useUpdateUserStatusMutation } = userApi;
