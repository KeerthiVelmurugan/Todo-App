import React, { useEffect, useState } from 'react';
import { Button, Card,  Col,  Form, Row } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import axios from "axios";
import { FaSearch, FaRegFileExcel, FaPlus, FaEdit, FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { ExportToExcel } from './ExportToExcel';

function TaskAllocation() {
    let navigate=useNavigate();
    const [records, setRecords] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const fileName ="TaskAllocation";
    const [employeeData, setEmployeeData] = useState([]);
    const [allocationData, setAllocationData] = useState({
      
      FromDate: "",
    ToDate: "",
    PageNumber: "",
    PageSize:"",
    SearchString: ""
    })
    let key = "Add";
    

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
            name: "#",
            selector:(row) =>row.allocationId,
            sortable: "true",
        },
        {
          name: "Assigned to",
          selector:(row) =>row.employeeName,
          sortable: "true",
      },
        {
            name:"Client",
            selector: (row) => row.clientName,
            sortable: "true",
        },
        
  
        {
            name:"Category",
            selector:(row) => row.category,
            sortable:"true",
        },
  
        {
          name:"Description",
          selector: (row) => row.description,
          sortable:"true",
        },
        {
  
          name:"Scheduled Date",
          selector:(row) => row.scheduledDate,
          sortable:"true",
        },
        {
            name:"Due Date",
            selector:(row) => row.dueDate,
            sortable:"true",
        },
        {
            name:"Status",
            selector:(row) => row.status,
            sortable:"true",
        },
        {
            name: "ACTIONS",
            cell: (row) => (
                <div>
                    {/* <Link to={`/TaskAdd/id=${row.allocationId}&key=${'Edit'}`}>
                     
                        <BsFillPencilFill />
                        </Link> */}
                        <Button variant="outline-success" onClick={()=>handleView(row.allocationId)} >
                        <FaEye />
                    </Button>
                    &nbsp;
                    <Button variant="outline-primary" onClick={()=>handleEdit(row.allocationId)} >
                        <FaEdit />
                    </Button>
                </div>
            ),
    
        },
    ];

    const handleallocationData = (e) => {
      setAllocationData({...allocationData, [e.target.name]:e.target.value});
    }

    useEffect(() => {
      axios
      .get('http://catodotest.elevadosoftwares.com/Employee/GetAllEmployeeDetails')
      .then((result) => result.data.employeeList).then((val) => setEmployeeData(val))
    },[])

    function LoadTaskAllocation()
    {
      const fetData = async () => {
        const data ={
          
          fromDate: "2024-01-01",
    toDate: "2024-11-01",
    pageNumber: 1,
    pageSize:10,
    searchString: ""
        }
        axios
        .post('http://catodotest.elevadosoftwares.com//Allocation/GetAllAllocationDetails',data)
        .then((res) => {
          setRecords(res.data.allocationList);
          setFilterList(res.data.allocationList);
        })
        .catch((err) => console.log(err));
        setFilterList((Prev) => [...Prev,records])
      };
      fetData();
    }
    useEffect(() => {
      LoadTaskAllocation();
    },[]);

    function handleFilter(e) {

      const newList = filterList.filter((row) => {

          return row.name.toLowercase().includes(e.target.value.toLowercase())

      });
      setRecords(newList);
  }

  
  const handleAdd = () => {
    let key = "Add";
    let queryParameter = new URLSearchParams
    ({
      key:key
    });
    let addd = `/TaskAdd?${queryParameter.toString()}`;
    navigate(addd)
    console.log(key);
  }

  const handleView = (val) => {
    let key = "View";
    let Id = val;
    let queryParameter = new URLSearchParams
    ({
      id:Id,
      key:key    
    
    });
    let vieww = `/TaskAdd?${queryParameter.toString()}`;
    navigate(vieww)

  }
  
  const handleEdit = (val) => {
    let key="Edit";
    let Id=val;
    let queryParameter=new URLSearchParams
    ({
      id:Id,
      key:key
    });
    let editt=`/TaskAdd?${queryParameter.toString()}`;
      navigate(editt)
    // console.log();
  }

  return (
    <div style={{backgroundColor:"#fffff5"}} className='mt-2'>
    <h3>Task Allocation</h3>
    <div style={{margin:'5rem'}}>
        <Card>
        <Form style={{margin:'2rem'}}>
          <Row className='mb-3'>
            <Col sm={3} className='my-1'>
            <Form.Group as={Col} controlId="formGridScheduledDate">
          <Form.Label>Scheduled From Date</Form.Label>
          <Form.Control 
          type='date'
          name='ScheduledDate'

        />
        </Form.Group>
        </Col>
        <Col sm={3} className='my-1'>
        <Form.Group as={Col} controlId="formGridDueDate">
          <Form.Label>To Date</Form.Label>
          <Form.Control 
          type='date'
          name='DueDate'
        />
        </Form.Group>
        </Col>
        </Row>
        <Row className="align-items-center">
        <Col sm={3} className='my-1'>
        <Form.Group  className="mb-3" controlId="formGridclient">
        <Form.Label>Status</Form.Label>
        <Form.Select type='select'
          name='ClientId'
       >
          <option>select</option>
          <option>Yet to start</option>
          <option>In Progress</option>
          <option>Completed</option>
      </Form.Select>
      </Form.Group>
      </Col>
      <Col sm={3} className='my-1'>
      <Form.Group  className="mb-3" controlId="formGridWebsite">
        <Form.Label>Assigned to</Form.Label>
      <Form.Select
      type='select'
      name='EmployeeId'
      value={allocationData.EmployeeId}
      onChange={(e) => handleallocationData(e)}
      
      >
        <option>Select Employee</option>
        {
          employeeData.map((opts,i) =>
          <option value={opts.employeeId}>{opts.employeeName}</option>)
        }
  
     </Form.Select>
      </Form.Group>
      </Col>

      </Row>

      <Button variant="outline-warning" className="rounded-pill"   type="submit"  > 
      <FaSearch /> &nbsp;
      SEARCH</Button>
      &nbsp;
      &nbsp;
           
    
    <Button variant="outline-success" className="rounded-pill" onClick={ () => handleAdd()}   > 
      <FaPlus  /> &nbsp; 
      ADD NEW</Button>
      
      &nbsp; &nbsp;
      <ExportToExcel apiData={records} fileName = {fileName} />
       &nbsp;
       
      
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

export default TaskAllocation;
