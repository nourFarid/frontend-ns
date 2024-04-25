import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Schedule } from "../shared/schedule";

const Heading = () => {
  return (
    <div className="heading">
      <h2>Your Registered Courses</h2>
    </div>
  );
};

const EnrolledStudents = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [instructor, setInstructor] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  const listG = () => {
    setInstructor({ ...instructor, loading: true });
    console.log("!!!!!!!!!!!!!!!!!!!!!!!");
    axios
      .get(`http://localhost:4000/instructor/list/${selectedCourse}`, {})
      .then((resp) => {
        console.log(resp);
        console.log("1!!!!!!!!!!!!!!!!!!1");
        setInstructor({
          ...instructor,
          results: resp.data,
          err: null,
        });
      })
      .catch((err) => {
        setInstructor({
          ...instructor,
          err: " something went wrong, please try again later ! ",
        });
      });
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(238,174,202,1) 14%, rgba(148,187,233,1) 42%)",
      }}
    >
      <div className="container bn-3 p-3">
        <Heading />
        <div className=" p-3"></div>

        <div>
          <Table striped bordered hover size="lg">
            <thead style={{ background: "rgb(134, 212, 245)" }}>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Course</th>
              </tr>
            </thead>

            <tbody>
              {instructor.results.map((inst, key) => {
                return (
                  <tr key={key} style={{ background: "white" }}>
                    <td>{inst.id}</td>
                    <td>{inst.student_name}</td>
                    <td>{inst.course_name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        <div>
          <Form>
            <h1>COURSE NAME:</h1>
            <br />
            <Form.Select
              style={{ borderRadius: "10px" }}
              onChange={handleCourseChange}
            >
              <option value="">Select Course</option>
              {/* Assuming you have a list of courses */}
              <option value="course1">Course 1</option>
              <option value="course2">Course 2</option>
              {/* Add more options as needed */}
            </Form.Select>
            <br />
            <br />
            <Button
              className="btn btn-dark w-100"
              variant="primary"
              onClick={listG}
              disabled={!selectedCourse}
            >
              Submit
            </Button>
          </Form>
        </div>

        <div className="g-3 p-5">
          <Schedule />
        </div>
      </div>
    </div>
  );
};

export default EnrolledStudents;
