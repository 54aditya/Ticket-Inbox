import { useState } from "react";

export default function AddNote({ onAdd }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={submit}>
      <input value={text} onChange={e=>setText(e.target.value)}
        placeholder="Write a note"/>
      <button>Add</button>
    </form>
  );
}
