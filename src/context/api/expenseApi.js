import { api } from ".";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getExpenses: build.query({
      query: (params) => ({
        url: "/get/expenses",
        params,
      }),
      providesTags: ["Expense", "Seller"],
    }),
    getExpenseById: build.query({
      query: (id) => ({
        url: `/get/expense/${id}`,
      }),
      providesTags: ["Expense", "Seller"],
    }),
    createExpense: build.mutation({
      query: (body) => ({
        url: "/create/expense",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Expense", "Seller"],
    }),
    deleteExpense: build.mutation({
      query: (id) => ({
        url: `/delete/expense/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expense", "Seller"],
    }),
    updateExpense: build.mutation({
      query: ({ id, body }) => ({
        url: `/update/expense/${id}`,
        method: "PUT", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Expense", "Seller"],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useGetExpenseByIdQuery,
  useCreateExpenseMutation,
  useDeleteExpenseMutation,
  useUpdateExpenseMutation,
} = productApi;
