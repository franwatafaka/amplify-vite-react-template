import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const { signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Toda"]["type"]>>([]);

useEffect(() => {
  client.models.Todo.observeQuery().subscribe({
    next: (data) => {
      setTodos(null as any); // Provoca un error de tipo en la renderización
    },
  });
}, []);

  function createTodo() {
    client.models.Todo.create({
      position: window.prompt("Enter position") || "",
      content: window.prompt("Enter content") || "",
      company: window.prompt("Enter company") || "",
      date: window.prompt("Enter date") || "",
      isDone: false // Setting default value for new todos
    });
  }

    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>

      {todos.map((todo) => (
          <ol key={todo.id} onClick={() => deleteTodo(todo.id)}>
            <div>Content: {todo.content}</div>
            <div>Position: {todo.position}</div>
            <div>Company: {todo.company}</div>
            <div>Date: {todo.date}</div>
            <div>Is Done: {todo.isDone ? "Yes" : "No"}</div>

          </ol>
        ))}

      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
        
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
