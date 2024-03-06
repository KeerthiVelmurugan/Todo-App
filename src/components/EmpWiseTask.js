import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card,  Col,  Form, Row } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import { FaSearch, FaRegFileExcel } from "react-icons/fa";
import {  useNavigate } from 'react-router';


function EmpWiseTask() {
    const customStyles = {
        rows: {
          style: {
            minHeight: "50px",
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
            selector:(row) =>row.employeeId,
            sortable: "true",
            
        },
        {
          name: "Assigned to",
          selector:(row) =>row.employeeName,
          sortable: "true",
      },
        {
            name:"Yet To start",
            cell: (row) => (
                <div>
                    <Button variant='warning' onClick={() => handleYetToStart(row.employeeId)}className='rounded-circle'>{row.yetToStartTasks}</Button>
                </div>
            ),
            sortable: "true",
        },
        
  
        {
            name:"In Progress",
            cell: (row) => (
                <div>
                    <Button variant='success' onClick={() => handleInProgress(row.employeeId)} className='rounded-circle'>{row.inProgressTasks}</Button>
                </div>
            ),
            sortable:"true",
        },
  
        {
          name:"Completed",
          cell: (row) => (
            <div>
                <Button variant='info'onClick={() => handleCompleted(row.employeeId)} className='rounded-circle'>{row.completedTasks}</Button>
            </div>
        ),
          sortable:"true",
        },
        {
  
          name:"In Completed",
          cell: (row) => (
            <div>
                <Button variant='primary'onClick={() => handleInCompleted(row.employeeId)} className='rounded-circle'>{row.inCompletedTasks}</Button>
            </div>
        ),
          sortable:"true",
        },
        
    ];
    const [records, setRecords] = useState([]);
    const [filterList, setFilterList] = useState([])
    const navigate = useNavigate();

    

    function LoadEmpWiseTaskAllocation()
    {
        const fetchData = async () => {
            const data = {
                fromDate:"",
                toDate:""
            }
            axios
            .post('http://catodotest.elevadosoftwares.com/Allocation/GetEmpWiseTaskCounts',data)
            .then((res) => {
                    setRecords(res.data.empWiseTaskCounts);
                    setFilterList(res.data.empWiseTaskCounts);
            })
            .catch((err) => console.log(err));
            setFilterList((Prev) => [...Prev,records])
        };
            fetchData();
    }
    useEffect(() => {
        LoadEmpWiseTaskAllocation();
    },[]);

    function handleFilter(e) {
        const newList = filterList.filter((row)=> {
            return row.name.toLowercase().includes(e.target.value.toLowercase())


        });
        setRecords(newList)
    }

    const handleYetToStart = (val) => {
        let status= "Yet to Start";
        let Id=val;
        let queryParameter = new URLSearchParams(
            {
                employeeId:Id,
                taskStatus:status
            });
            let yettoStart = `/EmpWiseTaskStatus?${queryParameter.toString()}`;
            navigate(yettoStart)

    }
    const handleInProgress = (val) => {
        let status = "InProgress";
        let Id=val;
        let queryParameter = new URLSearchParams(
            {
                employeeId:Id,
                taskStatus:status
            });
            let inProgress = `/EmpWiseTaskStatus?${queryParameter.toString()}`;
            navigate(inProgress)
        }
    const handleCompleted = (val) => {
        let status = "Completed";
        let Id = val;
        let queryParameter = new URLSearchParams({
            employeeId:Id,
            taskStatus:status
        });
        let completed = `/EmpWiseTaskStatus?${queryParameter.toString()}`;
        navigate(completed)
    }

    const handleInCompleted = (val) => {
        let status = "InCompleted";
        let Id = val;
        let queryParameter = new URLSearchParams({
            employeeId:Id,
            taskStatus:status
        });
        let incompleted = `/EmpWiseTaskStatus?${queryParameter.toString()}`;
        navigate(incompleted)
    }

  return (
    <div style={{backgroundColor:"#fffff5"}} className='mt-2'>
        <h3>EmpWiseTasks</h3>
        <div style={{margin:'5rem'}}>
            <Card>
                <Form style={{margin:"2rem"}}>
                    <Row className='mb-3'>
                        <Col sm={3} className='my-1'>
                            <Form.Group as={Col} controlId='formGridFromDate'>
                                <Form.Label>From Date</Form.Label>
                                <Form.Control
                                type='date'
                                name='fromDate' />
                            </Form.Group>
                        </Col>
                        <Col sm={3} className='my-1'>
                        <Form.Group as={Col} controlId='formGridToDate'>
                                <Form.Label>To Date</Form.Label>
                                <Form.Control
                                type='date'
                                name='toDate' />
                            </Form.Group>   
                        </Col>
                        <Col>
                        <Form.Label>     </Form.Label>
                        <br />                        
                        <Button variant='outline-warning' className='rounded-pill'>
                                <FaSearch />
                                &nbsp;
                                &nbsp;
                                Search
                            </Button>
                            &nbsp;
                                &nbsp;
                            <Button variant='outline-info' className='rounded-pill'>
                                <FaRegFileExcel />
                                &nbsp;
                                &nbsp;
                                Excel
                            </Button>
                            </Col>
                        </Row>
                        <Row>
                         <Col></Col>
                         <Col></Col>   
                        <Col className='my-1'>
                            
                        </Col>
                        </Row>
                    
                </Form>
            </Card>
            <DataTable

    columns={column}

    customStyles={customStyles}
    data={records}
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

export default EmpWiseTask
