import React from "react";
import "../index.css";

const Notification = ({ notification }) =>
  notification ? <div className="error">{notification}</div> : null;
export default Notification;
