import React, { useEffect } from 'react';
import {  useState } from "react";
import axios from "axios";
import { Button, Card, Col,  Form,InputGroup, Row } from "react-bootstrap";
import {  ImCheckmark , ImCross } from "react-icons/im";
import { FaFileAlt} from "react-icons/fa";
import Swal from 'sweetalert2';
import {Formik, ErrorMessage} from 'formik';
import * as yup from 'yup';
import { useNavigate, useLocation } from 'react-router';

function TaskAdd() {
  const location = useLocation();
  const queryParameter = new URLSearchParams(location.search)
  const id = queryParameter.get('id')
  console.log(id);
  const key = queryParameter.get('key')
  console.log(key);
  const [clientData, setClientData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [employeeData, setEmployeeData] = useState([])
  let navigate=useNavigate();
  const [records, setRecords] = useState([]);
  const [text, setText] = useState('SAVE');
  const [isEditing, setIsEditing] = useState(false);
  const[taskData, setTaskData] = useState({
      AllocationId : "", 
      ClientId:"", 
      CategoryId:"", 
      EmployeeId:"", 
      Description:"", 
      ScheduledDate:new Date().toISOString().substring(0,10), 
      DueDate:"", 
      Status:"", 
      StartedDate:"", 
      CompletedDate:"", 
      UploadsPath:"", 
      CreatedBy:1
      })

  const schema = yup.object().shape({
      ClientId:yup.string().required(),
      CategoryId:yup.string().required(),
      EmployeeId:yup.string().required(),
    });

    
    
useEffect(() => {
    axios
    .get('http://catodotest.elevadosoftwares.com//Client/GetAllClientDetails'
    ).then((result) => result.data.clientList).then((val) => setClientData(val))
},[])

useEffect(() => {
  axios
  .get('http://catodotest.elevadosoftwares.com/Category/GetAllCategories')
  .then((res) => res.data.categoryList).then((val) => setCategoryData(val))
},[])

useEffect(() => {
  axios
  .get('http://catodotest.elevadosoftwares.com/Employee/GetAllEmployeeDetails')
  .then((result) => result.data.employeeList).then((val) => setEmployeeData(val))
},[])

const handleCancel = () =>
        {
            setTaskData({
                ClientId:"",
            ClientName:"",
            Category:"",
            EmployeeName:"",
            EmployeeId:"",
            Description:"",
            CreatedBy:""

            })
            
            navigate('/TaskAllocation');
        }

const handleTaskData = (e) => {

  setTaskData({...taskData,[e.target.name]:e.target.value});
}

const handleSave = () =>
 {
  console.log(taskData)
 // e.preventDefault();
 

  Swal.fire({
    title:"Do you want to save?",
    showCancelButton:true,
    confirmButtonText:"save",
  }).then((res) => {
    if(res.isConfirmed) {
      const data ={
        allocationId : 0, 
        clientId:taskData.ClientId, 
        categoryId:taskData.CategoryId, 
        employeeId:taskData.EmployeeId, 
        description:taskData.Description, 
        scheduledDate:taskData.ScheduledDate, 
        dueDate:taskData.DueDate, 
        status:"Yet To Start", 
        startedDate:"", 
        completedDate:"",
         uploadsPath:"", 
         createdBy:1
    
        
      }

      axios.post('http://catodotest.elevadosoftwares.com/Allocation/InsertAllocation',data)
      .then((result) => {
        Swal.fire("Saved!","","success");
        handleCancel();
      });
    }else if(res.isDenied){
      Swal.fire("Details are not saved", "", "info")
    }
  })

}

function LoadTaskAllocationById()
{
  const fetchDataalloc = async () => {
    const dataid={
      // allocationId: parseInt(taskalloceditId.Id)}
      allocationId: parseInt(id)}
    axios
      .post(
        'http://catodotest.elevadosoftwares.com/Allocation/GetAllocationById',dataid
      )
      .then((res) => {
     
        // setRecords(res.data.allocationByIdList);
        let result =  (res.data.allocationByIdList);
        console.log(result)
         result.map(r => {
          setTaskData({ ...taskData, AllocationId: r.allocationId, ClientId: r.clientId,
            CategoryId: r.categoryId,EmployeeId:r.employeeId, Description: r.description,ScheduledDate:r.scheduledDate,DueDate:r.dueDate,
            Status:r.status,StartedDate:r.startedDate,CompletedDate:r.completedDate,UploadsPath:r.uploadsPath,
            CreatedBy:r.createdBy})
          });
        
        setIsEditing(true);
      
       
         
      })
      .catch((err) => console.log(err));
  };
  fetchDataalloc();
}
useEffect(() => {
   if(key === 'Add')
   {
    setText('SAVE')
 }
   else if(key==='Edit')
   {
    setText('UPDATE')
    LoadTaskAllocationById();
  }else 
  {
    setText('');
    LoadTaskAllocationById();
  }
},[]);


const handleSubmit = (e) => {
  if(isEditing)
  {
    handleUpdate(e)
  }
  else{
    handleSave(e);
  }
}

   
   const handleUpdate = () => {

      const data = {
        allocationId :taskData.AllocationId, 
        clientId:taskData.ClientId, 
        categoryId:taskData.CategoryId, 
        employeeId:taskData.EmployeeId, 
        description:taskData.Description, 
        scheduledDate:taskData.ScheduledDate, 
        dueDate:taskData.DueDate, 
        status:"Yet To Start", 
        startedDate:"", 
        completedDate:"",
         uploadsPath:"", 
         createdBy:1

      }
      Swal.fire({
        title:"Do you want to update?",
        showCancelButton: true,
    confirmButtonText: "Update",
    }).then((result) => {
    if (result.isConfirmed) {
    
    axios.post('http://catodotest.elevadosoftwares.com/Allocation/InsertAllocation',data)
    .then((res)=>{
      Swal.fire("updated successfully!", "", "success");
      handleCancel();
    LoadTaskAllocationById();
    
    
    }) ;
    }else if (result.isDenied) {
    Swal.fire("Details are not updated", "", "info");
    }
      });
    
  
    }



  return (
    <div style={{backgroundColor:"#fffff5"}} className='mt-2'>
        <h3>Dashboard</h3>
    
    
    <div style={{margin:"5rem"}}>
        
    <Card >
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={taskData}
      enableReinitialize >
        {({handleSubmit,handleChange})=>(

      <Form style={{margin:"2rem"}}>
      <Row className="align-items-center">
        <Col sm={5} className='my-1'>
        <Form.Group  className="mb-3" controlId="formGridclient">
        <Form.Label>Client Name</Form.Label>
        <Form.Select type='select'
      name='ClientId'
      value={taskData.ClientId}
      onChange={(e) =>{handleChange(e);
         handleTaskData(e)}} >
          <option>select</option>
          
          {
            clientData.map((opts) =>
        <option value={opts.clientId}>{opts.clientName}</option>)
          }
      </Form.Select>
      
      
      </Form.Group>
      <ErrorMessage name='ClientId' className='text-danger' component='div' />
      </Col>
      <br />
      <Col sm={5} className='my-1'>
      <Form.Group  className="mb-3" controlId="formGridCategory">
        <Form.Label>Category</Form.Label>
      <Form.Select 
      type='select'
      name='CategoryId'
      value={taskData.CategoryId}
      onChange={(e) => {handleChange(e);
        handleTaskData(e)}}>
        <option>Select Category</option>
          {
            categoryData.map((opt,i) =>
            <option value={opt.categoryId}> {opt.category}</option>)
          }
        
      </Form.Select>
      
      </Form.Group>
      <ErrorMessage name='CategoryId' className='text-danger' component='div' />
      </Col>
      </Row>
      
      <Row className='mb-3'>
      <Col lg={5} className="my-1" >
      
        <Form.Label>Description</Form.Label>
        <InputGroup >
        <InputGroup.Text id="basic-addon1" >
        <FaFileAlt style={{color:'#FFAB91'}} />
            </InputGroup.Text>
        
        <Form.Control
        as="textarea"
        type="text"
        placeholder='(Maximum 300 chars)'
        name="Description"
           aria-label="Description"
         aria-describedby="basic-addon1"
         value={taskData.Description}
         onChange={(e) => {handleChange(e);
        handleTaskData(e)}}
        />
        </InputGroup>
      
    
      </Col>
  
      
      <Col sm={5} className='my-1'>
      <Form.Group  className="mb-3" controlId="formGridemployee">
        <Form.Label>Assigned to</Form.Label>
      <Form.Select
      type='select'
      name='EmployeeId'
      value={taskData.EmployeeId}
      onChange={(e) => {handleChange(e);
        handleTaskData(e)}}>
        <option>Select Employee</option>
        {
          employeeData.map((opts,i) =>
          <option value={opts.employeeId}>{opts.employeeName}</option>)
        }
      </Form.Select>
      </Form.Group>
      <ErrorMessage name='EmployeeId' className='text-danger' component='div' />
      </Col>
      <br />
      <Row className='mb-3'>
      <Col sm={3} className='my-1'>
        <Form.Group as={Col} controlId="formGridScheduledDate">
          <Form.Label>Scheduled Date</Form.Label>
          <Form.Control 
          type='date'
          name='ScheduledDate'
          value={taskData.ScheduledDate}
        />
        </Form.Group>
        </Col>
        <Col sm={3} className='my-1'>
        <Form.Group as={Col} controlId="formGridDueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control 
          type='date'
          name='DueDate'
      value={taskData.DueDate}
      onChange={(e) => handleTaskData(e)}
        />
        </Form.Group>
        </Col>
        </Row>

      <Col xs="auto" className="my-1">
        {(key!=='View') && (
      <Button variant="outline-success" className="rounded-pill" onClick={(e) => handleSubmit(e)} type="submit"  > 
      <ImCheckmark /> &nbsp; {text}
      </Button>
      )}
      &nbsp; &nbsp;
      <Button variant="outline-danger" className="rounded-pill" onClick={(e) => handleCancel(e)} type="submit"> 
      <ImCross /> &nbsp; BACK</Button>
      </Col>
      
      </Row>
      </Form>
        )}
        </Formik>
      </Card>
      </div>

      
    </div>
  )
}

export default TaskAdd;
