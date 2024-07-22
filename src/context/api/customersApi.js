import { api } from "./index";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCustomers: build.query({
      query: ({ page, paidToday, debt, createdAt, budget }) => ({
        url: `/get/customers?skip=${page}&paidToday=${paidToday}&debt=${debt}&createdAt=${createdAt}&budget=${budget}`,
      }),
      providesTags: ["Customer"],
    }),
    getCustomersBySearch: build.query({
      query: (params) => ({
        url: "get/customers/search?",
        params,
      }),
      providesTags: ["Customer"],
    }),
    getCustomerById: build.query({
      query: (id) => ({
        url: `get/customer/${id}`,
      }),
      providesTags: ["Customer"],
    }),
    createCustomer: build.mutation({
      query: (body) => ({
        url: "create/customer",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Customer"],
    }),
    deleteCustomer: build.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: build.mutation({
      query: ({ id, body }) => ({
        url: `update/customer/${id}`,
        method: "PATCH", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useGetCustomersBySearchQuery,
  useCreateCustomerMutation,
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
} = productApi;
