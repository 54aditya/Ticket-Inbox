import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TicketInbox from "./pages/TicketInbox";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        <Route path="/" element={
          <ProtectedRoute><TicketInbox/></ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}
