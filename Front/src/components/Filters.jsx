export default function Filters({ filters, setFilters }) {
  return (
    <div>
      <input
        placeholder="Search"
        value={filters.search}
        onChange={e =>
          setFilters(p => ({ ...p, search: e.target.value }))
        }
      />

      <select
        value={filters.status}
        onChange={e =>
          setFilters(p => ({ ...p, status: e.target.value }))
        }
      >
        <option value="">All Status</option>
        <option value="open">open</option>
        <option value="pending">pending</option>
        <option value="resolved">resolved</option>
      </select>

      <select
        value={filters.priority}
        onChange={e =>
          setFilters(p => ({ ...p, priority: e.target.value }))
        }
      >
        <option value="">All Priority</option>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
    </div>
  );
}
