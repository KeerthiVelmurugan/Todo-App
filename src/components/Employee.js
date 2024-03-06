import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { FaPlus, FaRegFileExcel, FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button, Card,  Form } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import Swal from 'sweetalert2';
import { ExportToExcel } from './ExportToExcel';


function Employee() {

    const customStyles = {
        rows: {
          style: {
            minHeight: "35px",
          },
        },
        headCells: {
          style: {
            paddingLeft: "8px",
            paddingRight: "8px",
            backgroundColor: "white",
            color: "black",
            textTransform: "uppercase",
            fontWeight: "700",
            
          },
        },
        cells: {
          style: {
            paddingLeft: "6px",
            paddingRight: "6px",
          },
        },
      };
  
    const column =[
        {
            name: "E.ID",
            selector:(row) =>row.employeeId,
            sortable: "true",
        },
        {
            name:"Employee Name",
            selector: (row) => row.employeeName,
            sortable: "true",
        },
        
  
        {
            name:"Mobile",
            selector:(row) => row.mobile,
            sortable:"true",
        },
  
        {
          name:"User Name",
          selector: (row) => row.userName,
          sortable:"true",
        },
        {
  
          name:"Password",
          selector:(row) => row.password,
          sortable:"true",
        },
        {
            name:"confirm Password",
            selector:(row) => row.confirmPassword,
            sortable:"true",
        },
        
        {
            name: "ACTIONS",
            cell: (row) => (
                <div>
                    <Link to = {`/EmployeeAdd/${row.employeeId}`}>
                    
                        <BsFillPencilFill />
                    </Link>
                    &nbsp;
                    <Button variant="outline-danger" onClick={() => handleDelete(row.employeeId)}>
                    
                        <BsFillTrashFill />
                        </Button>
                    
                </div>
            ),
    
        },
    ];

    const [inputs, setInputs] = useState([]);
    const [records, setRecords] = useState([]);
    const [filterList, setFilterList] = useState([]);
    let navigate = useNavigate();
    const fileName = "Emloyeelist";

    function LoadEmployee()
    {
        const fetData = async () => {

            axios
            .get(`http://catodotest.elevadosoftwares.com/Employee/GetAllEmployeeDetails
            `)
            .then((res) => {
                setRecords(res.data.employeeList);
                setFilterList(res.data.employeeList);
            })
            .catch((err) => console.log(err));
            setFilterList((prev) => [...prev,records])
        };
        fetData();
    }
        useEffect(()=> {
            LoadEmployee();
        },[]);

        function handleFilter(e) {
            const newList = filterList.filter((row) => {
                return row.employeeName.toLowerCase().includes(e.target.value.toLowerCase())

            });
            setRecords(newList);

        }

        const handleDelete = (val) =>
        {
          const empId = val;
          setInputs({...inputs, id:val});
          console.log(empId);
          Swal.fire({
            title:"Are you sure want to Delete?",
            showCancelButton:true,
            confirmButtonText:"Yes"
          }).then((result) =>{
            if (result.isConfirmed) {
              Swal.fire({
                inputLabel:"Remarks",
                input:"text",
                showCancelButton:true,
                confirmButtonText:"ADD"
              }).then((res) => {
                if(res.isConfirmed){
                  const data = {
                    employeeId:empId,
                    removedRemarks:res.value,
                    createdBy:1
                  }
                  axios.post('http://catodotest.elevadosoftwares.com/Employee/RemoveEmployee',data)
                  .then((res) => {
                    Swal.fire("Deleted successfully!", "", "success");
                    LoadEmployee();
                  })
                }
                else{
                  Swal.fire("Not Deleted!", "","success");
                }
              });
            }
            else if(result.isDenied){
              Swal.fire("Canceled","","info");
            }
          });
        }
        

        
  return (
    <div>
        <div style={{backgroundColor:"#fffff5"}} className='mt-2'>
    <h3>Employee Master</h3>
  
        
      
    <div style={{margin:'5rem'}}>
        <Card>
            <Form style={{margin:'2rem'}}>
                <Link to = '/EmployeeAdd'>
    <Button variant="success" className="rounded-pill"   type="submit"  > 
      <FaPlus /> &nbsp;
      ADD NEW</Button>
      </Link>
      &nbsp; &nbsp;
      <ExportToExcel apiData={records} fileName = {fileName} />
       &nbsp;
       &nbsp;
       
      <Button variant="danger" className="rounded-pill" onClick={() => navigate('/')}  type="submit"  > 
      <FaArrowLeft /> &nbsp;
      BACK</Button>
      
      </Form>
      </Card>
      </div>

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


    
    
      
    </div>
  )
}

export default Employee
