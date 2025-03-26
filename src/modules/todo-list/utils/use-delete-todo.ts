import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "../api/api";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: todoListApi.deleteTodo,
    onSettled() {
      queryClient.invalidateQueries(todoListApi.getTodoListQueryOptions());
    },
    // Pissimistic Update
    // Суть с том, что мы обновляем кэш до инвалидации get запроса в onSettled
    async onSuccess(_, deletedId) {
      // Работам напрямую с кэшом

      const todos = queryClient.getQueryData(
        todoListApi.getTodoListQueryOptions().queryKey
      );
      if (todos) {
        queryClient.setQueryData(
          todoListApi.getTodoListQueryOptions().queryKey,
          todos.filter((item) => item.id !== deletedId)
        );
      }
    },
  });

  return {
    handleDelete: deleteTodoMutation.mutate,
    // Точечное отображение isPending по id мутации
    getIsPending: (id: string) =>
      deleteTodoMutation.isPending && deleteTodoMutation.variables === id,
  };
};
