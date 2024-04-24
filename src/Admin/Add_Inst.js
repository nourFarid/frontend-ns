import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
//import Alert from "react-bootstrap/Alert";
//import Spinner from "react-bootstrap/Spinner";

// import { getAuthUser } from "../helper/storage";

// import React from "react";
//import { CourseDetails } from "../database";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { setAuthUser, getAuthUser } from "../helper/Storage";

function RegisterForm() {
  const navigate = useNavigate();
  const auth = getAuthUser();
  const [inst, setInst] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    err: [],
    loading: false,
    reload: 0,
  });

  const createInstructor = (e) => {
    e.preventDefault();

    setInst({ ...inst, loading: true, err: [] });

    axios
      .post(
        "http://localhost:4000/admin/createInstructor",
        {
          email: inst.email,
          password: inst.password,
          name: inst.name,
          phone: inst.phone,
          role: inst.role,
        },
        {
          headers: {
            token: auth.token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        setInst({
          ...inst,
          email: "",
          password: "",
          name: "",
          phone: "",
          role: "",
          loading: false,
          err: [],
        });
        // setAuthUser(resp.data);
        // navigate("/");
      }, navigate("/Add_Instructor"))
      .catch((err) => {
        setInst({
          ...inst,
          loading: false,

          err: "Something went wrong, please try again later !",
          // err: errors.response.data.errors,
        });
      });
  };

  return (
    <div
    // style={{ alignItems: "center" }}
    >
      <Form
        onSubmit={createInstructor}
        style={{ width: " 500%" }}
        className="container"
      >
        <div className="heading">
          <h1>Add</h1>
          <p>
            NOTE : To update enter the ID and the updated information in it's
            right places
          </p>
        </div>
        <Form.Group as={Row} className="mb-3">
          {/* <Form.Label column sm={6}> */}
          {/* <h6>ID</h6>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              value={inst.id}
              onChange={(e) => {
                setInst({ ...inst, id: e.target.value });
              }}
              type="text"
              placeholder="Instructor ID"
            />
          </Col> */}
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={6}>
            <h6>Name</h6>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              value={inst.name}
              onChange={(e) => {
                setInst({ ...inst, name: e.target.value });
              }}
              type="text"
              placeholder="Instructor Name"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={6}>
            <h6>Email</h6>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              value={inst.email}
              onChange={(e) => {
                setInst({ ...inst, email: e.target.value });
              }}
              type="text"
              placeholder="Instructor Email"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={6}>
            <h6>Password</h6>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              value={inst.password}
              onChange={(e) => {
                setInst({ ...inst, password: e.target.value });
              }}
              type="text"
              placeholder="Instructor Password"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={6}>
            <h6>Phone</h6>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              value={inst.phone}
              onChange={(e) => {
                setInst({ ...inst, phone: e.target.value });
              }}
              type="text"
              placeholder="Instructor phone"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          {/* <Form.Label column sm={6}> */}
          {/* <h6>Status</h6>
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Instructor Status" />
          </Col> */}
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          {/* <Form.Label column sm={6}>
            <h6>role</h6>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              value={inst.role}
              onChange={(e) => {
                setInst({ ...inst, role: e.target.value });
              }}
              type="text"
              placeholder="Instructor role"
            />
          </Col> */}
        </Form.Group>
        <br></br>
        <div className="mb-2">
          <Button
            className="btn btn-success"
            variant="primary"
            type="submit"
            disabled={inst.loading === true}
            onClick={() => {
              window.location.reload(true);
            }}
          >
            submit
          </Button>

          <br />
          <br />
          <Button variant="secondary" onClick={() => navigate("/")}>
            Cancel
          </Button>

          <br />
          <br />

          <button
            class="btn btn-danger"
            variant="primary"
            onClick={() => navigate("/Delete_Instructor")}
          >
            Delete
          </button>

          {/* <button class="btn btn-danger">Click me (danger)</button> */}
          <br />
          <br />

          <Button
            variant="primary"
            onClick={() => navigate("/Update_Instructor")}
          >
            Update
          </Button>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </Form>
    </div>
  );
}
const ShowInstructors = () => {
  const [instructor, setInstructor] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setInstructor({ ...instructor, loading: true });

    axios
      .get("http://localhost:4000/admin/listInstructor")

      .then((resp) => {
        console.log(resp);

        setInstructor({
          ...instructor,
          results: resp.data,
          loading: false,
          err: null,
        });
      })
      .catch((err) => {
        setInstructor({
          ...instructor,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [instructor.reload]);
  return (
    <div style={{ background: "lightgray" }}>
      <div className="container">
        <br />
        <h1>Show Instructors</h1>
        <br />
        <Table striped bordered hover size="lg">
          <thead style={{ background: "rgb(134, 212, 245)" }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              {/* <th>Password</th> */}
              <th>Phone</th>
              <th>Status</th>
              {/* <th>Token</th> */}
              {/* <th>Role</th> */}
            </tr>
          </thead>
          {instructor.results.map((Instructors, key) => {
            return (
              <tr key={key} style={{ background: "white" }}>
                <td>{Instructors.id}</td>
                <td>{Instructors.name}</td>
                <td>{Instructors.email}</td>
                <td>{Instructors.phone}</td>
                <td>{Instructors.status}</td>
                {/* <td>{Instructors.token}</td> */}
                {/* <td>{Instructors.role}</td> */}
                {/* <td>{Instructors.Password}</td> */}
              </tr>
            );
          })}
          <br />
          <RegisterForm> </RegisterForm>
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

export default ShowInstructors;
