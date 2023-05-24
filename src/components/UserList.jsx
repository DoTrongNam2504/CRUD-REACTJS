import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Table, Input } from 'semantic-ui-react';

const UserList = (props) => {
    const [searchInput, setSearchInput] = useState("");
    const [filterResult, setFilterResult] = useState([]);

    const setDataUserEdit = (data) => {
        localStorage.setItem('userInfo', JSON.stringify(data));
    }

    const searchItems = (searchValue) => {

        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filterData = props.users.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilterResult(filterData)
        }
        else {
            setFilterResult(props.users)
        }

    }



    return (
        <Table celled compact definition>

            <Table.Header fullWidth>
                <Table.Row>
                    <Table.HeaderCell colSpan='3'   >
                        <Input type='search' floated='right' icon labelPosition='left' onChange={(e) => searchItems(e.target.value)} placeholder='Search...' />
                    </Table.HeaderCell>
                    <Table.HeaderCell colSpan='4'>
                        <Link to="/create">
                            <Button floated='right' icon labelPosition='left' primary size='small'>
                                <Icon name='user' /> Add User
                            </Button>
                        </Link>

                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Header fullWidth>
                <Table.Row>
                    <Table.HeaderCell>First Name</Table.HeaderCell>
                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                    <Table.HeaderCell>Checked</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {searchInput.length > 1 ? (
                    filterResult.map((data) => {
                        return (
                            <Table.Row key={data.id}>
                                <Table.Cell>{data.firstName} </Table.Cell>
                                <Table.Cell>{data.lastName}</Table.Cell>
                                <Table.Cell>{data.checkBox ? 'Checked' : 'Unchecked'}</Table.Cell>
                                <Table.Cell>
                                    <Link to={`/update/${data.id}`} >
                                        <Button basic color='green' onClick={() => setDataUserEdit(data)}  >
                                            Edit
                                        </Button>
                                    </Link>

                                    <Button basic color='red' onClick={() => props.deleteUser(data.id)} >
                                        Delete
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        )})
                        ): (

                    props.users.map((data) => (
                        <Table.Row key={data.id}>
                            <Table.Cell>{data.firstName} </Table.Cell>
                            <Table.Cell>{data.lastName}</Table.Cell>
                            <Table.Cell>{data.checkBox ? 'Checked' : 'Unchecked'}</Table.Cell>
                            <Table.Cell>
                                <Link to={`/update/${data.id}`} >
                                    <Button basic color='green' onClick={() => setDataUserEdit(data)}  >
                                        Edit
                                    </Button>
                                </Link>

                                <Button basic color='red' onClick={() => props.deleteUser(data.id)} >
                                    Delete
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))
                )}

            </Table.Body>
        </Table>
    );
};

export default UserList;
