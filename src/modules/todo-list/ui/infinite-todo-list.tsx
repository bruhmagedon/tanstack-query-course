import { Input } from "@/shared/ui/input";
import { useTodoList } from "../utils/use-todo-list";
import { Button } from "@/shared/ui/button";
import { useCreateTodo } from "../utils/use-create-todo";
import { useDeleteTodo } from "../utils/use-delete-todo";
import { XIcon } from "lucide-react";

export const InfiniteTodoList = () => {
  const { error, todoItems, isLoading } = useTodoList();
  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();

  if (isLoading) {
    return <div> Загрузка </div>;
  }

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="grid place-content-center p-20 relative">
      <h1 className="text-2xl font-bold mb-2 text-center">Todo List</h1>

      <div className="shadow-md bg-gray-200 p-5 flex flex-col gap-3 rounded-md">
        <form
          className="rounded-md w-full sticky flex gap-2 bg-amber-300 p-3 mb-2 top-0 shadow-md"
          onSubmit={createTodo.handleCreate}
        >
          <Input className="bg-white" type="text" name="text" />
          <Button disabled={createTodo.isPending} type="submit">
            Add Task
          </Button>
        </form>
        {todoItems?.map((todo) => (
          <div
            key={todo.id}
            className="flex gap-3 items-center justify-between bg-white p-3 rounded-md cursor-pointer"
          >
            <div>
              <button
                type="button"
                className={`${
                  todo.done ? "bg-green-300" : "bg-red-300"
                } p-2.5 rounded-md font-medium mr-3`}
              >
                {todo.done ? "Done" : "Nope"}
              </button>{" "}
              <p className="font-medium inline">{todo.text}</p>
            </div>
            <Button
              disabled={deleteTodo.getIsPending(todo.id)}
              variant={"destructive"}
              onClick={() => deleteTodo.handleDelete(todo.id)}
            >
              <XIcon />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
