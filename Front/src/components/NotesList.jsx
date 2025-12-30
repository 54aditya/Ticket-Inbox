export default function NotesList({ notes }) {
  if (!notes.length) {
    return <p>No notes yet</p>;
  }

  return (
    <div className="notes-list">
      {notes.map(n => <p key={n.id}>{n.text}</p>)}
    </div>
  );
}