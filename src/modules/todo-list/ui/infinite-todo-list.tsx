import { useInfiniteQuery } from "@tanstack/react-query";
import { todoListApi } from "../api/api";
import { useCallback, useRef } from "react";
import { Loader } from "lucide-react";

export const InfiniteTodoList = () => {
  const {
    isPending,
    error,
    data: todoItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["tasks", "list"],
    queryFn: (meta) => todoListApi.getTodoList({ page: meta.pageParam }, meta),
    initialPageParam: 1,
    getNextPageParam: (result) => result.next,
    select: (result) => result.pages.flatMap((page) => page.data),
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  if (isPending) {
    return <div> Загрузка </div>;
  }

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="grid place-content-center p-20">
      <h1 className="text-2xl font-bold mb-2 text-center">Todo List</h1>
      <div className="fixed top-5 left-5 w-6 h-6 bg-gray-500 rounded-md">
        {isFetchingNextPage && <Loader className="animate-spin text-white" />}
      </div>
      <div className="shadow-md bg-gray-200 p-5 flex flex-col gap-3 rounded-md">
        {todoItems.map((todo) => (
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
      <div ref={cursorRef}>
        {!hasNextPage && <p>Нет данных для загрузки</p>}
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useIntersection(onIntersect: () => void) {
  const unsubscribe = useRef(() => {});

  return useCallback(
    (el: HTMLDivElement | null) => {
      const observer = new IntersectionObserver((entries) => {
        // biome-ignore lint/complexity/noForEach: <explanation>
        entries.forEach((intersection) => {
          if (intersection.isIntersecting) {
            onIntersect();
          }
        });
      });
      if (el) {
        observer.observe(el);
        unsubscribe.current = () => observer.disconnect();
      } else {
        unsubscribe.current();
      }
    },
    [onIntersect]
  );
}
