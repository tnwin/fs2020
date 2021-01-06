import React from "react";

/**
 * Display all of the contacts in the phonebook with a delete button
 */
const Persons = ({ persons, filter, removePerson, sanitizeString }) => (
  <>
    {persons.map((person) => (
      <tr key={person.name}>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td>
          <button onClick={() => removePerson(person.id, person.name)}>
            delete
          </button>
        </td>
      </tr>
    ))}
  </>
);

export default Persons;
