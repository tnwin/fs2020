import React, { useState, useEffect } from "react";
import Notification from "./Notification";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

/**
 * Display the weather information for the query city
 */
const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [notification, setNotification] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  // const [notificationTimer, setNotificationTimer] = useState(60);
  // const [timerOn, setTimerOn] = useState(false);

  const weatherUrl = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`;

  useEffect(
    () =>
      axios
        .get(weatherUrl)
        .then((res) => {
          setNotification(null);
          setWeather({
            temperature: `${res.data.current.temperature} °C`,
            weather_icon: `${res.data.current.weather_icons[0]}`,
            wind: `${res.data.current.wind_speed}  mph direction ${res.data.current.wind_dir}`,
          });
          // setNotificationTimer(60);
          // setTimerOn(true);
        })
        .catch((e) => {
          console.log("Error requesting weather", e);
          console.log(
            "Wait 60 seconds from your last successful weather call."
          );
          notify(
            "Please wait 60 seconds from your last successful weather request."
          );
        }),
    [weatherUrl]
  );

  // Clear previous notifications and notify user with a message and type
  const notify = (msg) => {
    clearTimeout(timeoutId);
    setNotification(msg);
    setTimeoutId(
      setTimeout(() => {
        setNotification(null);
      }, 5000)
    );
  };

  // useEffect(() => {
  //   if (timerOn && notificationTimer > 0) {
  //     setTimeout(() => setNotificationTimer((prevTime) => prevTime - 1), 1000);
  //     console.log(notificationTimer);
  //   } else if (notificationTimer === 0) {
  //     setTimerOn(false);
  //   }
  // }, [notificationTimer, timerOn]);

  return (
    <div>
      {!weather ? (
        <>
          {notification ? (
            <Notification notification={notification} />
          ) : (
            <h5>Waiting．．．．．．</h5>
          )}
        </>
      ) : (
        <>
          <p>
            <strong>temperature: </strong>
            {weather.temperature}
          </p>
          <img
            src={weather.weather_icon}
            alt={`Current weather icon of ${city}`}
          />
          <p>
            <strong>wind: </strong>
            {weather.wind}
          </p>
        </>
      )}
    </div>
  );
};

export default Weather;
