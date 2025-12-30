import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import TicketInbox from "./pages/TicketInbox.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import "./styles/global.css";
import CreateTicket from "./pages/CreateTicket.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/tickets"
        element={
          <ProtectedRoute>
            <TicketInbox />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tickets/create"
        element={
          <ProtectedRoute>
            <CreateTicket />
          </ProtectedRoute>
        }
      />

      {/* default redirect */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
