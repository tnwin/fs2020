import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Display from "./components/Display";
import Filter from "./components/Filter";

const App = () => {
  const [filter, setFilter] = useState("");
  const [show, setShow] = useState(new Array(10).fill(false));
  const [countries, setCountries] = useState([]);
  const [notification, setNotification] = useState(null);
  // const [notificationType, setNotificationType] = useState(null)
  const [notificationTimer, setNotificationTimer] = useState();

  const countriesUrl = "https://restcountries.eu/rest/v2/all";

  //
  useEffect(
    () =>
      axios.get(countriesUrl).then(({ data }) => getFilteredCountries(data)),
    [filter]
  );

  // Handle the filter input and reset the showing array
  const handleFilterInput = (e) => {
    setFilter(e.target.value.trim());
    setShow(new Array(10).fill(false));
  };

  // Toggle the country to be shown or hidden
  const toggleShowCountry = (index) =>
    setShow(Object.assign([], show, { [index]: !show[index] }));

  // Get the countries that are being requested by the filtered
  const getFilteredCountries = (data) =>
    setCountries(
      data.filter(
        (country) =>
          sanitizeStr(country.name).indexOf(`${sanitizeStr(filter)}`) !== -1
      )
    );

  // Return lowercased and trimmed string
  const sanitizeStr = (str) => str.toLowerCase().trim();

  return (
    <div>
      <Filter text="find countries" handleInput={handleFilterInput} />
      <Display
        countries={countries}
        show={show}
        setShow={setShow}
        toggleShowCountry={toggleShowCountry}
      />
    </div>
  );
};

export default App;
