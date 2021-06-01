import {useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

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
      <div style={{left:'calc(90% - 360px)', top:'2%', zIndex:'100', position:"absolute"}}>
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

export default {AdminChart}