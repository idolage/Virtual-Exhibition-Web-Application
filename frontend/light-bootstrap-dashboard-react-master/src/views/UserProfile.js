import React , { useState, useEffect }  from "react";
import Axios from "axios";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const Admin = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nic, setNIC] = useState('');
  const [tel, setTel] = useState("");
  const [pwd, setPwd] = useState('');
  const [rePwd, setRePwd] = useState('');
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = React.useState(false);

  function updateAdmin(e) {
    e.preventDefault();
    if(pwd==rePwd){
      const storedEmail = localStorage.getItem('email');
      Axios.put(`http://localhost:8080/api/auth/updateAdmin/${storedEmail}`, {
        emailAddress: email,
        name: name,
        contactNo: tel,
        nic: nic,
        password: pwd,
      }).then((res) => {
        console.log(res.data);
        setShowModal(true);
        setNotification(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    }
    else{
      setShowModal(true);
      setNotification("Passwords do not match!");
    }
  }
  
  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const storedEmail = localStorage.getItem('email');
        const response = await Axios.get(`http://localhost:8080/api/auth/getAdmin/${storedEmail}`);
        setEmail(response.data.emailAddress);
        setName(response.data.name);
        setNIC(response.data.nic);
        setTel(response.data.contactNo);
      } 
      catch(e){console.error(e);};
    };
    fetchAdminDetails();
  },[]);
  
  return (
    <>
      <Form>
        <Row>
          <Col md="12">
            <Form.Group>
              <label>Email</label>
              <Form.Control
                defaultValue={email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Form.Group>
              <label>Name</label>
              <Form.Control
                defaultValue={name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Form.Group>
              <label>Contact No</label>
              <Form.Control
                defaultValue={tel}
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                type="text"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Form.Group>
              <label>NIC</label>
              <Form.Control
                defaultValue={nic}
                value={nic}
                onChange={(e) => setNIC(e.target.value)}
                type="text"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <Form.Group>
              <label>Password</label>
              <Form.Control
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                type="password"
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group>
              <label>Re-enter password</label>
              <Form.Control
                value={rePwd}
                onChange={(e) => setRePwd(e.target.value)}
                type="password"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        
        <Button className="btn-fill pull-right" type="submit" variant="info" onClick={(e)=>updateAdmin(e)}>
          Update 
        </Button>
        <div className="clearfix"></div>
      </Form>
    </>
  );
};

const Attendee = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nic, setNIC] = useState('');
  const [pwd, setPwd] = useState('');
  const [rePwd, setRePwd] = useState('');
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  
  function updateAttendee(e) {
    e.preventDefault();
    if(pwd==rePwd){
      const storedEmail = localStorage.getItem('email');
      Axios.put(`http://localhost:8080/api/auth/updateAttendee/${storedEmail}`, {
        emailAddress: email,
        name: name,
        nic: nic,
        password: pwd,
      }).then((res) => {
        console.log(res.data);
        setShowModal(true);
        setNotification(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    }
    else{
      setShowModal(true);
      setNotification("Passwords do not match!");
    }
  }
  
  useEffect(() => {
    const fetchAttendeeDetails = async () => {
      try {
        const storedEmail = localStorage.getItem('email');
        const response = await Axios.get(`http://localhost:8080/api/auth/getAttendee/${storedEmail}`);
        setEmail(response.data.emailAddress);
        setName(response.data.name);
        setNIC(response.data.nic);
      } 
      catch(e){console.error(e);};
    };
    fetchAttendeeDetails();
  },[]);
  
  return (
    <>
      <Form>
        <Row>
          <Col md="12">
            <Form.Group>
              <label>Email</label>
              <Form.Control
                defaultValue={email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Form.Group>
              <label>Name</label>
              <Form.Control
                defaultValue={name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Form.Group>
              <label>NIC</label>
              <Form.Control
                defaultValue={nic}
                value={nic}
                onChange={(e) => setNIC(e.target.value)}
                type="text"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <Form.Group>
              <label>Password</label>
              <Form.Control
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                type="password"
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group>
              <label>Re-enter password</label>
              <Form.Control
                value={rePwd}
                onChange={(e) => setRePwd(e.target.value)}
                type="password"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        
        <Button className="btn-fill pull-right" type="submit" variant="info" onClick={(e)=>updateAttendee(e)}>
          Update 
        </Button>
        <div className="clearfix"></div>
      </Form>
    </>
  );
};

const Exhibitor = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nic, setNIC] = useState('');
  const [tel, setTel] = useState("");
  const [pwd, setPwd] = useState('');
  const [rePwd, setRePwd] = useState('');
  const [company, setCompany] = useState("");
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = React.useState(false);

  function updateExhibitor(e) {
    e.preventDefault();
    if(pwd==rePwd){
      const storedEmail = localStorage.getItem('email');
      Axios.put(`http://localhost:8080/api/auth/updateExhibitor/${storedEmail}`, {
        emailAddress: email,
        name: name,
        contactNo: tel,
        nic: nic,
        password: pwd,
        company:company
      }).then((res) => {
        console.log(res.data);
        setShowModal(true);
        setNotification(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    }
    else{
      setShowModal(true);
      setNotification("Passwords do not match!");
    }
  }
  
  useEffect(() => {
    const fetchExhibitorDetails = async () => {
      try {
        const storedEmail = localStorage.getItem('email');
        const response = await Axios.get(`http://localhost:8080/api/auth/getExhibitor/${storedEmail}`);
        setEmail(response.data.emailAddress);
        setName(response.data.name);
        setNIC(response.data.nic);
        setTel(response.data.contactNo);
        setCompany(response.data.company)
      } 
      catch(e){console.error(e);};
    };
    fetchExhibitorDetails();
  },[]);
  
  return (
    <>
      <Form>
        <Row>
          <Col md="12">
            <Form.Group>
              <label>Email</label>
              <Form.Control
                defaultValue={email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Form.Group>
              <label>Name</label>
              <Form.Control
                defaultValue={name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Form.Group>
              <label>Contact No</label>
              <Form.Control
                defaultValue={tel}
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                type="text"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Form.Group>
              <label>NIC</label>
              <Form.Control
                defaultValue={nic}
                value={nic}
                onChange={(e) => setNIC(e.target.value)}
                type="text"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Form.Group>
              <label>Company name</label>
              <Form.Control
                defaultValue={company}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                type="text"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <Form.Group>
              <label>Password</label>
              <Form.Control
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                type="password"
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group>
              <label>Re-enter password</label>
              <Form.Control
                value={rePwd}
                onChange={(e) => setRePwd(e.target.value)}
                type="password"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        
        <Button className="btn-fill pull-right" type="submit" variant="info" onClick={(e)=>updateExhibitor(e)}>
          Update 
        </Button>
        <div className="clearfix"></div>
      </Form>
    </>
  );
};

const ExhibitionOwner = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nic, setNIC] = useState('');
  const [tel, setTel] = useState("");
  const [pwd, setPwd] = useState('');
  const [rePwd, setRePwd] = useState('');
  const [company, setCompany] = useState("");
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = React.useState(false);

  function updateExhibitionOwner(e) {
    e.preventDefault();
    if(pwd==rePwd){
      const storedEmail = localStorage.getItem('email');
      Axios.put(`http://localhost:8080/api/auth/updateExhibitionOwner/${storedEmail}`, {
        emailAddress: email,
        name: name,
        contactNo: tel,
        nic: nic,
        password: pwd,
        company:company
      }).then((res) => {
        console.log(res.data);
        setShowModal(true);
        setNotification(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    }
    else{
      setShowModal(true);
      setNotification("Passwords do not match!");
    }
  }
  
  useEffect(() => {
    const fetchExhibitionOwnerDetails = async () => {
      try {
        const storedEmail = localStorage.getItem('email');
        const response = await Axios.get(`http://localhost:8080/api/auth/getExhibitionOwner/${storedEmail}`);
        setEmail(response.data.emailAddress);
        setName(response.data.name);
        setNIC(response.data.nic);
        setTel(response.data.contactNo);
        setCompany(response.data.company)
      } 
      catch(e){console.error(e);};
    };
    fetchExhibitionOwnerDetails();
  },[]);
  
  return (
    <>
      <Form>
        <Row>
          <Col md="12">
            <Form.Group>
              <label>Email</label>
              <Form.Control
                defaultValue={email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Form.Group>
              <label>Name</label>
              <Form.Control
                defaultValue={name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Form.Group>
              <label>Contact No</label>
              <Form.Control
                defaultValue={tel}
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                type="text"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Form.Group>
              <label>NIC</label>
              <Form.Control
                defaultValue={nic}
                value={nic}
                onChange={(e) => setNIC(e.target.value)}
                type="text"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Form.Group>
              <label>Company name</label>
              <Form.Control
                defaultValue={company}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                type="text"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <Form.Group>
              <label>Password</label>
              <Form.Control
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                type="password"
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group>
              <label>Re-enter password</label>
              <Form.Control
                value={rePwd}
                onChange={(e) => setRePwd(e.target.value)}
                type="password"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        
        <Button className="btn-fill pull-right" type="submit" variant="info" onClick={(e)=>updateExhibitionOwner(e)}>
          Update 
        </Button>
        <div className="clearfix"></div>
      </Form>
    </>
  );
};

const Other = () => {
  return <p>Please log in first</p>;
};

const Profile = () => {
  const userRole = localStorage.getItem("userRole");
  if (userRole === "ATTENDEE") {
    return (
      <div>
        <Attendee />
      </div>
    );
  }

  if (userRole === "EX_OWNER") {
    return (
      <div>
        <ExhibitionOwner />
      </div>
    );
  }

  if (userRole === "EXHIBITOR") {
    return (
      <div>
        <Exhibitor />
      </div>
    );
  }

  if (userRole === "ADMIN") {
    return (
      <div>
        <Admin />
      </div>
    );
  }

  return (
    <div>
      <Other />
    </div>
  );
};

function User() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Profile />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;

{
  /* <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-3.jpg")}
                    ></img>
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two seat Lambo"
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col> */
}

// const UserProfile = () => {
//   return (
//     <>
//       <Form>
//         <Row>
//           <Col className="pr-1" md="5">
//             <Form.Group>
//               <label>Company (disabled)</label>
//               <Form.Control
//                 defaultValue="Creative Code Inc."
//                 disabled
//                 placeholder="Company"
//                 type="text"
//               ></Form.Control>
//             </Form.Group>
//           </Col>
//           <Col className="px-1" md="3">
//             <Form.Group>
//               <label>Username</label>
//               <Form.Control
//                 defaultValue="michael23"
//                 placeholder="Username"
//                 type="text"
//               ></Form.Control>
//             </Form.Group>
//           </Col>
//           <Col className="pl-1" md="4">
//             <Form.Group>
//               <label htmlFor="exampleInputEmail1">Email address</label>
//               <Form.Control placeholder="Email" type="email"></Form.Control>
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col className="pr-1" md="6">
//             <Form.Group>
//               <label>First Name</label>
//               <Form.Control
//                 defaultValue="Mike"
//                 placeholder="Company"
//                 type="text"
//               ></Form.Control>
//             </Form.Group>
//           </Col>
//           <Col className="pl-1" md="6">
//             <Form.Group>
//               <label>Last Name</label>
//               <Form.Control
//                 defaultValue="Andrew"
//                 placeholder="Last Name"
//                 type="text"
//               ></Form.Control>
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col md="12">
//             <Form.Group>
//               <label>Address</label>
//               <Form.Control
//                 defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
//                 placeholder="Home Address"
//                 type="text"
//               ></Form.Control>
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col className="pr-1" md="4">
//             <Form.Group>
//               <label>City</label>
//               <Form.Control
//                 defaultValue="Mike"
//                 placeholder="City"
//                 type="text"
//               ></Form.Control>
//             </Form.Group>
//           </Col>
//           <Col className="px-1" md="4">
//             <Form.Group>
//               <label>Country</label>
//               <Form.Control
//                 defaultValue="Andrew"
//                 placeholder="Country"
//                 type="text"
//               ></Form.Control>
//             </Form.Group>
//           </Col>
//           <Col className="pl-1" md="4">
//             <Form.Group>
//               <label>Postal Code</label>
//               <Form.Control placeholder="ZIP Code" type="number"></Form.Control>
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col md="12">
//             <Form.Group>
//               <label>About Me</label>
//               <Form.Control
//                 cols="80"
//                 defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
//                           that two seat Lambo."
//                 placeholder="Here can be your description"
//                 rows="4"
//                 as="textarea"
//               ></Form.Control>
//             </Form.Group>
//           </Col>
//         </Row>
//         <Button className="btn-fill pull-right" type="submit" variant="info">
//           Update Profile
//         </Button>
//         <div className="clearfix"></div>
//       </Form>
//     </>
//   );
// };