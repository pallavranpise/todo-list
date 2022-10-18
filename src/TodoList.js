import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filterTodos, setFilterTodos] = useState([]);
  const [myfilter, setFilter] = useState("all");
  const [allTrue, seAllTrue] = useState(true);

  const addTodo = (todo) => {
    if (todo.text === "") return;
    setTodos((prev) => [...prev, todo]);
    filterFunc([...todos, todo], myfilter);
  };

  const toggleComplete = (id) => {
    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      } else {
        return todo;
      }
    });
    filterFunc(newTodo, myfilter);
    setTodos(newTodo);
  };

  const filterFunc = (stateTodos, ifilter) => {
    let newTodo = [];
    if (ifilter === "active") {
      newTodo = stateTodos.filter((todo) => !todo.complete);
    } else if (ifilter === "all") {
      newTodo = stateTodos;
    } else if (ifilter === "complete") {
      newTodo = stateTodos.filter((todo) => todo.complete);
    }
    setFilter(ifilter);
    setFilterTodos(newTodo);
  };

  const handleDeleteTodo = (id) => {
    const newTodo = todos.filter((todo) => todo.id !== id);
    filterFunc(newTodo, myfilter);
    setTodos(newTodo);
  };

  const removeAllTodosThatComplete = (id) => {
    const newTodo = todos.filter((todo) => !todo.complete);
    filterFunc(newTodo, myfilter);
    setTodos(newTodo);
  };

  return (
    <>
      <div>
        <TodoForm onSubmit={addTodo} />
        {filterTodos.map((todo) => (
          <Todo
            toggleComplete={toggleComplete}
            key={todo.id}
            todo={todo}
            onDelete={() => handleDeleteTodo(todo.id)}
          />
        ))}
      </div>
      <div>todos left:{todos.filter((todo) => !todo.complete).length}</div>
      <button
        onClick={() => {
          filterFunc(todos, "all");
        }}
      >
        all
      </button>
      <button
        onClick={() => {
          filterFunc(todos, "active");
        }}
      >
        active
      </button>
      <button
        onClick={() => {
          filterFunc(todos, "complete");
        }}
      >
        complete
      </button>
      {todos.some((todo) => todo.complete) ? (
        <button onClick={removeAllTodosThatComplete}>
          remove All Complete Todos
        </button>
      ) : null}

      <button
        onClick={() => {
          const newTodo = todos.map((todo) => {
            return { ...todo, complete: allTrue };
          });
          setTodos(newTodo);
          filterFunc(newTodo, myfilter);
          seAllTrue(!allTrue);
        }}
      >
        complete all:{` ${allTrue}`}
      </button>
    </>
  );
}
