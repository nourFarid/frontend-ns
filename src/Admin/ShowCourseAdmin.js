import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthUser } from "../helper/Storage";
import CryptoJS from "crypto-js";
const auth = getAuthUser();
function RegisterForm() {
  const navigate = useNavigate();
  const [courses, setcourses] = useState({
    selectedCourse: "", // Store the selected course
    results: [],
    loading: true,
    err: null,
  });

  useEffect(() => {
    axios
      .post(
        "http://localhost:4000/admin/create",
        {
          name: courses.name,
        },
        {
          headers: {
            authorization: `Bearer__${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        setcourses({
          ...courses,
          results: resp.data,
          loading: false,
          err: null,
        });

        navigate("/manageCourse");
      }, navigate("/manageCourse"))
      .catch((err) => {
        setcourses({
          ...courses,
          loading: false,
          err: "Something went wrong, please try again later!",
        });
      });
  }, []);

  const handleChange = (e) => {
    setcourses({ ...courses, selectedCourse: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic here to handle the selected course
    console.log("Selected Course:", courses.selectedCourse);
    // Redirect or perform any other action
    navigate("/manageCourse");
  };

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        style={{ width: "500px" }}
        className="container"
      >
        <div className="heading">
          <h1>ADD </h1>
        </div>
        <Form.Group as={Row} className="mb-3"></Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={6}>
            <h6>Course Name</h6>
          </Form.Label>
          <Col sm={10}>
            <Form.Select value={courses.selectedCourse} onChange={handleChange}>
              <option value="">Select Course</option>
              {courses.results.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3"></Form.Group>
        <br></br>
        <div className="mb-2">
          <Button
            className="btn btn-success"
            variant="primary"
            type="submit"
            disabled={courses.loading === true}
            onClick={() => {
              setTimeout(() => {
                window.location.reload(true);
              }, 2000); // Wait for 3 seconds (3000 milliseconds)
            }}
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
  const [courses, setcourses] = useState({
    loading: true,
    results: [],
    err: null,
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/listCourse", {
        headers: {
          authorization: `Bearer__${auth.token}`,
          "Content-Type": "application/json",
        },
      })

      .then((resp) => {
        setcourses({
          ...courses,
          results: resp.data,
          loading: false,
          err: null,
        });
        console.log("====================================");
        console.log(resp.data);
        console.log("====================================");
      })
      .catch((err) => {
        setcourses({
          ...courses,
          loading: false,
          err: "Something went wrong, please try again later!",
        });
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
          {courses.results.map((Course, key) => {
            return (
              <tr key={key} style={{ background: "white" }}>
                <td>{Course.id}</td>
                <td>{Course.name}</td>
                <td>{Course.instructor_id}</td>
              </tr>
            );
          })}
          <br />
          <RegisterForm />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Table>
      </div>
    </div>
  );
};

export default ShowCourses;
