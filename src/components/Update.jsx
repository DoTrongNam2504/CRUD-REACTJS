import React, { useState } from 'react'
import {  Button, Form } from 'semantic-ui-react'

const Update = (props) => {

  let dataEditUser = JSON.parse(localStorage.getItem('userInfo')); 
  const [users, setUsers] = useState(dataEditUser);

  function handleSubmitEdit(e) {
    e.preventDefault();
    console.log("Show user now ",users);
    props.handleEditUser(users);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUsers({ ...users, [name]: value });
  }

  function handleCheckboxChange (event)
  {
    const { name, checked } = event.currentTarget;
    setUsers({ ...users, [name]: checked });
  }


  return (
    <Form className='create-form' onSubmit={handleSubmitEdit}>
            <Form.Field >
                <label>First Name</label>
                <input type='text' placeholder='First name' defaultValue={dataEditUser.firstName} name='firstName' onChange={handleInputChange} />
            </Form.Field>

            <Form.Field>
                <label>Last Name</label>
                <input  type='text'  placeholder='Last name' defaultValue={dataEditUser.lastName} name='lastName' onChange={handleInputChange} />
            </Form.Field>

            <Form.Field>
                <input type='checkbox' className='checkbox'  name='checkBox' defaultChecked={dataEditUser.checkBox ? 'checked' : ''}  onChange={handleCheckboxChange} />
                I agree to the Terms and Conditions
            </Form.Field>

            <Form.Field>
                <Button type='submit' >Submit</Button>
            </Form.Field>
        </Form>
  )
}

export default Update
