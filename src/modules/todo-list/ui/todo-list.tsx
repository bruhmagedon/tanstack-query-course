import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { todoListApi } from "../api/old-api";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/shared/ui/button";

export const TodoList = () => {
  const [page, setPage] = useState(1);

  const {
    isPending,
    error,
    data: todoItems,
  } = useQuery({
    queryKey: ["tasks", "list", { page }],
    queryFn: (meta) => todoListApi.getTodoList({ page }, meta),
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return <div> Загрузка </div>;
  }

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="grid place-content-center p-20 ">
      <h1 className="text-2xl font-bold mb-2 text-center">Todo List</h1>
      <div className="flex justify-between mb-3">
        <Button onClick={() => setPage((page) => Math.max(page - 1, 1))}>
          <ArrowLeft />
        </Button>
        <p className="font-medium text-xl">{page}</p>
        <Button
          onClick={() => setPage((page) => Math.min(page + 1, todoItems.pages))}
        >
          <ArrowRight />
        </Button>
      </div>
      <div className="shadow-md bg-gray-200 p-5 flex flex-col gap-3 rounded-md">
        {todoItems.data.map((todo) => (
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
    </div>
  );
};
