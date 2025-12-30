import { useState } from "react";
import TicketDrawer from "./TicketDrawer";

export default function TicketRow({ ticket }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr onClick={() => setOpen(true)}>
        <td>{ticket.title}</td>
        <td className={`status-${ticket.status}`}>{ticket.status}</td>
        <td className={`priority-${ticket.priority}`}>{ticket.priority}</td>
        <td>{ticket.customer_email}</td>
      </tr>

      {open && (
        <tr>
          <td colSpan={4}>
            <TicketDrawer ticket={ticket} onClose={() => setOpen(false)} />
          </td>
        </tr>
      )}
    </>
  );
}
