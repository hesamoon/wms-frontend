import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// services
import { getCategories, createCategory } from "../services/admin.js";

export const useCategories = () => {
  const queryClient = useQueryClient();

  // Fetch categories
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Add category mutation
  const { mutate: createCategoryMutate, isPending: createCategoryPending } =
    useMutation({
      mutationFn: createCategory,
      onSuccess: (data) => {
        queryClient.invalidateQueries("categories");
        toast.success("دسته بندی با موفقیت اضافه شد.");
      },
      onError: (err) => {
        console.log(err);
        toast.error("خطا در اضافه کردن دسته بندی!");
      },
    });

  return {
    categories,
    categoriesLoading,
    categoriesError,
    createCategoryMutate,
    createCategoryPending,
  };
}; 