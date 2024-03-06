import React, { useEffect } from 'react';
import {  useState } from "react";
import axios from "axios";
import { Button, Card, Col,  Form,InputGroup, Row } from "react-bootstrap";
import { FaUser , FaGlobe, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaRupeeSign} from "react-icons/fa";
import {  ImCheckmark , ImCross } from "react-icons/im";
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import {Formik, ErrorMessage} from 'formik';
import * as yup from 'yup';



function ClientAdd() {

  const schema = yup.object().shape({
    ClientName:yup.string().required(),
    Address:yup.string().required(),
    Email:yup.string().email('Invalid email').required('Required'),
    ContactPerson:yup.string().required(),
    PhoneNumber:yup.number().required(),
    
  });  
  let  clientEditID = useParams();
  let navigate = useNavigate();
 const[records, setRecords] = useState([])
    const [text, setText] = useState('SAVE');    
    const [isEditing,setIsEditing]=useState(false);
    const [clientData, setClientData] = useState(
        {
            ClientId:"",
            ClientName:"",
            Address:"",
            GST:"",
            Website:"",
            Email:"",
            ContactPerson:"",
            PhoneNumber:"",
            CreatedBy:""
        });
        const handleCancel = () =>
        {
            setClientData({
                ClientId:"",
            ClientName:"",
            Address:"",
            GST:"",
            Website:"",
            Email:"",
            ContactPerson:"",
            PhoneNumber:"",
            CreatedBy:""

            })
            
            navigate('/Client');
        }

        const handleClientData = (e) => {

            setClientData({...clientData,[e.target.name]:e.target.value});
        };
        const handleSave = () => {

          // e.preventDefault();
            const data = {
                clientId:0,
            clientName:clientData.ClientName,
            address:clientData.Address,
            gst:clientData.GST,
            website:clientData.Website,
            email:clientData.Email,
            contactPerson:clientData.ContactPerson,
            phoneNumber:clientData.PhoneNumber,
            createdBy:1

            }

            Swal.fire({
                title: "Do you want to save?",
                showCancelButton: true,
                confirmButtonText: "Save",
              }).then((result) => {
                if (result.isConfirmed) {
                 
                  axios.post('http://catodotest.elevadosoftwares.com/Client/InsertClient',data)
                  .then((res)=>{
                    Swal.fire("Saved!", "", "success");
                    handleCancel();
                                
                
                }) ;
            }else if (result.isDenied) {
                Swal.fire("Details are not saved", "", "info");
              }
            });
            
        }


      function LoadEditClientById()
  {
    const fetchData = async () => {
      axios
        .get(
          "http://catodotest.elevadosoftwares.com//Client/GetAllClientDetails"
        )
        .then((res) => {
          setRecords(res.data.clientList);
          let result = (res.data.clientList).filter((item)=> item.clientId === parseInt(clientEditID.id)); 
          console.log(result)
         
           result.map(rec => {
            setClientData({ ...clientData, ClientId: rec.clientId, ClientName: rec.clientName,
              phone: rec.phone, Address: rec.address,GST:rec.gst,Website:rec.website,Email:rec.email, ContactPerson:rec.contactPerson,PhoneNumber:rec.phoneNumber,CreatedBy:rec.createdBy})
     });

     setText('UPDATE');
     setIsEditing(true);

           
        })

        .catch((err) => console.log(err));
    };
    fetchData();
  }
  
 useEffect(() => {
if(clientEditID.id===undefined)
{
  setText('SAVE')
}
else
{
  setText('UPDATE')

  LoadEditClientById();
}
 
  }, []);


  const handleSubmit = (e) => {
   // alert("hi")
    if(isEditing)
    {
      handleUpdate(e)
    }else{
     
      handleSave(e);
    }
  }
     
    const handleUpdate = () =>{

    //   e.preventDefault();
      const data = {
        clientId:clientData.ClientId,
            clientName:clientData.ClientName,
            address:clientData.Address,
            gst:clientData.GST,
            website:clientData.Website,
            email:clientData.Email,
            contactPerson:clientData.ContactPerson,
            phoneNumber:clientData.PhoneNumber,
            createdBy:1
          
    
    
    }
    Swal.fire({
    title: "Do you want to update?",
    showCancelButton: true,
    confirmButtonText: "Update",
    }).then((result) => {
    if (result.isConfirmed) {
    
    axios.post('http://catodotest.elevadosoftwares.com/Client/InsertClient',data)
    .then((res)=>{
      Swal.fire("updated successfully!", "", "success");
      handleCancel();
    LoadEditClientById();
    
    
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
      initialValues={clientData}
      enableReinitialize >
        {({handleSubmit,handleChange})=>(

        <Form noValidate style={{margin:"2rem"}}>
      <Row className="align-items-center">
        <Col sm={3} className='my-1'>
        <Form.Group  controlId="formGridClientName">
          <Form.Label>Client Name*</Form.Label>
          <InputGroup >
        <InputGroup.Text id="basic-addon1">
        <FaUser style={{ color: '#FFAB91' }}/>
            
        </InputGroup.Text>
          <Form.Control 
          type="text" 
          placeholder="Enter client Name"
          name='ClientName'
          value={clientData.ClientName} 
          onChange={(e) => {handleChange(e);
            handleClientData(e)}} />
        </InputGroup>
        </Form.Group>
        <ErrorMessage name='ClientName' className='text-danger' component="div" />
        </Col>
        <Col sm={3} className='my-1'>
        <Form.Group  controlId="formGridAddress">
          <Form.Label>Address</Form.Label>
          <InputGroup >
        <InputGroup.Text id="basic-addon1">
        < FaMapMarkerAlt style={{ color: '#FFAB91' }}/>
            
        </InputGroup.Text>
          <Form.Control type="text" placeholder="Enter Address"
          name='Address'
          value={clientData.Address} 
          onChange={(e) => {handleChange(e);
            handleClientData(e)}}/>
       </InputGroup>
        </Form.Group>
        <ErrorMessage name='Address' className='text-danger' component='div' />
        </Col>
        <Col sm={3} className='my-1'>
      <Form.Group  className="mb-3" controlId="formGridGST">
        <Form.Label>GST</Form.Label>
        <InputGroup >
        <InputGroup.Text id="basic-addon1">
        <FaRupeeSign style={{ color: '#FFAB91' }}/>
            
        </InputGroup.Text>
        <Form.Control placeholder="Enter GST"
        type='text'
        name='GST'
        value={clientData.GST} 
        onChange={(e) =>  handleClientData(e)} />
        </InputGroup>
      </Form.Group>
      
      </Col>
      <Col sm={3} className='my-1'>
      <Form.Group  className="mb-3" controlId="formGridWebsite">
        <Form.Label>Website</Form.Label>
        <InputGroup >
        <InputGroup.Text id="basic-addon1">
        <FaGlobe style={{ color: '#FFAB91' }}/>
            
        </InputGroup.Text>
        <Form.Control placeholder=""
        type='text'
        name='Website'
        value={clientData.Website} 
        onChange={(e) => 
          handleClientData(e)} />
        </InputGroup>
      </Form.Group>
      </Col>
      </Row>

      <Row className="mb-3">
      <Col sm={3} className='my-1'>
        <Form.Group as={Col} controlId="formGridemail">
          <Form.Label>Email</Form.Label>
          <InputGroup >
        <InputGroup.Text id="basic-addon1">
        <FaEnvelope style={{ color: '#FFAB91' }} />
            
        </InputGroup.Text>
          <Form.Control
          type='email'
          name='Email'
          value={clientData.Email} 
          onChange={(e) => {handleChange(e);
            handleClientData(e)}} />
          </InputGroup>
        </Form.Group>
        <ErrorMessage name='Email' className='text-danger' component='div' />
        </Col>
        <Col sm={3} className='my-1'>
        <Form.Group as={Col} controlId="formGridContactPerson">
          <Form.Label>Contact Person</Form.Label>
          <InputGroup >
        <InputGroup.Text id="basic-addon1">
        <FaUser style={{ color: '#FFAB91' }}/>
            
        </InputGroup.Text>
          <Form.Control 
          type='text'
          name='ContactPerson'
          value={clientData.ContactPerson} 
          onChange={(e) => {handleChange(e);
            handleClientData(e)}}/>
          </InputGroup>
        </Form.Group>
        <ErrorMessage name='ContactPerson' className='text-danger' component='div' />
        
        </Col>
      
        <Col sm={3} className='my-1'>
      <Form.Group as={Col} controlId="formGridPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <InputGroup >
        <InputGroup.Text id="basic-addon1">
        <FaPhoneAlt style={{ color: '#FFAB91' }}/>
            
        </InputGroup.Text>
          <Form.Control 
          type='text'
          name='PhoneNumber'
          value={clientData.PhoneNumber} 
          onChange={(e) => {handleChange(e);
            handleClientData(e)}}/>
          </InputGroup>
          <ErrorMessage name='PhoneNumber' className='text-danger' component='div' />
        </Form.Group>
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

export default ClientAdd;
