import { useState } from "react";
import { createTicketApi } from "../api/ticket.api.js";
import { useNavigate } from "react-router-dom";

export default function CreateTicket() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    description: "",
    customer_email: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!data.title || !data.description || !data.customer_email) {
      setError("All fields are required");
      return;
    }

    try {
      await createTicketApi(data); 
      setSuccess("Ticket created successfully!");
      navigate("/tickets");
      setData({ title:"", description:"", customer_email:"" }); 
    } catch (err) {
      setError("Failed to create ticket");
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Create Ticket</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <input
        type="text"
        placeholder="Title"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
      />
      <input
        type="email"
        placeholder="Customer Email"
        value={data.customer_email}
        onChange={(e) => setData({ ...data, customer_email: e.target.value })}
      />

      <button type="submit">Create Ticket</button>
    </form>
  );
}
