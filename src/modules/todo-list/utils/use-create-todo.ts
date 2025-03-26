import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { todoListApi } from "../api/api";

export const useCreateTodo = () => {
  // Способ рефетчинга данных после изменений
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo,
    onSuccess: () => {}, //Success
    onError() {}, //При ошибки
    // Срабатывает всегда (инвалидацию лучше всего сунуть сюда)
    // !TODO Снизу базовый onSettled, с основными способами инвалидации. Ниже асинхронный, для синхронизации
    // onSettled() {
    //   // Помечает запросы по переданному ключу в Stale, и перезапрашивает их (если они есть на странице - активные)
    //   queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] });
    //   //точечный перезапрос конкретного queryOption
    //   queryClient.invalidateQueries(todoListApi.getTodoListQueryOptions());
    // },
    async onSettled() {
      // isPending = false когда закончится инвалидация (чтобы синхронизировать ui isPending и инвалидации)
      // Советует всегда инвалидацию использовать с await
      await queryClient.invalidateQueries(
        todoListApi.getTodoListQueryOptions()
      );
    },
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const text = String(formData.get("text") ?? "");

    createTodoMutation.mutate({
      id: nanoid(),
      done: false,
      text,
      userId: "1",
    });

    e.currentTarget.reset();
  };

  return { handleCreate, isPending: createTodoMutation.isPending };
};
