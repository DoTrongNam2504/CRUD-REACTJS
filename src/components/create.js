import React, {useState} from 'react'
import { Checkbox, Button, Form } from 'semantic-ui-react'
import axios from 'axios';


const Create = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkbox, setCheckbox] = useState(false);

    const postData = () => {
        axios.post(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`, {

            firstName,
            lastName,
            checkbox
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
                <input  placeholder='First name' onChange={(e)=> setLastName(e.target.value)}/>
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