import { useEffect, useState } from "react";
import axios from 'axios';
import UserList from './components/UserList';
import { Route, Routes, useNavigate  } from "react-router-dom";
import Create from './components/Create';
import Update from './components/Update';
import { v4 as uuid } from "uuid";

function App() {
  const [users, setUsers] = useState([]);
  
  const navigate = useNavigate();




  useEffect(() => {
    axios.get("http://localhost:4000/user").then((response) => {
      setUsers(response.data);
    });
  }, []);

  


   function handleEditUser(data) {
    axios({
      method: "put",
      url: `http://localhost:4000/user/${data.id}`,
      data: {
        userId:data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        checkBox: data.checkBox,

      },
      config: {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    })
    .then((response) => {
      console.log("Update data", response);
    setUsers([...users.filter((item)=>item.id !== data.id), data]);

      navigate('/')
    })
      .catch((error) => {
        console.log("the error has occured: " + error);
      });

  }

  async  function handleSubmit(user) {
    const data = {
      userId: uuid(),
      firstName: user.firstName,
      lastName: user.lastName,
      checkBox: user.checkBox,
    };
    await  axios({
      method: "post",
      url: "http://localhost:4000/user/",
      data: data,
      config: {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    })
      .then((response) => {
        console.log("Add new data", response);
        setUsers([...users, data]);
        console.log("User now is : ", users)
        navigate('/')
      })
      .catch((error) => {
        console.log("the error has occured: " + error);
      });

  }


  function deleteUser(id) {
    axios.delete(`http://localhost:4000/user/${id}`).then(() => {
      navigate('/')
    });

    setUsers([...users.filter((x) => x.id !== id)]);
  }
 



  return (
    <div className="main">
      <h2 className="main-header">CURD REACT APP</h2>

      <Routes>
        <Route exact path='/' element={<UserList users={users}  deleteUser={deleteUser} />} />
        <Route path="/create" exact  element={<Create  users={users}  handleSubmit={handleSubmit}   />} />
        <Route path="/update/:id" exact element={<Update  users={users}   handleEditUser={handleEditUser}  />} />
      </Routes>

    
    </div>
    
  )
}

export default App;
