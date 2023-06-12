import { authHeader } from "../../utils/headers";
import { emptyApi } from "./emptyApi";
import { setMessage } from "../service/serviceSlice";

export const serviceApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getServices: build.query({
      query: () => "service",
      providesTags: ["Service"],
    }),
    createService: build.mutation({
      query: (value) => ({
        url: "service",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        method: "POST",
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
      invalidatesTags: ["Service"],
    }),
    updateService: build.mutation({
      query: (value) => ({
        url: "service",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        method: "PATCH",
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
      invalidatesTags: ["Service"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
} = serviceApi;
