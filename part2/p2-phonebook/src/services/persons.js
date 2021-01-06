import axios from "axios";

const url = "http://localhost:3001/persons";

// CREATE
const create = (newPerson) =>
  axios.post(url, newPerson).then((res) => res.data);

// RETRIEVE
const getAll = () => axios.get(url).then((res) => res.data);

// UPDATE
const update = (newPerson) =>
  axios.put(`${url}/${newPerson.id}`, newPerson).then((res) => res.data);

// DELETE
const remove = (id) => axios.delete(`${url}/${id}`).then((res) => res.data);

export default { create, getAll, update, remove };
