import { useTodoList } from "../utils/use-todo-list";

export const InfiniteTodoList = () => {
  const { error, todoItems, isLoading, cursor } = useTodoList();

  if (isLoading) {
    return <div> Загрузка </div>;
  }

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="grid place-content-center p-20">
      <h1 className="text-2xl font-bold mb-2 text-center">Todo List</h1>
      <div className="shadow-md bg-gray-200 p-5 flex flex-col gap-3 rounded-md">
        {todoItems?.map((todo) => (
          <div
            key={todo.id}
            className="flex gap-3 items-center w-[300px] bg-white p-3 rounded-md"
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
      {cursor}
    </div>
  );
};
