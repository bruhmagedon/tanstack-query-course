import { BASE_URL } from "../../../shared/api/instance";
import type { PaginatedResult, TodoDto } from "../types/todo-dto";

export const todoListApi = {
  // Функция возвращает Promise<TodoDto>, но внутри async функция возвращает просто TodoDto[]
  getTodoList: async (
    { page }: { page: number },
    { signal }: { signal: AbortSignal }
  ) => {
    const response = await fetch(
      `${BASE_URL}/tasks?_page=${page}&_per_page=10`,
      {
        signal,
      }
    ).then((res) => res.json());
    return response as PaginatedResult<TodoDto>; //или если без then, то await response.json() as TodoDto[]
  },
};
