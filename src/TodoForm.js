import React from "react";
import { useState } from "react";
import shortid from "shortid";
export default function TodoForm(props) {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      id: shortid.generate(),
      text: text,
      complete: false,
    });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="text"
        value={text}
        onChange={handleChange}
        placeholder="todo..."
      />
      <button type="submit" onSubmit={handleSubmit}>
        add todo
      </button>
    </form>
  );
}
