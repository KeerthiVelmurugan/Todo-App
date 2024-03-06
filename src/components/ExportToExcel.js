import React from 'react';
import * as FileSaver from "file-saver";
import *as XLSX from "xlsx";
import { Button } from 'react-bootstrap';
import { FaRegFileExcel } from "react-icons/fa";

export const ExportToExcel = ({apiData, fileName}) => {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheet.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const exportToCSV = (apiData,fileName) => {
      const ws =XLSX.utils.json_to_sheet(apiData);
      const wb = {Sheets:{data:ws}, SheetNames:["data"]};
      const excelBuffer = XLSX.write(wb,{booktype:"xlsx", type:"array"});
      const data = new Blob([excelBuffer], {type:fileType});
      FileSaver.saveAs(data,fileName+fileExtension);
    };
    return (
        <Button variant='primary'className="rounded-pill" onClick={(e) => exportToCSV(apiData,fileName)}>
            
            <FaRegFileExcel />
            &nbsp; &nbsp;
            EXCEL</Button>
    )
   };