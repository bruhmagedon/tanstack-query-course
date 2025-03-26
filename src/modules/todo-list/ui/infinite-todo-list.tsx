import { Input } from "@/shared/ui/input";
import { useTodoList } from "../utils/use-todo-list";
import { Button } from "@/shared/ui/button";
import { useCreateTodo } from "../utils/use-create-todo";

export const InfiniteTodoList = () => {
  const { error, todoItems, isLoading } = useTodoList();
  const createTodo = useCreateTodo();

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
            className="flex gap-3 items-center bg-white p-3 rounded-md cursor-pointer"
          >
            <button
              type="button"
              className={`${
                todo.done ? "bg-green-300" : "bg-red-300"
              } p-2.5 rounded-md font-medium`}
            >
              {todo.done ? "Done" : "Nope"}
            </button>{" "}
            {todo.text}
          </div>
        ))}
      </div>
    </div>
  );
};
