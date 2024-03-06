
import './App.css';
import { Route, Routes,useLocation } from 'react-router-dom';
import Login from './components/Login';
import Category from './components/Category';
import Client from './components/Client';
import ClientAdd from './components/ClientAdd';
import Employee from './components/Employee';
import EmployeeAdd from './components/EmployeeAdd';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import TaskAllocation from './components/TaskAllocation';
import TaskAdd from './components/TaskAdd';
import EmpWiseTask from './components/EmpWiseTask';
import EmpWiseTaskStatus from './components/EmpWiseTaskStatus';

function App() {
  const location = useLocation();
  return (
    <div className='App'>
        
     
      {/* <Menu/> */}
      {location.pathname!=='/' && <Menu/>}
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/Category' element = {<Category/>}></Route>
          <Route path='/Client' element= {<Client />}></Route>
          <Route path='/ClientAdd' element = {<ClientAdd />}></Route>
          <Route path="/ClientAdd/:id" element={<ClientAdd />}></Route>
          <Route path='/Employee' element = {<Employee />}></Route>
          <Route path='/EmployeeAdd' element = {<EmployeeAdd />}></Route>
          <Route path='/EmployeeAdd/:id' element = {<EmployeeAdd />}></Route>
          {/* <Route path='/Menu' element ={<Menu/>}></Route> */}
          <Route path='/Dashboard' element = {<Dashboard />}></Route>
          <Route path='/TaskAllocation' element = {<TaskAllocation />}></Route>
          <Route path='/TaskAdd' element = {<TaskAdd />}></Route>
          <Route path='/EmpWiseTask' element = {<EmpWiseTask />}></Route>
          <Route path='/EmpWiseTaskStatus' element = {<EmpWiseTaskStatus />}></Route>
        </Routes>
     
    </div>
    
  );
}

export default App;
