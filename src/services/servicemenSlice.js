import { emptySlice } from "./emptySlice";

export const serviceMenSlice = emptySlice.injectEndpoints({
  endpoints: (build) => ({
    getServiceMen: build.query({
      query: () => "serviceman",
      providesTags: ["Serviceman"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data: serviceMen } = await queryFulfilled;
          console.log(serviceMen);
        } catch (error) {
          console.log();
        }
      },
    }),
  }),
});

export const { useGetServiceMenQuery } = serviceMenSlice;
