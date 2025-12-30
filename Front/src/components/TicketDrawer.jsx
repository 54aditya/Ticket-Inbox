import { useEffect, useState } from "react";
import { getTicketApi, updateTicketApi } from "../api/ticket.api";
import { addNoteApi, getNotesApi } from "../api/note.api";
import NotesList from "./NotesList";
import AddNote from "./AddNote";
import { deletenote } from "../api/note.api";

export default function TicketDrawer({ ticket, onClose }) {
  const [details, setDetails] = useState(ticket);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getTicketApi(ticket.id).then(res=>setDetails(res.data));
    getNotesApi(ticket.id).then(res=>setNotes(res.data.notes));
  }, [ticket.id]);

  const updateField = async (field, value) => {
    const prev = details[field];
    setDetails(p=>({ ...p, [field]: value })); 

    try {
      await updateTicketApi(ticket.id, { [field]: value });
    } catch {
      setDetails(p=>({ ...p, [field]: prev }));
    }
  };

  const addNote = async (text) => {
    const temp = { id: Math.random(), text };
    setNotes(p=>[temp,...p]); 

    try {
      const res = await addNoteApi(ticket.id,{ text });
      setNotes(p=>[res.data.note,...p.slice(1)]);
    } catch {
      setNotes(p=>p.slice(1)); 
    }
  };

  return (
    <div className="ticket-drawer">
      <div className="drawer-header">
        <h3>{details.title}</h3>

        <button onClick={onClose}>Close</button>
      </div>
        <h4>{details.customer_email}</h4>
        <h5>{details.description}</h5>
      <div className="ticket-details-controls">
        <select value={details.status}
          onChange={(e)=>updateField("status", e.target.value)}
          className={`status-${details.status}`}>
          <option>open</option>
          <option>pending</option>
          <option>resolved</option>
        </select>

        <select value={details.priority}
          onChange={(e)=>updateField("priority", e.target.value)}
          className={`priority-${details.priority}`}>
          <option>low</option>
          <option>medium</option>
          <option>high</option>
        </select>
      </div>
      
      <div className="note-section">
        <h4>Notes</h4>
        <AddNote onAdd={addNote}/>
        <NotesList notes={notes}/>
      </div>
    </div>
  );
}

