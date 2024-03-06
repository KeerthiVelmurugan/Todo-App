import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button, Card, Col, Form,InputGroup, Row } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { GoChevronRight } from "react-icons/go";
import { FaFileAlt,FaListAlt } from "react-icons/fa";
import {  ImCheckmark , ImCross } from "react-icons/im";
import Swal from 'sweetalert2';
import {Formik,ErrorMessage} from 'formik';
import * as yup from 'yup';


const customStyles = {
    rows: {
      style: {
        backgroundColor:"black",
        minHeight: "50px",
      },
    },
   
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        backgroundColor: "grey",
        color: "black",
        textTransform: "uppercase",
        fontWeight: "750",
        
      },
    },
    cells: {
      style: {
        backgroundColor:'white',
        paddingLeft: "6px",
        paddingRight: "6px",
      },
    },
  };

function Category() {
  const [text, setText]=useState('SAVE');
const [isEditing,setIsEditing]=useState(false);
const [records, setRecords] = useState([]);
const [filterList, setFilterList] = useState([]);
const [newCategory, setNewCategory] = useState(
    {
        CategoryId:"",
        Category: "",
        Description :"",
        CreatedBy:""
    });
  const [inputs, setInputs] = useState({
    id:""
  })

  
  const schema = yup.object().shape({
    Category: yup.string().required(),
    Description:yup.string().required(),
  });

const column =[
    {
        name: "S.No",
        selector:(row) =>row.categoryId,
        sortable: "true",
    },
    {
        name:"CATEGORY",
        selector: (row) => row.category,
        sortable: "true",
    },
    {
        name:"DESCRIPTION",
        selector: (row) => row.description,
        sortable: "true",
    },
    {
        name: "ACTIONS",
        cell: (row) => (
            <div>

                <Button variant="outline-success" onClick={() => handleEdit(row.categoryId)}>
                    <BsFillPencilFill />
                </Button>
                &nbsp;
                <Button variant="outline-danger" onClick={() => handleDelete(row.categoryId)}>
                    <BsFillTrashFill />
                </Button>
            </div>
        ),

    },
];


function LoadCategory()
{
    const fetcData = async () => {
        axios
        .get(`http://catodotest.elevadosoftwares.com/Category/GetAllCategories`)
        .then((res) => {
            setRecords(res.data.categoryList);
            console.log(records)
            setFilterList(res.data.categoryList);
        })

        .catch((err) => console.log(err));
        setFilterList((prev) => [...prev, records]);
    };
    fetcData();
}

useEffect(() => {

   LoadCategory();
},[]);

function handleFilter(e) {

    const newList = filterList.filter((row) => {

        return row.category.toLowerCase().includes(e.target.value.toLowerCase())
    });
    setRecords(newList);
}


    
const handleCancel = (e) =>
{
    setNewCategory({
        CategoryId:"",
        Category: "",
        Description: "",
        CreatedBy:""
    })
}
    
const handlenewCategory = (e) => {

        setNewCategory({...newCategory,[e.target.name]:e.target.value});
    };
    
    
const handleSave = () => {
      //  e.preventDefault();
        const data = {

            categoryId:0,
            category:newCategory.Category,
            description:newCategory.Description,
            createdBy:1


}
Swal.fire({
    title: "Do you want to save?",
    showCancelButton: true,
    confirmButtonText: "Save",
  }).then((result) => {
    if (result.isConfirmed) {
     
      axios.post('http://catodotest.elevadosoftwares.com/Category/InsertCategory',data)
      .then((res)=>{
        Swal.fire("Saved!", "", "success");
        handleCancel();
        console.log(newCategory)
      LoadCategory();

    
    }) ;
}else if (result.isDenied) {
      Swal.fire("Details are not saved", "", "info");
    }
  });
    }


const handleEdit=(val)=>
{
  
  console.log(val)
  let result=records.filter((item)=>item.categoryId===val)
  console.log(result)
  result.map((res)=>{
   

   setNewCategory({
    CategoryId:res.categoryId,
    Category: res.category,
    Description: res.description,
    CreatedBy:res.createdBy
    
})
setText('UPDATE');
setIsEditing(true);
})
}

const handleSubmit = () => {
if(isEditing)
{
  handleUpdate()
}else{
  handleSave();
}

}

const handleUpdate = () =>{

// e.preventDefault();
  const data = {

      categoryId:newCategory.CategoryId,
      category:newCategory.Category,
      description:newCategory.Description,
      createdBy:1


}
Swal.fire({
title: "Do you want to update?",
showCancelButton: true,
confirmButtonText: "Update",
}).then((result) => {
if (result.isConfirmed) {

axios.post('http://catodotest.elevadosoftwares.com/Category/InsertCategory',data)
.then((res)=>{
  Swal.fire("updated successfully!", "", "success");
  handleCancel();
  console.log(newCategory)
LoadCategory();


}) ;
}else if (result.isDenied) {
Swal.fire("Details are not updated", "", "info");
}
});

}


const handleDelete = (val)=>
{
  const catId=val;
 setInputs({...inputs,id:val});
 console.log(catId)

  console.log(val)
  Swal.fire({
    title: "Are you sure want to delete?",
    showCancelButton: true,
    confirmButtonText: "Yes"    
    }).then((result) => {
    if (result.isConfirmed) {
       Swal.fire({
        inputLabel:"Remarks",
        input:"text",
        showCancelButton:true,
        confirmButtonText:"ADD"
      }).then((res) => {
        if(res.isConfirmed)
        {
          console.log(inputs)
        const data={
          categoryId:catId,
          removedRemarks:res.value,
          createdBy:1

        }
        console.log(data)
          axios.post('http://catodotest.elevadosoftwares.com/Category/RemoveCategory',data)
    .then((res)=>{
      Swal.fire("Deleted successfully!", "", "success");
    LoadCategory();
    })
        }
        
        else{
          Swal.fire("Not Deleted!", "", "success");
        }
      
      });
    }
  else if (result.isDenied) {
    Swal.fire(" Canceled ", "", "info");
    }
  });
}


return (
  
<>
<div  style={{backgroundColor:"#fffff5",padding:"50px 10%"}} >
  <h3>
    <Button className="rounded-circle" variant="secondary">

    <GoChevronRight />
    </Button> Category Master</h3>
    
<>
    <div style={{margin:"5rem"}} >
      <Card  >
      <Formik
    validationSchema ={schema}
    onSubmit={handleSubmit}
    initialValues ={newCategory}
    enableReinitialize >
      {({handleSubmit,handleChange})=>(
    <Form noValidate  style={{margin:"2rem"}}>
      <Row className="align-items-center">
        <Col sm={3} className="my-1" >
        <Form.Label>Category Name *</Form.Label>
        <InputGroup >
        <InputGroup.Text id="basic-addon1">
        <FaListAlt style={{color:'#FFAB91'}} />
            
        </InputGroup.Text>
        <Form.Control
        type="text"
          name="Category"
          value={newCategory.Category}
          required onChange={ (e) =>{handleChange(e);
             handlenewCategory(e)}}
          aria-label="Category"
          aria-describedby="basic-addon1"
          
        />
            </InputGroup>
            <ErrorMessage name="Category" className="text-danger" component="div"/>
      </Col>
      <Col lg={5} className="my-1" >
      
        <Form.Label>Description</Form.Label>
        <InputGroup >
        <InputGroup.Text id="basic-addon1" >
        <FaFileAlt style={{color:'#FFAB91'}} />
            </InputGroup.Text>
        <Form.Control
       as="textarea"
        type="text"
        name="Description"
        value={newCategory.Description}
        onChange={ (e) => {handleChange(e);
          handlenewCategory(e)}}
           aria-label="Description"
         aria-describedby="basic-addon1"
         
        />
      
      </InputGroup>
      <ErrorMessage name="Description" className="text-danger" component="div"/> 
    
      </Col>
  
      
      <Col xs="auto" className="my-1">
      <Button variant="outline-success" className="rounded-pill" onClick={(e) => handleSubmit(e)} type="submit"  > 
      <ImCheckmark /> &nbsp; {text}
      </Button>
      &nbsp; &nbsp;
      <Button variant="outline-danger" className="rounded-pill"  type="submit"> 
      <ImCross /> &nbsp; BACK</Button>
      </Col>
      
      </Row>
      </Form>
      )}
      </Formik>
      </Card>
    

    </div>

    <div>
        <DataTable

        columns={column}
        data={records}
        customStyles={customStyles}
        pagination
        fixedHeader
        selectableRowsHighlight
        highlightOnHover
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10,20,30]}
        subHeader
        subHeaderComponent ={

            <input
            type="text"
            className="w-10 form control"
            placeholder="Search"
            
            onChange={handleFilter}
            >

            </input>

        }
        subHeaderAlign="right">

        </DataTable>
      
    </div>
    </>
   </div>
    </>
      

  )
}

export default Category;
