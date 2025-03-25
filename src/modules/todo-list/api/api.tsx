import { BASE_URL } from "../../../shared/api/instance";
import type { TodoDto } from "../types/todo-dto";

export const todoListApi = {
  // Функция возвращает Promise<TodoDto>, но внутри async функция возвращает просто TodoDto[]
  getTodoList: async ({ signal }: { signal: AbortSignal }) => {
    const response = await fetch(`${BASE_URL}/tasks`, { signal }).then((res) =>
      res.json()
    );
    return response as TodoDto[]; //или если без then, то await response.json() as TodoDto[]
  },
};
