import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { fetchApiInstance } from "@/shared/api/api-instance";
import type { PaginatedResult, TodoDto } from "../types/todo-dto";

// новое апи (без getTodoList, через fetch-instance)
export const todoListApi = {
  // Здесь определяется часть функционала, которая не нужна в компонентах (best practice)
  // Можно хранить вместе queryOptions и api (getTodoList) в одном объекте, а можно и разделять
  getTodoListQueryOptions: ({ page }: { page: number }) => {
    return queryOptions({
      queryKey: ["tasks", "list", { page }],
      queryFn: (meta) =>
        fetchApiInstance(`/tasks?_page=${page}&_per_page=10`, {
          signal: meta.signal,
        }),
    });
  },

  getTodoListInfiniteQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ["tasks", "list"],
      queryFn: (meta) =>
        fetchApiInstance<PaginatedResult<TodoDto>>(
          `/tasks?_page=${meta.pageParam}&_per_page=10`,
          {
            signal: meta.signal,
          }
        ),
      initialPageParam: 1,
      getNextPageParam: (result) => result.next,
      select: (result) => result.pages.flatMap((page) => page.data),
    });
  },
};
