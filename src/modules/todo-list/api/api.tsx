import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { fetchApiInstance } from "@/shared/api/api-instance";
import type { PaginatedResult, TodoDto } from "../types/todo-dto";

// новое апи (без getTodoList, через fetch-instance)
export const todoListApi = {
  baseKey: "tasks",
  // Здесь определяется часть функционала, которая не нужна в компонентах (best practice)
  // Можно хранить вместе queryOptions и api (getTodoList) в одном объекте, а можно и разделять
  getTodoListPaginateQueryOptions: ({ page }: { page: number }) => {
    return queryOptions({
      queryKey: [todoListApi.baseKey, "list", { page }],
      queryFn: (meta) =>
        fetchApiInstance<PaginatedResult<TodoDto>>(
          `/tasks?_page=${page}&_per_page=10`,
          {
            signal: meta.signal,
          }
        ),
    });
  },

  // Без пагинации
  getTodoListQueryOptions: () => {
    return queryOptions({
      queryKey: [todoListApi.baseKey, "list"],
      queryFn: (meta) =>
        fetchApiInstance<TodoDto[]>("/tasks", {
          signal: meta.signal,
        }),
    });
  },

  getTodoListInfiniteQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: [todoListApi.baseKey, "list"],
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

  // Для мутаций нет аналога queryOptions
  createTodo: (data: TodoDto) => {
    return fetchApiInstance<TodoDto>("/tasks", {
      method: "POST",
      json: data,
    });
  },
  updateTodo: (id: string, data: Partial<TodoDto>) => {
    return fetchApiInstance<TodoDto>(`/tasks/${id}`, {
      method: "PATCH",
      json: data,
    });
  },
  deleteTodo: (id: string) => {
    return fetchApiInstance(`/tasks/${id}`, {
      method: "DELETE",
    });
  },
};
