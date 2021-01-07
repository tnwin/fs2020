import axios from 'axios';

// const url = "http://localhost:3001/persons";
// const url = 'http://localhost:3001/api/persons';
// const url = 'https://powerful-dusk-23995.herokuapp.com/api/persons';
const url = '/api/persons';

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

// To avoid warning about missing const
// Could've also used named exports
const personService = { create, getAll, update, remove };

export default personService;
