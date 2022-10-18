import React from "react";

export default function Todo(props) {
  return (
    <div
      style={{
        display:"flex", justifyContent : "center", margin:"5px"
      }}
    >
      <div
        style={{
          textDecoration: props.todo.complete ? "line-through" : "",
        }}
        onClick={() => props.toggleComplete(props.todo.id)}
      >
        {props.todo.text}
      </div>
      <button onClick={props.onDelete}>x</button>
    </div>
  );
}
