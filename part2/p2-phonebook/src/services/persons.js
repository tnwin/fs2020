import axios from 'axios';

// const url = "http://localhost:3001/persons";
// const url = 'http://localhost:3001/api/persons';
// const url = 'https://powerful-dusk-23995.herokuapp.com/api/persons';
const url = '/api/persons';

// CREATE
const create = (newPerson) =>
  axios
    .post(url, newPerson)
    .then((res) => res.data)
    .catch((err) => {
      console.log('Error in POST request:', err.response.data);
      return err.response.data;
    });

// RETRIEVE
const getAll = () =>
  axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(
        'Error in GET all request ー (connection to server):',
        err.response.data
      );
      return err.response.data;
    });

// UPDATE
const update = (newPerson) =>
  axios
    .put(`${url}/${newPerson.id}`, newPerson)
    .then((res) => res.data)
    .catch((err) => {
      console.log('Error in PUT request:', err.response.data);
      return err.response.data;
    });

// DELETE
const remove = (id) =>
  axios
    .delete(`${url}/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log('Error in DELETE request:', err);
      return err.response.data;
    });

// To avoid warning about missing const
// Could've also used named exports
const personService = { create, getAll, update, remove };

export default personService;
