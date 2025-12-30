import api from "./axios";

export const fetchTicketsApi = (params) =>
  api.get("/tickets", { params });

export const getTicketApi = (id) =>
  api.get(`/tickets/${id}`);

export const updateTicketApi = (id, data) =>
  api.patch(`/tickets/${id}`, data);

export const createTicketApi = (data) => api.post("/tickets/create", data);
