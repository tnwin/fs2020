import React from 'react';

/**
 * Form component to add name and number
 */
const PersonForm = ({
  addPerson,
  name,
  number,
  handleNameInput,
  handleNumberInput,
}) => (
  <form onSubmit={addPerson}>
    <table>
      <tbody>
        <tr>
          <td>Name:</td>
          <td>
            <input
              value={name}
              onChange={handleNameInput}
              placeholder="New name or update"
              required
              maxLength="30"
            />
          </td>
        </tr>
        <tr>
          <td>Number:</td>
          <td>
            <input
              value={number}
              onChange={handleNumberInput}
              placeholder="+358 (0) 2941 911"
              pattern="^[+]{0,1}[(\)\-\s\./0-9]*$"
              maxLength="30"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
