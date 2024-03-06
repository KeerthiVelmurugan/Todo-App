import React, { useEffect } from 'react';
import {  useState } from "react";
import axios from "axios";
import { Button, Card, Col,  Form,InputGroup, Row } from "react-bootstrap";
import { FaUser , FaPhoneAlt, FaLock } from "react-icons/fa";
import {  ImCheckmark , ImCross } from "react-icons/im";
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import {Formik, ErrorMessage} from 'formik';
import * as yup from 'yup';

function EmployeeAdd() {

    let employeeEditID = useParams();
    let navigate = useNavigate();
    const [records, setRecords] = useState([]);
    const [text, setText] = useState('SAVE');
    const [isEditing, setIsEditing] = useState(false);
    const [employeeData, setEmployeeData] = useState(
        {
            EmployeeId:"",
            EmployeeName:"",
            Mobile:"",
            UserName:"",
            Password:"",
            ConfirmPassword:"",
            CreatedBy:""


        });
    const schema = yup.object().shape(
      {
        EmployeeName:yup.string().required(),
        Mobile:yup.number().required(),
        UserName:yup.string().required(),
        Password:yup.string().required().matches(),
        ConfirmPassword:yup.string().required().oneOf([yup.ref("Password"),null],"Your password doesn't match"),

      });

        const handleCancel = () =>
        {
            setEmployeeData({
                EmployeeId:"",
            EmployeeName:"",
            Mobile:"",
            UserName:"",
            Password:"",
            ConfirmPassword:"",
            CreatedBy:""

            })
            navigate('/Employee');
        }

        const handleEmployeeData = (e) => {

            setEmployeeData({...employeeData, [e.target.name]:e.target.value});
        };

        const handleSave = () => {

            //e.preventDefault();
            const data = {
                employeeId:0,
            employeeName:employeeData.EmployeeName,
            mobile:employeeData.Mobile,
            userName:employeeData.UserName,
            password:employeeData.Password,
            confirmPassword:employeeData.ConfirmPassword,
            createdBy:1

            }

            Swal.fire({
                title:"Do you want to save?",
                showCancelButton: true,
                confirmButtonText:"Save",
            }).then((result) => {
                if (result.isConfirmed) {
                 
                    axios.post('http://catodotest.elevadosoftwares.com/Employee/InsertEmployee',data)
                    .then((res)=>{
                      Swal.fire("Saved!", "", "success");
                      handleCancel();
                                  
                  
                  }) ;
              }else if (result.isDenied) {
                  Swal.fire("Details are not saved", "", "info");
                }
              });
            }

              
              function LoadEditEmployee()
              {
                const fetchData = async () => {

                    axios
                    .get('http://catodotest.elevadosoftwares.com/Employee/GetAllEmployeeDetails')
                    .then((res) => {
                        setRecords(res.data.employeeList);
                        console.log(records)
                        let result = (res.data.employeeList).filter((item) => item.employeeId === parseInt(employeeEditID.id));
                        console.log(result)
                        result.map(rec => {
                            setEmployeeData({...employeeData, EmployeeId:rec.employeeId,EmployeeName:rec.employeeName,Mobile:rec.mobile,
                            UserName:rec.userName, Password:rec.password, ConfirmPassword:rec.confirmPassword});
                        });

                        setText('UPDATE');
                        setIsEditing(true);

                    })
                    .catch((err) => console.log(err));
                };
                fetchData();

              }

              useEffect(() => {
                if(employeeEditID.id===undefined)
                {
                  setText('SAVE')
                }
                else
                {
                  setText('UPDATE')
                  LoadEditEmployee();
                }
              },[]);

    const handleSubmit = (e) => {

                if(isEditing)
    {
      handleUpdate(e)
    }else{
      handleSave(e);
    }
  }
     
    const handleUpdate = () =>{

     // e.preventDefault();
      const data = {
       employeeId:employeeData.EmployeeId,
       employeeName:employeeData.EmployeeName,
       mobile:employeeData.Mobile,
       userName:employeeData.UserName,
       password:employeeData.Password,
       confirmPassword:employeeData.ConfirmPassword,
            createdBy:1
          
    
    
    }
    Swal.fire({
    title: "Do you want to update?",
    showCancelButton: true,
    confirmButtonText: "Update",
    }).then((result) => {
    if (result.isConfirmed) {
    
    axios.post('http://catodotest.elevadosoftwares.com/Employee/InsertEmployee',data)
    .then((res)=>{
      Swal.fire("updated successfully!", "", "success");
      handleCancel();
    LoadEditEmployee();
    
    
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
      initialValues={employeeData}
      enableReinitialize>
        {({handleSubmit,handleChange}) =>(

        <Form noValidate style={{margin:"2rem"}}>
      <Row className="align-items-center">
        <Col sm={3} className='my-1'>
        <Form.Group  controlId="formGridClientName">
          <Form.Label>Employee Name*</Form.Label>
          <InputGroup >
        <InputGroup.Text id="basic-addon1">
        <FaUser style={{ color: '#FFAB91' }}/>
            
        </InputGroup.Text>
          <Form.Control 
          type="text" 
          placeholder="Enter Employee Name"
          name='EmployeeName'
          value={employeeData.EmployeeName} 
          onChange={(e) => {handleChange(e);
             handleEmployeeData(e)}} />
        </InputGroup>
        </Form.Group>
        <ErrorMessage name='EmployeeName' className='text-danger' component='div' />
        </Col>
        <Col sm={3} className='my-1'>
        <Form.Group  controlId="formGridMobile">
          <Form.Label>Mobile</Form.Label>
          <InputGroup >
        <InputGroup.Text id="basic-addon1">
        < FaPhoneAlt style={{ color: '#FFAB91' }}/>
            
        </InputGroup.Text>
          <Form.Control type="text" placeholder="Enter Mobile No"
          name='Mobile'
          value={employeeData.Mobile} 
          onChange={(e) => {handleChange(e);
            handleEmployeeData(e)}} />
       </InputGroup>
        </Form.Group>
        <ErrorMessage name='Mobile' className='text-danger' component='div' />
        </Col>
        <Col sm={3} className='my-1'>
      <Form.Group  className="mb-3" controlId="formGridUserName">
        <Form.Label>User Name</Form.Label>
        <InputGroup >
        <InputGroup.Text id="basic-addon1">
        <FaUser style={{ color: '#FFAB91' }}/>
            
        </InputGroup.Text>
        <Form.Control placeholder="Enter User Name"
        type='text'
        name='UserName'
        value={employeeData.UserName} 
        onChange={(e) => {handleChange(e);
          handleEmployeeData(e)}} />
        </InputGroup>
      </Form.Group>
      <ErrorMessage name='UserName' className='text-danger' component='div' />
      </Col>
      <Col sm={3} className='my-1'>
      <Form.Group  className="mb-3" controlId="formGridPassword">
        <Form.Label>Password</Form.Label>
        <InputGroup >
        <InputGroup.Text id="basic-addon1">
        <FaLock style={{ color: '#FFAB91' }}/>
            
        </InputGroup.Text>
        <Form.Control placeholder=""
        type='password'
        name='Password'
        value={employeeData.Password} 
        onChange={(e) => {handleChange(e);
          handleEmployeeData(e)}} />
        </InputGroup>
      </Form.Group>
      <ErrorMessage name='Password' className='text-danger' component='div' />
      </Col>
      </Row>

      <Row className="mb-3">
      <Col sm={3} className='my-1'>
        <Form.Group as={Col} controlId="formGridconfirmpassword">
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup >
        <InputGroup.Text id="basic-addon1">
        <FaLock style={{ color: '#FFAB91' }} />
            
        </InputGroup.Text>
          <Form.Control
          type='password'
          name='ConfirmPassword'
          value={employeeData.ConfirmPassword} 
          onChange={(e) => {handleChange(e);
            handleEmployeeData(e)}} />
          </InputGroup>
        </Form.Group>
        <ErrorMessage name='ConfirmPassword' className='text-danger' component='div' />
        </Col>
              </Row>

      
      <Button variant="outline-success" className="rounded-pill" onClick={(e) => handleSubmit(e)}  type="submit"  > 
      <ImCheckmark /> &nbsp;
      {text}</Button>
      &nbsp; &nbsp;
      <Button variant="outline-danger" className="rounded-pill" onClick={(e) => handleCancel(e)} type="submit"> 
      <ImCross /> &nbsp; BACK</Button>
    </Form>
    )}
    </Formik>
    </Card>
    
        
        


      
    </div>
    </div>
    
      
    
  )
}

export default EmployeeAdd;
