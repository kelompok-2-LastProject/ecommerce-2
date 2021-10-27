import {Form, Button} from 'react-bootstrap'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function LoginForm(){
  const [user, setUser] = useState([]);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  console.log(username,password)
    useEffect(()=>{
        axios.get(`https://fakestoreapi.com/users/2`)
        .then(res => {
          const persons = res.data;
          setUser(persons);
      })
      axios.post('https://fakestoreapi.com/auth/login', {
        username: user.username, 
        password: user.password 
      })     
    })
    // console.log(user.persons.username)
    // console.log(user.persons.password)
    const handleSubmit = (e) =>{
      e.preventDefault()
      if (username === user.username && password === user.password){
        console.log(username)
      }
    }
  return(
    <Form className="container" >
      <Form.Group className="mb-3">
        <Form.Label>Username/Email</Form.Label>
        <Form.Control type="username" placeholder="Enter username" style={{width:"50%"}} onChange={e => setUserName(e.target.value)}/>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" style={{width:"50%"}}onChange={ e => setPassword(e.target.value)}/>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  )
}
