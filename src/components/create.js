import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Checkbox, Button, Form } from 'semantic-ui-react'
import axios from 'axios';


const Create = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    let history = useHistory();

    const postData = () => {
        axios.post(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`, {

            firstName,
            lastName,
            checkbox
        }).then(() => {
            history.push('/read')
        })
    }

    return (
        <Form className='create-form'>
            <Form.Field>
                <label>First Name</label>
                <input  placeholder='First name' onChange={(e)=>setFirstName(e.target.value)}/>
            </Form.Field>

            <Form.Field>
                <label>Last Name</label>
                <input  placeholder='Last name' onChange={(e)=> setLastName(e.target.value)}/>
            </Form.Field>
            
            <Form.Field>
                <Checkbox label = "I agree to the Terms and Conditions" onChange={(e)=> setCheckbox(!checkbox)}/>
            </Form.Field>

            <Form.Field>
                <Button type='submit' onClick={postData}>Submit</Button>
            </Form.Field>
        </Form>
    )
}

export default Create;