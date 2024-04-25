import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import axios from "axios";
import { Schedule } from "../shared/schedule";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";
const auth = getAuthUser();
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
  const [data, setData] = useState({
    id: id,
  });
  function getData(val) {
    setData(val.target.value);
    id = val.target.value;

    console.warn(val.target.value);
  }

  console.log("id:" + id);

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
      .get(`http://localhost:4000/instructor/list/${id}`,{
        headers: {
          authorization:`Bearer__${auth.token}`,
          "Content-Type": "application/json",
        },
      }
)

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

              {instructor.results.map((inst, key) => {
                return (
                  <tr key={key} style={{ background: "white" }}>
                    <td>{inst.id}</td>
                    <td>{inst.student_name}</td>
                    <td>{inst.course_name}</td>
                  </tr>
                );
              })}
            </Table>
          </div>
        </>

        <div>
          <form
         
          >
            <h1>COURSE NAME:</h1>
            <br></br>
            <input
              style={{ borderRadius: "10px" }}
              type="text"
              onChange={getData}
            ></input>
            <br></br>
            <br></br>
            <Button
              className="btn btn-dark w-100"
              variant="primary"
          
              onClick={listG}
            >
              submit
            </Button>
          </form>
        </div>

        <div className="g-3 p-5">
          <Schedule />
        </div>
        <div></div>
      </div>
    </div>
  );
};


export default EnrolledStudents;
