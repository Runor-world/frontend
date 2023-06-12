import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utils/base_url";

// empty base service endpoints to which other endpoints will be connected
export const emptyApi = createApi({
  reducerPath: "emptyApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api/` }),
  tagTypes: ["Serviceman", "user", "profile", "Service"],
  endpoints: (build) => ({}),
});
