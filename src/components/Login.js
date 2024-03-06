import React, { useState } from "react";
import { Button, Card, Form, InputGroup ,Row} from 'react-bootstrap';
import { FaUser , FaLock } from "react-icons/fa";
import { useNavigate } from "react-router";
import axios from "axios";



function Login() 
{  

let history = useNavigate();
const [user, setUser] = useState();
const [loginData, setLoginData] = useState(
  {
    UserName :"",
    Password:"" , 
    Type:"" ,
    deviceId:"" 

  });  


  const handleLoginData = (e) => {

    setLoginData({...loginData, [e.target.name]:e.target.value});
  };




const handleLogin = () => {
  const data = {
    UserName :loginData.UserName,
    
    Password:loginData.Password , 
    Type:"" ,
    deviceId:"" 
}

console.log(data)
axios
.get('http://catodotest.elevadosoftwares.com/Login/GetLoginUserDetails',data)
.then((result) => {
  history('/Dashboard');
  })
  
  sessionStorage.setItem("user",loginData.UserName)
}

  
  
  



  return (
    <>
    <div className="login template d-flex justify-content-center align-items-center 100-w vh-100" style={{backgroundColor:"lightgoldenrodyellow"}}>
    
    <Card>

        <Form style={{margin:"2rem"}}>
        <Row >
        <h3 className="text-center">Login</h3>
        <Form.Group  controlId="formGridUserName">
        <Form.Label>User Name*</Form.Label>
        <InputGroup >
        <InputGroup.Text id="basic-addon1">
        <FaUser style={{ color: '#FFAB91' }}/>
        </InputGroup.Text>
          <Form.Control 
          type="text" 
          placeholder="User Name"
          name="UserName"
          value={loginData.UserName}
          onChange={(e) => handleLoginData(e)}
          />
        </InputGroup>
        </Form.Group>
        <Form.Group  controlId="formGridPassword">
        <Form.Label>Password</Form.Label>
        <InputGroup >
        <InputGroup.Text id="basic-addon1">
        <FaLock style={{ color: '#FFAB91' }}/>
        </InputGroup.Text>
          <Form.Control 
          type="password" 
          placeholder="Password"
          name="Password"
          value={loginData.Password}
          onChange={(e) => handleLoginData(e)}
         />
        </InputGroup>
        </Form.Group>
        
        <br></br>
        <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group>
        
      <Button variant="primary" onClick={() => handleLogin()} type="button">
        Login
      </Button>
      
      
      </Row>
        </Form>
        </Card>
        </div>
    </>
  )
}

export default Login;
