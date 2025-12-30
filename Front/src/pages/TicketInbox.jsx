import { useEffect, useState, useCallback } from "react";
import { fetchTicketsApi } from "../api/ticket.api";
import useDebounce from "../hooks/useDebounce";
import useAutoRefresh from "../hooks/useAutoRefresh";
import TicketTable from "../components/TicketTable";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function TicketInbox() {

  const [tickets, setTickets] = useState({
    tickets: [],
    totalPages: 1
  });

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    search: ""
  });

  const debounced = useDebounce(filters.search, 500);

  const loadTickets = useCallback(async () => {
    try {
      const res = await fetchTicketsApi({
        page,
        limit: 10,
        status: filters.status || undefined,
        priority: filters.priority || undefined,
        search: debounced || undefined
      });

      setTickets(res.data);
    }catch (err){
      console.error(err);
    }finally{
      setLoading(false);
    }
  }, [page, filters.status, filters.priority, debounced]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  useAutoRefresh(loadTickets, 10000);

  if (loading) return <div className="loader"><Loader /></div>;

  const createTicket = () => navigate("/tickets/create");

  return (
    <>
      <div className="nav-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link onClick={logout} to="/login">Logout</Link>
        <Link to="/tickets/create">Create New Ticket</Link>
      </div>

      <div className="ticket-inbox-container">
        <button onClick={createTicket}>New Ticket</button>
        <h2>Ticket Inbox</h2>

        <Filters filters={filters} setFilters={setFilters} />

        <TicketTable data={tickets.tickets} />

        <Pagination
          page={page}
          setPage={setPage}
          totalPages={tickets.totalPages}
        />
      </div>
    </>
  );
}
