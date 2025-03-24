import { useQuery } from "@tanstack/react-query";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export const getTasks = () => {
  return new Promise<Todo[]>((res) => {
    setTimeout(() => {
      res([
        {
          id: 1,
          text: "text",
          done: true,
        },
        {
          id: 2,
          text: "text1",
          done: false,
        },
        {
          id: 3,
          text: "text3",
          done: false,
        },
      ]);
    }, 2000);
  });
};

export const TodoList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  if (isPending) {
    return <div> Загрузка </div>;
  }

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }

  return (
    <div>
      {data.map((todo) => (
        <div key={todo.id}>
          {todo.done.toString()} {todo.text}
        </div>
      ))}
    </div>
  );
};
