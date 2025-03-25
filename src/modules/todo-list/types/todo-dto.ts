export type TodoDto = {
  id: number;
  text: string;
  done: boolean;
};

// Возможность переиспользовать в других модулях за счет T
export type PaginatedResult<T> = {
  data: T[];
  items: number;
  pages: number;
  next: number | null;
  prev: number | null;
  first: number;
  last: number;
};
