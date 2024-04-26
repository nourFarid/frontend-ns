import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

function AssignGrades() {
  const [grades, setGrades] = useState({
    grade: "",
    studentID: "",
    courseID: "", // Changed to courseID
    err: [],
    loading: false,
  });
  const [courses, setCourses] = useState({
    selectedCourse: "", // New state to store the selected course
    results: [],
    err: [],
    loading: false,
  });
  const [courseNames, setCourseNames] = useState([]); // State to store course names

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/listCourse")
      .then((resp) => {
        setCourses({
          ...courses,
          results: resp.data,
          loading: false,
          err: null,
        });
      })
      .catch((err) => {
        setCourses({
          ...courses,
          loading: false,
          err: "Something went wrong, please try again later!",
        });
      });
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    setGrades({ ...grades, loading: true, err: [] });
    console.log(grades);
    axios
      .post(
        "http://localhost:4000/instructor/assignGrades",
        {
          grade: grades.grade,
          studentID: grades.studentID,
          courseID: grades.courseID, // Changed to courseID
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setGrades({ ...grades, loading: false, err: [] });
      })
      .catch((err) => {
        setGrades({ ...grades, loading: false, err: "No grades available" });
      });
  };

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    const correspondingCourse = courses.results.find(
      (course) => course.name === selectedCourse
    );
    if (correspondingCourse) {
      setGrades({ ...grades, courseID: correspondingCourse.id });
    }
  };

  return (
    <div style={{ backgroundImage: `url("e-learning.jpg")` }}>
      <Form
        style={{ width: " 50%" }}
        className="container  g-4 p-5"
        onSubmit={handleRegister}
      >
        <div className="heading">
          <h1>Assign Grades</h1>
        </div>
        <Alert variant="warning">Enter the grade of your students</Alert>
        <Form.Group className="mb-3">
          <Form.Label>
            <h5>Choose Semester</h5>
          </Form.Label>
          <Form.Select>
            <option>select</option>
            <option>Winter 2022</option>
            <option>Fall 2023</option>
            <option>Summer 2022</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 ">
          <Form.Label column sm={2}>
            <h5>Student ID</h5>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Student ID"
              value={grades.studentID}
              onChange={(e) =>
                setGrades({ ...grades, studentID: e.target.value })
              }
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            <h5>Course Name</h5>
          </Form.Label>
          <Col sm={10}>
            <Form.Select
              value={courses.selectedCourse}
              onChange={(e) => {
                setCourses({ ...courses, selectedCourse: e.target.value });
                handleCourseChange(e); // Update courseID when course name changes
              }}
            >
              <option value="">Select a course</option>
              {courses.results.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 ">
          <Form.Label column sm={2}>
            <h5>Grade</h5>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Grade"
              value={grades.grade}
              onChange={(e) => setGrades({ ...grades, grade: e.target.value })}
              required
            />
          </Col>
        </Form.Group>
        <div className="mb-2">
          <Button
            variant="primary"
            size="lg"
            type="submit"
            onClick={() => {
              // setTimeout(() => {
              //   // window.location.reload(true);
              // }, 2000); // Wait for 2 seconds before reloading
            }}
          >
            Register
          </Button>
          <div className=" p-3"></div>
          <Button variant="secondary" size="lg">
            Cancel
          </Button>
          <div className=" p-5"></div>
        </div>
      </Form>
    </div>
  );
}

export default AssignGrades;
