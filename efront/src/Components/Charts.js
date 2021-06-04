import {useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import SlidingPanel from 'react-sliding-side-panel';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import sessionCheck from '../utils/SessionCheck';

function AdminChart() {

  let history = useHistory();
  var [rows, Setrows] = useState([]);
  var [lastSel, SetlastSel] = useState([]);
  var [Selected, SetSelected] = useState([]);
  
  const columns = [
    { field: 'ID', headerName: 'ID', width: 100 },
    { field: 'NAME', headerName: 'First name', width: 200 },
    { field: 'LASTNAME', headerName: 'Last name', width: 200 },
    { field: 'USER', headerName: 'User', width: 150 },
    { field: 'ROLE', headerName: 'Role', width: 150 },
  ];
  
  async function onUpdate() {
    sessionCheck.SessionCheck('adminUser','/Admin',history.push);
    await axios.post('http://localhost:4000/Admin/getUsers',localStorage.getItem('adminUser'),
    {
      "headers":{"content-type":"application/json"},
    })
    .then((res) => {
      for (var i=0;i<res.data.length; i++) {
        res.data[i]["id"] = res.data[i]["ID"];
      }
      Setrows(res.data);
    })
    .catch((error) => {
      alert(error)
    }); 
  }

  function onAdd() {
    sessionCheck.SessionCheck('adminUser','/Admin',history.push);
    history.push("/Admin/Add");
  }

  function onEdit() {
    sessionCheck.SessionCheck('adminUser','/Admin',history.push);
    if (Selected.length === 1) {
      history.push("/Admin/Edit",lastSel);
    }else {
      alert('Add operation only for one user');
    }
  }

  async function onDelete() {
    sessionCheck.SessionCheck('adminUser','/Admin',history.push);
    if (Selected.length === 1) {
      var params = JSON.parse(localStorage.getItem('adminUser'));
      params['deleteUser'] = lastSel.USER;
      sessionCheck.SessionCheck('adminUser','/Admin',history.push);
      await axios.post('http://localhost:4000/Admin/removeUser',JSON.stringify(params),
      {
        "headers":{"content-type":"application/json"}
      })
      .then((res) => {
        if(res.data) {
          alert('delete Success');
        } else {
          alert('failed delete');
        } 
      })
      .catch((error) => {
        alert(error);
      });
    } else {
      alert('Delete operation only for one user');
    }
  }

  function onSelectRow(row) {
    SetlastSel(row.data);
  }

  function onUpdateSelectRows(rows) {
    SetSelected(rows.selectionModel);
  }

  return (
    <div style={{height:'85%', width:'100%', top:'15%',left:'0%', position:"absolute"}}>
      <div style={{left:'calc(90% - 380px)', top:'2%', zIndex:'100', position:"absolute"}}>
        <ButtonGroup aria-label="large outlined primary button group">
        <Button onClick = {onAdd} endIcon={<AddIcon/>}>Add User</Button>
        <Button onClick = {onEdit} endIcon={<EditIcon/>}>Edit User</Button>
        <Button onClick = {onDelete} endIcon={<DeleteIcon/>}>Delete User</Button>
        <Button onClick={onUpdate}>Update</Button>
        </ButtonGroup>
      </div>
      <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection onRowSelected={onSelectRow} onSelectionModelChange={onUpdateSelectRows}/>
    </div>
  );
}

function RegisterChart() {

  let history = useHistory();
  var [rows, Setrows] = useState([]);
  var [lastSel, SetlastSel] = useState([]);
  var [Selected, SetSelected] = useState([]);
  
  const columns = [
    { field: 'PATIENTID', headerName: 'Patient ID', width: 140 },
    { field: 'ID', headerName: 'Id', width: 160 },
    { field: 'NAME', headerName: 'First name', width: 150 },
    { field: 'LASTNAME', headerName: 'Last name', width: 150 },
    { field: 'SEX', headerName: 'Sex', width: 100},
    { field: 'AGE', headerName: 'Age', width:150},
    { field: 'EXAM', headerName: 'Covid Exam', width: 160 },
    { field: 'EXAMDATE', headerName: 'Exam date', width: 260}
  ];
  
  async function onUpdate() {
    sessionCheck.SessionCheck('assistantUser','/Register',history.push);
    await axios.post('http://localhost:4000/Register/getPatients',localStorage.getItem('assistantUser'),
    {
      "headers":{"content-type":"application/json"},
    })
    .then((res) => {
      for (var i=0;i<res.data.length; i++) {

        res.data[i]["id"] = res.data[i]["PATIENTID"];

        res.data[i]["AGE"] = Date.now() - res.data[i]["BIRTHDAY"];
        res.data[i]["AGE"] = new Date(res.data[i]["AGE"]).getFullYear() - 1970;

        res.data[i]["EXAMDATE"] = new Date(res.data[i]["EXAMDATE"]);
      }
      Setrows(res.data);
    })
    .catch((error) => {
      alert(error)
    }); 
  }

  function onAdd() {
    sessionCheck.SessionCheck('assistantUser','/Register',history.push);
    history.push("/Register/Add");
  }

  function onEdit() {
    sessionCheck.SessionCheck('assistantUser','/Register',history.push);
    if (Selected.length === 1) {
      history.push("/Register/Edit",lastSel);
    }else {
      alert('Add operation only for one user');
    }
  }

  async function onDelete() {
    sessionCheck.SessionCheck('assistantUser','/Register',history.push);
    if (Selected.length === 1) {
      var params = JSON.parse(localStorage.getItem('assistantUser'));
      params['PATIENTID'] = lastSel.PATIENTID;
      sessionCheck.SessionCheck('assistantUser','/Register',history.push);
      await axios.post('http://localhost:4000/Register/deletePatient',JSON.stringify(params),
      {
        "headers":{"content-type":"application/json"}
      })
      .then((res) => {
        if(res.data) {
          alert('delete Success');
        } else {
          alert('failed delete');
        } 
      })
      .catch((error) => {
        alert(error);
      });
    } else {
      alert('Delete operation only for one user');
    }
  }

  function onShowCases() {
    sessionCheck.SessionCheck('adminUser','/Admin',history.push);
    if (Selected.length === 1) {
      history.push("/Register/Cases",lastSel);
    }else {
      alert('Add operation only for one user');
    }
  }

  function onSelectRow(row) {
    SetlastSel(row.data);
  }

  function onUpdateSelectRows(rows) {
    SetSelected(rows.selectionModel);
  }

  return (
    <div style={{height: '100%', width:'100%', top:'0%',left:'0%', position:"absolute"}}>
      <div style={{left:'calc(0% + 10px)', top:'7%', zIndex:'100', position:"absolute"}}>
          <ButtonGroup aria-label="large outlined primary button group">
          <Button onClick = {onAdd} endIcon={<AddIcon/>}>Add User</Button>
          <Button onClick = {onEdit} endIcon={<EditIcon/>}>Edit User</Button>
          <Button onClick = {onDelete} endIcon={<DeleteIcon/>}>Delete User</Button>
          <Button onClick = {onShowCases}>Show Cases</Button>
          <Button onClick={onUpdate}>Update</Button>
          </ButtonGroup>
      </div>
    <div style={{height:'85%', width:'100%', top:'15%',left:'0%', position:"absolute"}}>
      <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection onRowSelected={onSelectRow} onSelectionModelChange={onUpdateSelectRows}/>
    </div>
    </div>
  );
}

function CasesChart() {

  let history = useHistory();
  var [rows, Setrows] = useState([]);
  var [lastSel, SetlastSel] = useState([]);
  var [Selected, SetSelected] = useState([]);
  var [panelIsOpen, setPanelIsOpen] = useState(true);
  var [State, setState] = useState();

  const columns = [
    { field: 'STATUS', headerName: 'Status', width: 160 },
    { field: 'LASTUPDATE', headerName: 'Last Update', width: 200 },
  ];

  const caseOptions = [
    { value: "HOME", label: "HOME"},
    { value: "HOSPITAL", label: "HOSPITAL"},
    { value: "UCI", label: "UCI"},
    { value: "HEALTHY", label: "HEALTHY"},
    { value: "DEAD", label: "DEAD"}
  ];
  
  async function onUpdate() {
    var params = JSON.parse(localStorage.getItem('assistantUser'));
    params = {
      "user": params.user,
      "password": params.password,
      "PATIENTID": history.location.state['PATIENTID']
    };
    sessionCheck.SessionCheck('assistantUser','/Register',history.push);
    await axios.post('http://localhost:4000/Cases/showCase',JSON.stringify(params),
    {
      "headers":{"content-type":"application/json"},
    })
    .then((res) => {
      for (var i=0;i<res.data.length; i++) {

        res.data[i]["id"] = res.data[i]["LASTUPDATE"];
        res.data[i]["LASTUPDATE"] = formatTimeStamp(res.data[i]["LASTUPDATE"]);

      }
      Setrows(res.data);
    })
    .catch((error) => {
      alert(error)
    }); 
  }

  async function onAdd() {
    sessionCheck.SessionCheck('assistantUser','/Register',history.push);
    if (rows[rows.length - 1]['STATUS'] !== 'DEAD') {
      var params = JSON.parse(localStorage.getItem('assistantUser'));
      params = {
        "user": params.user,
        "password": params.password,
        "PATIENTID": history.location.state['PATIENTID'],
        "STATUS": State.value,
        "LASTUPDATE": Date.now()
      };
      await axios.post('http://localhost:4000/Cases/addStatus',JSON.stringify(params),
      {
        "headers":{"content-type":"application/json"},
      })
      .then((res) => {
        if (res.data) {
          alert('Success on Add case');
          onUpdate();
        } else {
          alert('Failed on Add case');
        }
      })
      .catch((error) => {
        alert(error);
      })
    } else {
      alert("Action not allowed")
    }
  }

  function onEdit() {
    sessionCheck.SessionCheck('assistantUser','/Register',history.push);
    if (Selected.length === 1) {
      
    }else {
      alert('Edit operation only for one case');
    }
  }

  function onDelete() {
    sessionCheck.SessionCheck('assistantUser','/Register',history.push);
    if (Selected.length === 1) {
      
    }else {
      alert('Edit operation only for one case');
    }
  }
  function onSelectRow(row) {
    SetlastSel(row.data);
  }

  function onUpdateSelectRows(rows) {
    SetSelected(rows.selectionModel);
  }

  function formatTimeStamp(date) {
    date = date + + 86400000;
    date = new Date(date);
  
    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();

    return year + '-' + month  + '-' + day;
  }

  return (
    <div style={{height: '100%', width:'100%', top:'0%',left:'0%', position:"absolute"}}>
      <div style={{left:'calc(0% + 10px)', top:'7%', zIndex:'100', position:"absolute"}}>
        <ButtonGroup aria-label="large outlined primary button group">
          <Button onClick={onUpdate}>Update Cases</Button>
          <Button onClick = {onDelete}>Delete Case</Button>
        </ButtonGroup>
      </div>
      <div style={{height:'85%', width:'100%', top:'15%',left:'0%', position:"absolute"}}>
        <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection onRowSelected={onSelectRow} onSelectionModelChange={onUpdateSelectRows}/>
      </div>
      <SlidingPanel type={'left'} isOpen={panelIsOpen} size={30}>
        <div style={{zIndex:'100', left:'0%',top:'0%',height:'100%', width:'20%', backgroundColor:"white",position:"absolute"}}>
          <div style={{left:'calc(0% + 10px)', top:'7%', zIndex:'100', position:"absolute"}}>
            <ButtonGroup aria-label="large outlined primary button group">
            <Button onClick = {onAdd} endIcon={<AddIcon/>}>Add Case</Button>
            <Button onClick = {onEdit} endIcon={<EditIcon/>}>Edit Case</Button>
            </ButtonGroup>
          </div>
          <div style={{left:'100%', top:'50%', position:'absolute'}}>
            <Button onClick ={() => {setPanelIsOpen(false)}}>⋘</Button>
          </div>
        </div>
        <div style={{width:'200px',left:'2.5%', top:'50%', position:'absolute', zIndex:'100'}}>
          <Select options={caseOptions} value={State} onChange={(value) => {setState(value)}}/>
        </div>
      </SlidingPanel>
      <div style={{left:'0%', top:'50%', position:'absolute'}}>
        <Button onClick ={() => {setPanelIsOpen(true)}}>⋙</Button>
      </div>
    </div>
  );
}

export default {AdminChart, RegisterChart, CasesChart}