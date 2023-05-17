import React, { useEffect, useState } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import axios from 'axios'

export default function Read() {

    useEffect(() => {
        axios.get(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`).then((response) => {
            setAPIData(response.data)
        })
    }, [])

    const [APIData, setAPIData] = useState([]);
    return (
        <Table celled compact definition>
            <Table.Header fullWidth>
                <Table.Row>
                    <Table.HeaderCell>First Name</Table.HeaderCell>
                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                    <Table.HeaderCell>Checked</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>

                {APIData.map((data) => {
                    return (
                        <Table.Row key={data.id}>
                            <Table.Cell>{data.firstName} </Table.Cell>
                            <Table.Cell>{data.lastName}</Table.Cell>
                            <Table.Cell>{data.checkbox ? 'Checked' : 'Unchecked'}</Table.Cell>
                            <Table.Cell>
                                <Button basic color='red'>
                                    Edit
                                </Button>
                                <Button basic color='red'>
                                    Delete
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    )
                })}


            </Table.Body>

            <Table.Footer fullWidth>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell colSpan='4'>
                        <Button
                            floated='right'
                            icon
                            labelPosition='left'
                            primary
                            size='small'
                        >
                            <Icon name='user' /> Add User
                        </Button>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )

}

