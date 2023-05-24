import React, { useState } from "react";
import {  Button, Form } from 'semantic-ui-react'; 

const Create = (props) => {

  const initialState = {
    firstName: "",
    lastName: "",
    checkBox: false,
  };
  const [user, setUser] = useState(initialState);


  function handleSubmit(e) {
    e.preventDefault();
    if (!user.firstName || !user.lastName) {
      return;
    }
    props.handleSubmit(user);
    setUser(initialState);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  function handleCheckboxChange (event)
  {
    const { name, checked } = event.currentTarget;
    setUser({ ...user, [name]: checked });
  }


  return (
    <Form className='create-form' onSubmit={handleSubmit}>
      <Form.Field>
        <label>First Name</label>
        <input placeholder='First name' name='firstName' onChange={handleInputChange} required/>
      </Form.Field>

      <Form.Field>
        <label>Last Name</label>
        <input placeholder='Last name' name='lastName' onChange={handleInputChange} required />
      </Form.Field>

      <Form.Field>
        <input type="checkbox" className="checkbox"  name='checkBox'  onChange={handleCheckboxChange}/>I agree to the Terms and Conditions
      </Form.Field>

      <Form.Field>
        <Button type='submit' >Submit</Button>
      </Form.Field>
    </Form>
  )
}

export default Create
