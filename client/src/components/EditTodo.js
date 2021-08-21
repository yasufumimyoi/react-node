import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const EditTodo = ({ todo, todos, setTodos }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState(todo.description);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handelEdit = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch(`http://localhost:3001/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((result) => {
          const newTodo = [...todos];
          newTodo.map((todo) => {
            if (todo.todo_id == result.id) {
              todo.description = result.description;
            }
          });

          setTodos(newTodo);
        });
    } catch (error) {
      console.log(error.message);
    }
    closeModal();
  };
  return (
    <div>
      <button className="border bg-yellow-300 p-1" onClick={openModal}>
        Edit
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>EDIT TODO</div>
        <form>
          <input
            type="text"
            className="border block"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="border bg-yellow-300" onClick={handelEdit}>
            EDIT
          </button>
          <button className="border bg-red-400" onClick={closeModal}>
            CLOSE
          </button>
        </form>
      </Modal>
    </div>
  );
};
