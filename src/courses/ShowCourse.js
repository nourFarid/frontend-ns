import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import axios from "axios";
//import Spinner from 'react-bootstrap/Spinner';
//import Alert from 'react-bootstrap/Alert';
import { Schedule } from "../shared/schedule";
//import { useParams } from 'react-router-dom';
//import { getAuthUser } from '../helper/Storage';
//import Col from 'react-bootstrap/Col';
//import Form from 'react-bootstrap/Form';
//import Row from 'react-bootstrap/Row';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";
//import Col from "react-bootstrap/Col";

var id = "";

const Heading = () => {
  return (
    <div className="heading">
      <h2>Your Registered Courses</h2>
    </div>
  );
};

const ShowCourse = () => {
  // const token = 'c8dcbae90fa60d2a48b3a071a5749528' ;
  // const headers = {
  //     'token': token };
  //let { id } = useParams();
  //const auth = getAuthUser();
  // const [gradess, setgradess] = useState({
  //   studentID: '',
  //   loading: true,
  //   results:null,
  //   error :null,
  // });

  // useEffect ( () => {
  //   setgradess({...gradess , loading:true});
  //   axios
  //   .get("http://localhost:4000/student/listgradess" ,
  //   {
  //     studentID: gradess.studentID
  //   }
  //   )

  //   .then( (res) => {
  //     console.log(res);
  //     setgradess({...gradess ,results: res.data , loading:false , error:null});
  //   })
  //   .catch((error) => {
  //     setgradess({...gradess , loading:false , error:"No gradess available" ,});
  //   });
  //   }, []);
  const navigate = useNavigate();
  const auth = getAuthUser();
  // const [data, setData] = useState({
  //   id: "",
  // });
  // function getData(val) {
  //   setData(val.target.value);
  //   id = val.target.value;

  //   console.warn(val.target.value);
  //   // id=val.target.value
  // }

  // console.log("id:" + id);

  // const [grades, setgrades] = useState({
  //   // loading: true,
  //   results: [],
  //   // err: null,
  //   // reload: 0,
  // });

  // const listG = () => {
  //   setgrades({ ...grades, loading: true });
  //   console.log("!!!!!!!!!!!!!!!!!!!!!!!");
  //   axios
  //     .get(`http://localhost:4000/student/listgradess/${id}`, {})

  //     .then((resp) => {
  //       console.log(resp);
  //       console.log("1!!!!!!!!!!!!!!!!!!1");
  //       setgrades({
  //         ...grades,
  //         results: resp.data,
  //         // loading: false,
  //         // err: null,
  //       });
  //     })
  //     .catch((err) => {
  //       setgrades({
  //         ...grades,
  //         // loading: false,
  //         err: " something went wrong, please try again later ! ",
  //       });
  //     });
  // };

  const [grades, setcourses] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
console.log('====================================');
console.log(auth.id);
console.log('====================================');
  useEffect(() => {
    setcourses({ ...grades, loading: true });
    console.log("!!!!!!!!!!!!!!!!!!!!!!!");
    axios
      .get(`http://localhost:4000/student/listGrades/${auth.id}`)

      .then((resp) => {
        console.log(resp);
        console.log("1!!!!!!!!!!!!!!!!!!1");
        setcourses({
          ...grades,
          results: resp.data,
          loading: false,
          err: null,
        });
      })
      .catch((err) => {
        setcourses({
          ...grades,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, []);
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(238,174,202,1) 14%, rgba(148,187,233,1) 42%)",
      }}
    >
      <div className="container bn-3 p-3">
        <Heading />
        {/* <Form 
    //  onSubmit={creategrades}
     >
      <Form.Group as={Row} className="mb-3 ">
      <label>Student ID</label>
        {/* <Form.Label column sm={2} >
          <h6>Student ID</h6>
        </Form.Label> */}

        {/* <Form.Control type="text" placeholder="Student ID"
            value={grades.studentID} onChange ={(e) => setgrades({...grades,studentID:e.target.value})} 
             required/>
      </Form.Group> */}

        {/* <Button 
      variant="primary" size="lg" type='submit' >Search ID</Button>
      </Form> */}
        <div className=" p-3"></div>
        {/* { gradess.loading === true && (
        <Spinner animation="border" />
      )} */}

        <>
          <div>
            <Table striped bordered hover size="lg">
              <thead style={{ background: "rgb(134, 212, 245)" }}>
                <tr>
                  {/* <th>studentID</th> */}
                  <th>Course ID</th>
                  <th>grades</th>
                </tr>
              </thead>
              {/* <td>test</td>
      <td>test</td>
      <td>test</td> */}
              {grades.results.map((inst, key) => {
                return (
                  <tr key={key} style={{ background: "white" }}>
                    {/* <td>{inst.studentID}</td> */}
                    <td>{inst.courseID}</td>
                    <td>{inst.grades}</td>

                    {/* <td>{gradess.token}</td> */}
                    {/* <td>{gradess.role}</td> */}
                    {/* <td>{gradess.Password}</td> */}
                  </tr>
                );
              })}
            </Table>
          </div>
        </>

        <div>
          {/* <Form
      
        style={{ width: " 500%" }}
        className="container"
      >
  <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={6}>
            <h6>Name</h6>
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              // value={inst.name}
              // onChange={(e) => {
              //   setInst({ ...inst, name: e.target.value });
              // }}
              type="text"
              placeholder="grades Name"
            />
          </Col>
        </Form.Group>

<Button variant="secondary" size="lg" onClick={() => navigate("/")}>
            ID
          </Button>
        </Form> */}
          <form
          // onSubmit={listG}
          >
            {/* <h1>ID</h1>
            <input
              type="text"
              // onChange={getData}
            ></input>
            <Button
              className="btn btn-dark w-100"
              variant="primary"
              // type="submit"
              // disabled={inst.loading === true}
              // onClick={listG}
            >
              submit
            </Button> */}
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
// console.log(id);
console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIi");

export default ShowCourse;
