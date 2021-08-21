import { useState } from "react";

import { InputTodo } from "./components/InputTodo";
import { ListTodo } from "./components/ListTodo";

function App() {
  const [todos, setTodos] = useState([]);
  return (
    <div className=" w-2/3 m-auto">
      <InputTodo todos={todos} setTodos={setTodos} />
      <ListTodo todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
