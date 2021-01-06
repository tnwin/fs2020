import React from "react";
import Weather from "./Weather";

/**
 * Display a single country with its details and weather
 */
const Country = ({
  country: { name, capital, population, languages, flag },
}) => (
  <div>
    {/* Country */}
    <h2>{name}</h2>
    <p>capital {capital}</p>
    <p>population {population.toLocaleString("en")}</p>

    {/* Languages */}
    <h3>Spoken languages</h3>
    <ul>
      {languages.map((lang) => (
        <li key={lang.iso639_2}>{lang.name}</li>
      ))}
    </ul>

    {/* Flag Image */}
    <img src={flag} alt={`Flag of ${name}`} height="100px" />

    {/* Weather */}
    <h3>Weather in {capital}</h3>
    <Weather city={capital} />

    <hr />
  </div>
);

export default Country;
