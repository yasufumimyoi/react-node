import { useEffect, useState } from "react";
import { EditTodo } from "./EditTodo";

export const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const res = await fetch("http://localhost:3001/todos");
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3001/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div>
      <p className="font-bold">LIST TODOS</p>
      {todos.map((todo) => (
        <div className="flex items-center" key={todo.todo_id}>
          <p>{todo.description}</p>
          <EditTodo todo={todo} todos={todos} setTodos={setTodos} />
          <button
            className="border bg-red-400 p-1"
            onClick={() => deleteTodo(todo.todo_id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
