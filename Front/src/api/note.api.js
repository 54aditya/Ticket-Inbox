import api from "./axios";

export const addNoteApi = (id, data) =>
  api.post(`/tickets/${id}/notes`, data);

export const getNotesApi = (id) =>
  api.get(`/tickets/${id}/notes`);

export const deletenote= (id)=>{
    api.delete(`/tickets/${id}/notes`);
}
