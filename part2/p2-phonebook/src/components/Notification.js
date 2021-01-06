import React from "react";
import "../index.css";

const Notification = ({ type, message }) => (
  <div className={type}>{message}</div>
);

export default Notification;
