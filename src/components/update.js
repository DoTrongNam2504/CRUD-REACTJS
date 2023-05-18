import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Checkbox, Button, Form } from 'semantic-ui-react'
import axios from 'axios';

function Update() {
    let history = useHistory();
    const [id, setID] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkbox, setCheckbox] = useState(false);

    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setFirstName(localStorage.getItem('First Name'));
        setLastName(localStorage.getItem('Last Name'));
        setCheckbox(localStorage.getItem('Checkbox Value'));
    }, []);

    const updateAPIData = () => {
        axios.put(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`, {
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
                <input placeholder='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Form.Field>

            <Form.Field>
                <label>Last Name</label>
                <input placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </Form.Field>

            <Form.Field>
                <Checkbox label="I agree to the Terms and Conditions" checked={checkbox} onChange={(e) => setCheckbox(!checkbox)} />
            </Form.Field>

            <Form.Field>
                <Button type='submit' onClick={updateAPIData} >Submit</Button>
            </Form.Field>
        </Form>
    )

}

export default Update;