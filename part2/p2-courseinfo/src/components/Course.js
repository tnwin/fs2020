import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

/**
 * Display the course and its information
 */
const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
