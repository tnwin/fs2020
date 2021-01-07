import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import './App.css';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationType, setNotificationType] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  // RETRIEVE  all of the contact from the phonebook at startup
  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) =>
        initialPersons ? setPersons(initialPersons) : null
      )
      .catch((e) =>
        console.log('Error retrieving from server on initial run:', e)
      );
  }, []);

  // CREATE and add a person to the phonebook
  // UPDATE if the person is already added
  // Notify with update
  // 🛠 Fixed addPerson only add if response is a person
  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
      // ID handled on server side
    };
    // checkDuplicate(newPerson)
    const duplicate = findDuplicate(newPerson);
    // If duplicate, confirm update
    typeof duplicate !== 'undefined'
      ? confirmUpdate(duplicate, newNumber)
      : // : setPersons((prevPersons) => prevPersons.concat(newPerson));
        // If not duplicate, add person, clear inputs, notify
        personService
          .create(newPerson)
          .then((resPerson) => {
            setNewName('');
            setNewNumber('');
            // setFilter('');
            if (resPerson) {
              setPersons((prevPersons) => prevPersons.concat(resPerson));
              notify(`🆕 Added ${newPerson.name}`);
            }
          })
          .catch((e) => console.log('Error from addPerson', e));
  };

  // DELETE a person from the phonebook
  // Notify with success or error
  const removePerson = (id, name) =>
    window.confirm(`🚨 Delete ${name} ?`)
      ? personService
          .remove(id)
          .then(() => {
            setPersons((prevPersons) => prevPersons.filter((p) => p.id !== id));
            notify(`👋 Deleted ${name}`);
          })
          .catch((e) => {
            // No longer the expected error after backend modification
            console.log('Error deleting person', e);
            setPersons((prevPersons) => prevPersons.filter((p) => p.id !== id));
            notify(
              `🚫 Information of ${name} has already been removed from server`,
              'error'
            );
          })
      : null;

  /************************************** ======= **************************************/
  /************************************** Helpers **************************************/
  /************************************** ======= **************************************/

  // Set filter with value from the input
  const handleFilterInput = (e) => setFilter(() => e.target.value);

  // Set newName with value from the input
  const handleNameInput = (e) => setNewName(e.target.value);

  // Set filterWith with value from the input
  const handleNumberInput = (e) => setNewNumber(e.target.value);

  // Return true if the person is already in the phonebook
  // const checkDuplicate = (person) =>
  // persons.map((pObj) => pObj.name).includes(person.name);

  // Return the person object if they're already in the phonebook, undefined otherwise
  const findDuplicate = (person) =>
    persons.find((pObj) => pObj.name === person.name);

  // Display alert with given name
  // const alertDuplicate = (name) =>
  //   alert(`${name} is already added to phonebook`);

  // Alert and prompt update confirmation
  // Call updatePerson with the updated inputted phone number ***
  const confirmUpdate = (person, newNumber) =>
    window.confirm(
      `🚨 ${person.name} is already added to phonebook, replace the old number with this new one?`
    )
      ? updatePerson({ ...person, number: newNumber })
      : null;

  // Update the existing person with new inputted phone number
  const updatePerson = (person) =>
    personService.update(person).then((updatedPerson) => {
      setPersons((prevPersons) =>
        prevPersons.map((p) => (p.id === person.id ? updatedPerson : p))
      );
      notify(`🆙 Updated ${updatedPerson.name}  with ${updatedPerson.number}`);
    });

  // Return lowercased and trimmed string
  const sanitizeString = (string) => string.toLowerCase().trim();

  // Array of persons used to display (filtered or unfiltered)
  // 🛠 Check that person actually exists first, otherwise return empty array to allow following .map's to work
  const toDisplay = persons
    ? persons.filter(
        (person) =>
          sanitizeString(person.name).indexOf(`${sanitizeString(filter)}`) !==
          -1
      )
    : [];

  // Clear previous notifications and notify user with a message and type
  const notify = (msg, type = 'success') => {
    clearTimeout(timeoutId);
    setNotificationType(type);
    setNotificationMsg(msg);
    setTimeoutId(
      setTimeout(() => {
        setNotificationType(null);
        setNotificationMsg(null);
      }, 5000)
    );
  };

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Notification type={notificationType} message={notificationMsg} />

      <Filter
        text="Filter by"
        filter={filter}
        handleInput={handleFilterInput}
      />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        name={newName}
        number={newNumber}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
      />

      <h3>Numbers</h3>
      {/* Show loading while trying to retrieve persons/contacts  */}
      {!persons.length ? (
        <em>．．．Connecting to server．．．</em>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Number</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <Persons
              persons={toDisplay}
              filter={filter}
              removePerson={removePerson}
              sanitizeString={sanitizeString}
            />
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
