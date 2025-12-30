// src/components/Pagination.jsx
export default function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="pagination-container">
      <button disabled={page===1} onClick={()=>setPage(p=>p-1)}>Prev</button>
      <span>{page}/{totalPages}</span>
      <button disabled={page===totalPages}
        onClick={()=>setPage(p=>p+1)}>Next</button>
    </div>
  );
}