import { QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "../shared/api/query-client";
import { InfiniteTodoList } from "../modules/todo-list";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InfiniteTodoList />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
