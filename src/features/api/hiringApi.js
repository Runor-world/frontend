import { emptyApi } from "./emptyApi";
import { setMessage } from "../hiring/hiringSlice";
import { openModal } from "../modal/modalSlice";

const hiringApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    hireServiceMan: build.mutation({
      query: (values) => ({
        url: "hiring",
        method: "POST",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: values,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setMessage({ text: data.msg, type: true }));
          dispatch(openModal());
        } catch (error) {
          dispatch(setMessage({ text: error.error.data.msg, type: false }));
        }
      },
      invalidatesTags: ["Hiring"],
    }),
    getAllHiringByUser: build.query({
      query: () => ({
        url: "hiring/user",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }),
      providesTags: ["Hiring"],
    }),
    getAllServiceManJobs: build.query({
      query: () => ({
        url: "hiring/user/jobs",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }),
      providesTags: ["Hiring"],
    }),
    getAllHirings: build.query({
      query: () => "hiring",
      providesTags: ["Hiring"],
    }),
  }),
});

export const {
  useGetAllHiringByUserQuery,
  useHireServiceManMutation,
  useGetAllServiceManJobsQuery,
  useGetAllHiringsQuery,
} = hiringApi;
