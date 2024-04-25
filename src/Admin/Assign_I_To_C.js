import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthUser } from "../helper/Storage";

function RegisterForm({ courses }) {
  const auth = getAuthUser();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState([]);

  const assignInstructor = (e) => {
    e.preventDefault();

    if (!selectedCourse || !instructorId) {
      console.error("Please select a course and enter instructor ID");
      return;
    }

    setLoading(true);
    setErr([]);

    axios
      .post(
        "http://localhost:4000/admin/AssignInstructor",
        {
          instructor_id: instructorId,
          name: selectedCourse,
        },
        {
          headers: {
            token: auth.token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        setLoading(false);
        setSelectedCourse("");
        setInstructorId("");
        console.log(resp.data);
        navigate("/AssigIns");
      })
      .catch((err) => {
        setLoading(false);
        setErr(["Something went wrong, please try again later!"]);
        console.error("Error assigning instructor:", err);
      });
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  return (
    <div>
      <Form
        onSubmit={assignInstructor}
        style={{ width: "500px" }}
        className="container"
      >
        <div className="heading">
          <h1>Assign</h1>
        </div>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={6}>
            <h6>Instructor ID</h6>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              value={instructorId}
              onChange={(e) => setInstructorId(e.target.value)}
              type="text"
              placeholder="Instructor ID"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={6}>
            <h6>Course Name</h6>
          </Form.Label>
          <Col sm={10}>
            <Form.Select value={selectedCourse} onChange={handleCourseChange}>
              <option>Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
        <br />
        <div className="mb-2">
          <Button
            className="btn btn-success"
            variant="primary"
            type="submit"
            disabled={loading || !selectedCourse || !instructorId}
          >
            Submit
          </Button>
          <br />
          <br />
          <Button variant="secondary" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}

const ShowCourses = () => {
  const [courses, setCourses] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

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
        console.error("Error fetching courses:", err);
      });
  }, []);

  return (
    <div style={{ background: "lightgray" }}>
      <div className="container">
        <br />
        <h1>Show Courses</h1>
        <br />
        <Table striped bordered hover size="lg">
          <thead style={{ background: "rgb(134, 212, 245)" }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Instructor</th>
            </tr>
          </thead>
          <tbody>
            {courses.results.map((course, key) => (
              <tr key={key} style={{ background: "white" }}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.instructor_id}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <br />
        <RegisterForm courses={courses.results} />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default ShowCourses;
