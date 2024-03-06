import React from 'react';
import { FaPowerOff } from "react-icons/fa";
import { useNavigate , Link} from 'react-router-dom';
import { useState } from 'react';
import { FaAlignJustify } from "react-icons/fa";
import { Button, Card,  Form, FormLabel, Offcanvas } from "react-bootstrap";
import { NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Menu() {
    const menuData = [
        
        {
          path: '/Dashboard',
          name:"Dashboard"
        },
        {
        path: '/Client',
        name:"Client"
        },
        {
          path: '/Category',
          name:"Category"
          },
          {
            path: '/Employee',
            name:"Employee"
            },
            {
              path: '/TaskAllocation',
              name:"TaskAllocation"
              },
              {
                path:'/EmpWiseTask',
                name:"EmpWiseTask"
              }
    
      ]
    

    const [show, setShow] = useState(false);

 // const handleClose = () => setShow(false);
  const handleShow = () => setShow(!show);
   let navigate = useNavigate();
    const handleClick = () => {
        navigate('/');

    }

  return (

    <>
    <Navbar  className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand >GT TODO</Navbar.Brand>
            {/* <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-`} /> */}
            
    <Button variant="secondary" onClick={handleShow} className='me-2'>
      <FaAlignJustify />
    </Button>
    <FormLabel>Welcome ! {sessionStorage.getItem("user")}</FormLabel>
    <Button variant='secondary' onClick={() => handleClick()}>
                <FaPowerOff/>
              
            </Button>
            </Container>
            </Navbar>
   
    <Offcanvas show={show} onHide={handleShow}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>GT TODO</Offcanvas.Title>
        <hr />
      </Offcanvas.Header>
      <Offcanvas.Body>
      <Nav className="ms-auto" >
        <li>
            {
              menuData.map((item) =>(
                <Nav style={{padding:'8px'}}> <Link to = {item.path} key={item.name} onClick={handleShow}>

                <FormLabel>{item.name}</FormLabel>
              </Link></Nav>
               
              ))
            }
            </li>
          </Nav>  
      </Offcanvas.Body>
    </Offcanvas>
    
    
    
  </>

            
       
  )
}

export default Menu;
