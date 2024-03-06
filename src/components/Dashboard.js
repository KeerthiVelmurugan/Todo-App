import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Row , Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FaListUl, FaUserPlus, FaUserFriends,FaChartLine, FaCheck, FaExclamationTriangle,FaRegTrashAlt , FaRegMinusSquare,
  FaRegListAlt} from "react-icons/fa";
  import axios from "axios";


function Dashboard() {
  const [dbDetails, setDbDetails] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    totalClients: "",
    totalEmployees: "",
    totalCategories: "",
    totalTasks: "",
    yetToStartTasks: "",
    inProgressTasks: "",
    completedTasks: "",
    inCompletedTasks: "",
    inActiveTasks: "",
    totalTodayTasks: "",
    totalUsers: ""
  });

  function LoadDashboarddata()
  {
   
  }
useEffect (() => {
    
  const fetchData = async() => {
    try
    {
    const result= await axios.get('http://catodotest.elevadosoftwares.com/Dashboard/GetAdminDashboardDtls');
    
       setDbDetails(result.data);
    }catch(error)
    {
      console.error('',error);
    }


     }
   
    
   
   fetchData();
    
  },[]);
  useEffect (() => {
    console.log(dbDetails);
if(dbDetails)
{
    setDashboardData({

      totalClients: dbDetails.totalClients,
    totalEmployees: dbDetails.totalEmployees,
    totalCategories: dbDetails.totalCategories,
    totalTasks: dbDetails.totalTasks,
    yetToStartTasks: dbDetails.yetToStartTasks,
    inProgressTasks: dbDetails.inProgressTasks,
    completedTasks: dbDetails.completedTasks,
    inCompletedTasks: dbDetails.inCompletedTasks,
    inActiveTasks: dbDetails.inActiveTasks,
    totalTodayTasks: dbDetails.totalTodayTasks,
    totalUsers: dbDetails.totalUsers
    
    })
  }
  },[dbDetails]);


  return (
    
    <div style={{backgroundColor:"#fffff5"}} className='mt-2' >
      <h3>Dashboard</h3>
      <div style={{margin:'5rem'}}>
        <Card>
          <Form style={{margin:'2rem'}}>
            <Row className='align-items-center'>
              <Col className='align-items-center'>
            <h4>MASTERS</h4>
            <hr />
            <Row>
              <Col>
            <Link to = '/Category'>
              <Button variant='outline-info' className='rounded-pill ' >
                &nbsp; &nbsp; 
                < FaListUl /> &nbsp; &nbsp; 
              </Button>
              </Link>
              </Col>
              <Col>
              <Form.Label>Category</Form.Label>
              </Col>
              <Col>
            <Link to = '/Category'>
              <Button variant='info' className='rounded-circle ' >{dashboardData.totalCategories}
            
              </Button>              
              </Link>
              </Col>
              </Row>
              </Col>
              <Col className='align-items-center'>
            <h4>TASK STATUS</h4>
            <hr />
            <Row>
              <Col>
            <Link to = '/Category'>
              <Button variant='outline-info' className='rounded-pill ' >
                &nbsp; &nbsp; 
                < FaChartLine /> &nbsp; &nbsp; 
              </Button>
              </Link>
              </Col>
              <Col>
              <Form.Label>Yet to start</Form.Label>
             </Col>
             <Col>
            <Link to = '/Category'>
              <Button variant='info' className='rounded-circle ' >{dashboardData.yetToStartTasks}
          
              </Button>
              </Link>
              </Col>
              </Row>
              </Col>
              </Row>
                      
          
            <Row className='align-items-center'>
            <Col className='align-items-center'>
            <hr />
            <Row>
              <Col>
            <Link to = '/Client'>
              <Button variant='outline-info' className='rounded-pill ' >
              &nbsp; &nbsp; 
                < FaUserPlus />
                &nbsp; &nbsp; 
              </Button>
            </Link>
            </Col>
          <Col>    <Form.Label>Client</Form.Label> </Col>
              <Col>
            <Link to = '/Client'>
              <Button variant='info' className='rounded-circle ' >{dashboardData.totalClients}
            
              </Button>
              </Link>
              </Col>
              </Row>
              </Col>
              <Col className='align-items-center'>
              <hr />
              <Row>
                <Col>
            <Link to = '/'>
              <Button variant='outline-warning' className='rounded-pill ' >
              &nbsp; &nbsp; 
                < FaExclamationTriangle />
                &nbsp; &nbsp; 
              </Button>
            </Link>
            </Col>
           <Col>   <Form.Label>In Progress</Form.Label></Col>
              <Col>
            <Link to = '/'>
              <Button variant='warning' className='rounded-circle ' > {dashboardData.inProgressTasks}
              
              </Button>
              </Link>
              </Col>
              </Row>
              </Col>
              </Row>
              <Row className='align-items-center'>
              <Col className='align-items-center'>
              <hr class="hr" />
              <Row>
                <Col>
            <Link to = '/Employee'>
              <Button variant='outline-info' className='rounded-pill ' >
              &nbsp; &nbsp; 
                < FaUserFriends />
                &nbsp; &nbsp; 
              </Button>
            </Link>
            </Col>
           
          <Col>    <Form.Label>Employee</Form.Label> </Col>
              <Col>
            <Link to = '/Employee'>
              <Button variant='info' className='rounded-circle ' >{dashboardData.totalEmployees}
              
              </Button>
              </Link>
              </Col>
              </Row>
              </Col>
              <Col className='align-items-center'>
              <hr />
              <Row>
                <Col>
              <Link to = '/Employee'>
              <Button variant='outline-success' className='rounded-pill ' >
              &nbsp; &nbsp; 
                < FaCheck />
                &nbsp; &nbsp; 
              </Button>
            </Link>
            </Col>
            
             <Col> <Form.Label>Completed</Form.Label> </Col>
              <Col>
            <Link to = '/'>
              <Button variant='success' className='rounded-circle ' > {dashboardData.completedTasks}
            
              </Button>
              </Link>
              </Col>
              </Row>
              </Col>
              </Row>
              
            
              <Row className='align-items-center'>
                <Col className='align-items-center'>

                </Col>
                <Col className='my-1'>
                <hr />
                <Row>
                  <Col>
                <Link to = '/'>
              <Button variant='outline-primary' className='rounded-pill ' >
              &nbsp; &nbsp; 
            < FaRegMinusSquare />
                &nbsp; &nbsp; 
            </Button>
            </Link>
            </Col>
       <Col> <Form.Label>Due Tasks</Form.Label> </Col>
            <Col>
            <Link to = '/'>
              <Button variant='primary' className='rounded-circle ' > {dashboardData.inCompletedTasks}
            
              </Button>
              </Link>
              </Col>
                </Row>
                </Col>
              </Row>
              
              <Row className='align-items-center'>
                <Col className='align-items-center'>

                </Col>
                <Col className='my-1'>
                <hr />
                <Row>
                <Col>
                <Link to = '/'>
              <Button variant='outline-danger' className='rounded-pill ' >
              &nbsp; &nbsp; 
                < FaRegTrashAlt />
                &nbsp; &nbsp; 
              </Button>
            </Link>
            </Col>
              <Col>
              <Form.Label>InActive Tasks</Form.Label>
              </Col>
              <Col>
            <Link to = '/'>
              <Button variant='danger' className='rounded-circle ' >{dashboardData.inActiveTasks}
              
              </Button>
              </Link>
              </Col>
              </Row>
                </Col>
              </Row>
              <br />
              <Row className='align-items-center'>
            <Col className='align-items-center'>
              <h5>ALLOCATIONS</h5>
              <hr />
              <Row>
                <Col>
            <Link to = '/'>
              <Button variant='outline-success' className='rounded-pill' >
              &nbsp; &nbsp; 
                < FaRegListAlt />
                &nbsp; &nbsp; 
              </Button>
            </Link>
            </Col>
          <Col>    <Form.Label>Allocations</Form.Label> </Col>
          <Col>
              <Link to = '/'>
              <Button variant='success' className='rounded-circle' > {dashboardData.totalTasks}
              
              </Button>
              </Link>
              </Col>
              </Row>
              </Col>
              <Col className='align-items-center'>
                <h5>USERS</h5>
                <hr />
                <Row>
               <Col> <Link to = '/'>
              <Button variant='outline-warning' className='rounded-pill' >
             &nbsp; &nbsp;
                < FaUserPlus />
              &nbsp; &nbsp;
              </Button>
            </Link>
            </Col>
            <Col>  <Form.Label>Users</Form.Label></Col>
             <Col>
            <Link to = '/'>
              <Button variant='warning' className='rounded-circle' > {dashboardData.totalUsers}
                
              </Button>
              </Link>
                </Col>
                </Row>
                </Col>
                </Row>
            
              
              
          </Form>
        </Card>
      </div>
      
    </div>
  )
}

export default Dashboard
