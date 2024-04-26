import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { getAuthUser } from "../helper/Storage";
import { Schedule } from "../shared/schedule";

// const auth = getAuthUser();
var id = "";

const Heading = () => {
  return (
    <div className="heading">
      <h2>Your Registered Courses</h2>
    </div>
  );
};

const EnrolledStudents = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState({
    loading: true,
    results: [],
    err: null,
  });

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCourseName, setSelectedCourseName] = useState(""); // State to store selected course name

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/listCourse")
      .then((resp) => {
        setCourses({
          loading: false,
          results: resp.data || [],
          err: null,
        });
      })
      .catch((err) => {
        setCourses({
          loading: false,
          results: [],
          err: "Something went wrong, please try again later!",
        });
      });
  }, []);

  const [instructor, setInstructor] = useState({
    loading: false,
    results: [],
    err: null,
  });

  const listG = () => {
    setInstructor({ loading: true });
    axios
      .get(`http://localhost:4000/instructor/list/${selectedCourse}`, {
        // headers: {
        //   Authorization: `Bearer__${auth.token}`,
        //   "Content-Type": "application/json",
        // },
      })
      .then((resp) => {
        setInstructor({
          loading: false,
          results: resp.data || [],
          err: null,
        });
        console.log(resp);
      })
      .catch((err) => {
        setInstructor({
          loading: false,
          results: [],
          err: "Something went wrong, please try again later!",
        });
      });
  };

  const handleCourseChange = (event) => {
    const selectedCourseId = event.target.value;
    const selectedCourseName =
      event.target.options[event.target.selectedIndex].text; // Extract course name from selected option
    setSelectedCourse(selectedCourseId);
    setSelectedCourseName(selectedCourseName);
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

        <>
          <div>
            <Table striped bordered hover size="lg">
              <thead style={{ background: "rgb(134, 212, 245)" }}>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Course</th>
                </tr>
              </thead>

              {instructor.loading ? (
                <tr>
                  <td colSpan="3">Loading...</td>
                </tr>
              ) : instructor.results.length === 0 ? (
                <tr>
                  <td colSpan="3">No data available</td>
                </tr>
              ) : (
                instructor.results.map((inst, key) => (
                  <tr key={key} style={{ background: "white" }}>
                    <td>{inst.id}</td>
                    <td>{inst.student_name}</td>
                    <td>{selectedCourseName || "No course selected"}</td>
                  </tr>
                ))
              )}
            </Table>
          </div>
        </>

        <div>
          <Form>
            <Form.Group controlId="courseSelect">
              <Form.Label>COURSE NAME:</Form.Label>
              <Form.Select value={selectedCourse} onChange={handleCourseChange}>
                <option value="">Select a course</option>
                {Array.isArray(courses.results) && courses.results.map((course) => (
  <option key={course.id} value={course.id}>
    {course.name}
  </option>
))}

              </Form.Select>
            </Form.Group>
            <Button
              className="btn btn-dark w-100"
              variant="primary"
              onClick={listG}
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
