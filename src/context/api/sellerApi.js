import { api } from "./index";

export const sellerApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSellers: build.query({
      query: (params) => ({
        url: "/get/sellers",
        params,
      }),
      providesTags: ["Seller"],
    }),
    getSellersBySearch: build.query({
      query: (params) => ({
        url: "get/sellers/search?",
        params,
      }),
      providesTags: ["Seller"],
    }),

    getSellerById: build.query({
      query: (id) => ({
        url: `get/seller/${id}`,
      }),
      providesTags: ["Seller"],
    }),
    createSeller: build.mutation({
      query: (body) => ({
        url: "create/seller",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Seller"],
    }),

    updateCustomer: build.mutation({
      query: ({ id, body }) => ({
        url: `update/seller/${id}`,
        method: "PATCH", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Seller"],
    }),
  }),
});

export const {
  useGetSellersQuery,
  useCreateSellerMutation,
  useGetSellersBySearchQuery,
  useGetSellerByIdQuery,
  useUpdateCustomerMutation,
} = sellerApi;
