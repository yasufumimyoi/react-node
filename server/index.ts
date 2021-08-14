import express, { Request, Response } from "express";
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// create todo
app.post("/todos", async (req: Request, res: Response) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "insert into todo (description) values($1) returning *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// get all todo
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const allTodos = await pool.query("select * from todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get the todo
app.get("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("select * from todo where todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// update the todo
app.put("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "update todo set description = $1 where todo_id = $2",
      [description, id]
    );
    res.json("Updated");
  } catch (error) {
    console.log(error.message);
  }
});

// delete the todo
app.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("delete from todo where todo_id = $1", [
      id,
    ]);
    res.json("Deleted");
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(3001, () => {
  console.log("server is running");
});
