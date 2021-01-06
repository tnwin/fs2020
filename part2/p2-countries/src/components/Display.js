import React from "react";
import Country from "./Country";

/**
 * Conditionally display the countries given the filter
 */
const Display = ({ countries, show, toggleShowCountry }) => {
  /** Simpler implementation of displaying 2-10 countries */
  // const showCountry = (index) => {
  //   setShow((prevShow) => {
  //     const newShow = [...prevShow];
  //     newShow[index] = !newShow[index];
  //     return newShow;
  //   });
  // };

  // JSX to be return conditionally
  const display = () => {
    switch (true) {
      // Case still loading or no results were found
      case countries.length === 0:
        return <p>Loading．．．．．．or no results．．．．．．</p>;
      // Case the only country available
      case countries.length === 1: {
        return <Country country={countries[0]} />;
      }

      // Case 2-10
      case countries.length < 10:
        return countries.map((country, index) => (
          <React.Fragment key={country.alpha3Code}>
            <p>
              {country.name}{" "}
              <button onClick={() => toggleShowCountry(index)}>
                {show[index] ? "hide" : "show"}
              </button>
            </p>
            {show[index] ? <Country country={country} /> : null}
          </React.Fragment>
        ));

      /** Simpler implementation of displaying 2-10 countries */
      // case countries.length < 10:
      //   return countries.map((country, index) =>
      //     show[index] ? (
      //       <Country country={country} />
      //     ) : (
      //       <p key={country.alpha3Code}>
      //         {country.name}{" "}
      //         <button onClick={() => showCountry(index)}>show</button>
      //       </p>
      //     )
      //   );

      // Case >10
      default:
        return <p>Too many matches, specify another filter</p>;
    }
  };

  // Return conditional JSX above
  return display();
};

export default Display;
