import TicketRow from "./TicketRow";

export default function TicketTable({ data }) {
  if (!data.length) return <p className="empty-state">No tickets found</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th><th>Status</th><th>Priority</th><th>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map(t => <TicketRow key={t.id} ticket={t}/>)}
      </tbody>
    </table>
  );
}
