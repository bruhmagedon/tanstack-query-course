import { useInfiniteQuery } from "@tanstack/react-query";
import { todoListApi } from "../api/api";
import { Loader } from "lucide-react";
import { useIntersection } from "@/shared/hooks/useIntersection";

//Предложение выносить из кастомного хука не тонну разметки, а куски jsx кода
//Отделение логики от ui (инкапсуляция)
export const useTodoList = () => {
  const {
    isLoading,
    error,
    data: todoItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...todoListApi.getTodoListInfiniteQueryOptions(),
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  const cursor = (
    <div className="" ref={cursorRef}>
      {" "}
      {!hasNextPage && <p>Нет данных для загрузки</p>}
      {isFetchingNextPage && <Loader className="animate-spin text-white" />}
    </div>
  );

  return {
    error,
    todoItems,
    isLoading,
    cursor,
  };
};
