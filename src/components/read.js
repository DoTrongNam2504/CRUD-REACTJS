import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Table, Input } from 'semantic-ui-react';
import axios from 'axios'

export default function Read() 
{

    const [APIData, setAPIData] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filterResult, setFilterResult] = useState([]);
    
    const setData = (data) => {
        let { id, firstName, lastName, checkbox } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Checkbox Value', checkbox);
    }

    const onDelete = (id) => {
        axios.delete(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`).then(() => {
            getData();
        })
    }

    const getData = () => {
        axios.get(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`).then((getData) => {
            setAPIData(getData.data);
        })
    }


    useEffect(() => {
        axios.get(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`)
            .then((response) => {
                setAPIData(response.data)
            })
    }, [])


    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filterData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilterResult(filterData)
        }
        else {
            setFilterResult(APIData)
        }

    }
    


    return (
        <Table celled compact definition>

            <Table.Header fullWidth>
                <Table.Row>
                    <Table.HeaderCell colSpan='3' >
                        <Input type='search' onChange={(e) => searchItems(e.target.value)} placeholder='Search...' />
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
                                <Table.Cell>{data.checkbox ? 'Checked' : 'Unchecked'}</Table.Cell>
                                <Table.Cell>
                                    <Link to="/update">
                                        <Button basic color='green' onClick={() => setData(data)} >
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button onClick={() => onDelete(data.id)} basic color='red'>
                                        Delete
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })

                ) : (
                    APIData.map((data) => {
                        return (
                            <Table.Row key={data.id}>
                                <Table.Cell>{data.firstName} </Table.Cell>
                                <Table.Cell>{data.lastName}</Table.Cell>
                                <Table.Cell>{data.checkbox ? 'Checked' : 'Unchecked'}</Table.Cell>
                                <Table.Cell>
                                    <Link to="/update">
                                        <Button basic color='green' onClick={() => setData(data)} >
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button onClick={() => onDelete(data.id)} basic color='red'>
                                        Delete
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    }))}
            </Table.Body>
        </Table>
    )
}

