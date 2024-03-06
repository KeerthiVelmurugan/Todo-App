import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaRegFileExcel, FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button, Card,  Form } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import Swal from 'sweetalert2';
import { ExportToExcel } from './ExportToExcel';





function Client() {
    
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
          name: "C.ID",
          selector:(row) =>row.clientId,
          sortable: "true",
      },
      {
          name:"Client Name",
          selector: (row) => row.clientName,
          sortable: "true",
      },
      

      {
          name:"Address",
          selector:(row) => row.address,
          sortable:"true",
      },

      {
        name:"Website",
        selector: (row) => row.website,
        sortable:"true",
      },
      {

        name:"GST",
        selector:(row) => row.gst,
        sortable:"true",
      },
      {
          name:"Email",
          selector:(row) => row.email,
          sortable:"true",
      },
      {
          name:"Contact person",
          selector:(row) => row.contactPerson,
          sortable:"true",
      },
      {
          name:"Phone Number",
          selector: (row) => row.phoneNumber,
          sortable: "true",
      },
      {
          name: "ACTIONS",
          cell: (row) => (
              <div>
                  <Link to = {`/ClientAdd/${row.clientId}`}>
                  
                      <BsFillPencilFill />
                  </Link>
                  &nbsp;
                  <Button variant="outline-danger" onClick={() => handleDelete(row.clientId)}>
                      <BsFillTrashFill />
                  </Button>
              </div>
          ),
  
      },
  ];
  
  const [records, setRecords] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [inputs, setInputs] = useState([]);
  let navigate = useNavigate();
  const fileName = "myFile";

  function LoadClient()
  {
      const fetData = async () => {
          axios
          .get(`http://catodotest.elevadosoftwares.com//Client/GetAllClientDetails
          `)
          .then((res)=> {
              setRecords(res.data.clientList);
              setFilterList(res.data.clientList);
          })
          .catch((err) => console.log(err));
          setFilterList((Prev) => [...Prev,records])
      };
      fetData();
  }

  useEffect(() => {

      LoadClient();
  },[]);

  function handleFilter(e) {

      const newList = filterList.filter((row) => {

          return row.clientName.toLowerCase().includes(e.target.value.toLowerCase())

      });
      setRecords(newList);
  }
  

   const handleDelete = (val) =>
   {
    const cliId=val;
    setInputs({...inputs, id:val});
    console.log(cliId)
    Swal.fire({
      title:"Are you sure want to delete?",
      showCancelButton:true,
      confirmButtonText:"Yes"
    }).then((result) => {
      if(result.isConfirmed){
        Swal.fire({
          inputLabel:"Remarks",
          input:"text",
          showCancelButton:true,
          confirmButtonText:"ADD"
        

        }).then((res) => {
          if(res.isConfirmed)
          {
            console.log(inputs)
            const data = {
              clientId:cliId,
              removedRemarks:res.value,
              createdBy:1
            }
            axios.post('http://catodotest.elevadosoftwares.com/Client/RemoveClient',data)
            .then(res =>{
              Swal.fire("Deleted successfully!","","success");
              LoadClient();
            })
          }
          else{
            Swal.fire("Not Deleted!","","success");
          }
        });
      }
      else if(result.isDenied) {
        Swal.fire("Canceled", "", "info");
      }
    })
    
   }

   


    
  return (
    
    <div style={{backgroundColor:"#fffff5"}} className='mt-2'>
    <h3>Client Master</h3>
    <div style={{margin:'5rem'}}>
      
        <Card>
            <Form style={{margin:'2rem'}}>
                <Link to = '/ClientAdd'>
    <Button variant="success" className="rounded-pill"   type="submit"  > 
      <FaPlus /> &nbsp;
      ADD NEW</Button>
      </Link>
      &nbsp; &nbsp; &nbsp;
      
        <ExportToExcel apiData={records} fileName = {fileName} />
      
      
       &nbsp;
       &nbsp;
       &nbsp;
      <Button variant="danger" className="rounded-pill"  onClick={() => navigate('/')} type="submit"  > 
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


    
    
  )
}

export default Client;
