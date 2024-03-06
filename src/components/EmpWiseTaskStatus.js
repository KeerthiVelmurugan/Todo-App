import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { Button} from "react-bootstrap";
import {  FaRedoAlt, FaUndoAlt } from "react-icons/fa";
import DataTable from 'react-data-table-component';


function EmpWiseTaskStatus() {
  const location = useLocation();
  const queryParameter = new URLSearchParams(location.search)
  const employeeId = queryParameter.get('employeeId')
  const taskStatus = queryParameter.get('taskStatus')
  const [records, setRecords] = useState([]);
  let navigate = useNavigate();
  

  const customStyles = {
    rows: {
      style: {
        minHeight: "35px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "4px",
        paddingRight: "4px",
        backgroundColor: "white",
        color: "black",
        textTransform: "uppercase",
        fontWeight: "700",
        
      },
    },
    cells: {
      style: {
        paddingLeft: "3px",
        paddingRight: "3px",
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
      name:"Client",
      selector: (row) => row.clientName,
      sortable: "true",
  },
    {
      name: "Assigned to",
      selector:(row) =>row.employeeName,
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
                {(taskStatus!=="Yet to Start") && (
              <Button variant="outline-success" className='rounded-pill' onClick={ () =>handleUndo(row.allocationId,row.employeeId,row.status)} >
                <FaUndoAlt />
                    
              </Button>
                )}
                &nbsp;
                {(taskStatus!=="Completed") && (
              <Button variant="outline-primary" className='rounded-pill' onClick={() =>handleUpdate(row.allocationId,row.employeeId,row.status)} >
                <FaRedoAlt />
                    
              </Button>
                )}
            </div>
        ),

    },
];


  function LoadEmpWiseTask(api)
  {
    
    const fetchData = async () => {
      const data = {
        employeeId: parseInt(employeeId),
        fromDate: "2023-01-01",
        toDate: "2024-11-01",
        pageNumber: 1,
        pageSize: 10,
        searchString: "",

      }
      axios
      .post(api,data)
      .then((res) => {
        if(taskStatus==="Yet to Start")
        {
        setRecords(res.data.yetToStartAllocation);
        }else if(taskStatus==="InProgress")
        {
          setRecords(res.data.inProgressAllocation);
        } else if(taskStatus==="Completed")
        {
          setRecords(res.data.completedAllocation);
        }else if(taskStatus==="InCompleted")
        {
          setRecords(res.data.incompletedAllocationById);
        }
        
        console.log(res)
      })
      .catch((err) =>console.log(err));

    };
    fetchData();
    
  }



  useEffect (() => {
    if(taskStatus==='Yet to Start')
    {
      let api = 'http://catodotest.elevadosoftwares.com/Allocation/GetYetToStartAllocationByEmpId';
        LoadEmpWiseTask(api);
    }
    else if(taskStatus==='InProgress')
    {
      let api= `http://catodotest.elevadosoftwares.com/Allocation/GetInProgressAllocationByEmpId`;
      LoadEmpWiseTask(api);
      
    }
    else if(taskStatus==='Completed')
    {
      let api=`http://catodotest.elevadosoftwares.com/Allocation/GetCompletedAllocationByEmpId`;
      LoadEmpWiseTask(api)
    }
    else if(taskStatus==='InCompleted')
    {
      let api=`http://catodotest.elevadosoftwares.com/Allocation/GetInCompletedAllocationByEmpId`;
      LoadEmpWiseTask(api)
    }
  },[]);



  const handleUpdate = (id,eId,stat) =>
  {
   let allocId =id;
   let empId = eId;
   let status = stat;

    const data ={
      allocationId:allocId,
      employeeId:empId,
      status:status
    }
    axios
    .post(`http://catodotest.elevadosoftwares.com/Allocation/UpdateStatus`,data)
    navigate('/EmpWiseTask')
  }

  const handleUndo = (id,eId,stat) =>
  {
    let allocId =id;
   let empId = eId;
   let status = stat;

    const data ={
      allocationId:allocId,
      employeeId:empId,
      status:status
    }
    axios
    .post(`http://catodotest.elevadosoftwares.com/Allocation/UndoUpdateStatus`,data)
    navigate('/EmpWiseTask')
  }

  return (
    <div>
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


>

</input>

}
subHeaderAlign="right">

</DataTable>
    </div>
  )
}

export default EmpWiseTaskStatus;
