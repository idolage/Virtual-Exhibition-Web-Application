import React from 'react'
import Form from 'react-bootstrap/Form';
export const Attendee = () => {
  return (
    <>
    <h4 style={{color:'#2899fb'}}><strong><b><i className="nc-icon nc-circle-09"></i>&nbsp;Join as an Attendee</b></strong></h4>
    <p className="primary-text">Sign up to Nerambum|නැරඹුම්</p>
    
    <Form style={{width:'50vw'}}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" placeholder="Enter full name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>NIC No</Form.Label>
        <Form.Control type="text" placeholder="Enter nic" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Re-Enter Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group>
      <button className="secondary-button" type="submit" 
      style={{marginTop:'2vh', width:'20vw', minWidth:'200px'}}>
        Register
      </button>
      </Form.Group>
      
    </Form>
    </>
  )
}
