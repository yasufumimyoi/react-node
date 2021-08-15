import { useState } from "react";

export const InputTodo = () => {
  const [description, setDescription] = useState([]);

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { description };
      await fetch("http://localhost:3001/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setDescription("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mb-5">
      <h2 className="font-bold mb-3">TODO LIST</h2>
      <form onSubmit={onSubmitForm}>
        <input
          className="border p-1"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="bg-green-500 border text-white p-1">Add</button>
      </form>
    </div>
  );
};
