import React from 'react';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import sessionCheck from '../../utils/SessionCheck';
import TopButtons from '../../Components/TopButtons';
import crypter from '../../utils/encryption';

import Button from '@material-ui/core/Button';
import Select from 'react-select'
import TextField from '@material-ui/core/TextField';


function AdminEdit() {  

  let history = useHistory();
  var userId = {};
  var [resData, setresData] = useState([]);

  const selectOptions = [
    { value: 'role', label: 'Role'},
    { value: 'admin', label: 'Administrator'},
    { value: 'medic', label: 'Medic'},
    { value: 'assistant', label: 'Assistant'}
  ];

  var [user, setUser] = useState({
    name:"",
    lastname:"",
    id:"",
    user:"",
    password:"",
    repeatPassword:"",
    role: { value: 'role', label: 'Role'},
  });

  var [users, setUsers] = useState([]);

  useEffect(onStart,[]);

  async function onStart() {
    sessionCheck.SessionCheck('adminUser','/Admin',history.push);
    userId = history.location.state;
    LoadUserInfo();
  }

  function LoadUserInfo() {
    var params = JSON.parse(localStorage.getItem('adminUser'));
    params['checkUser'] = userId.USER;

    axios.post("http://localhost:4000/Admin/getDetailUser",JSON.stringify(params),
    {
      "headers":{"content-type":"application/json"},
    })
    .then(async (res) => {
      setresData(res.data[0]);
      resData = res.data[0];
      var backup = user;
      
      backup["name"] = resData["NAME"];
      backup["lastname"] = resData["LASTNAME"];
      backup["id"] = resData["ID"].toString();
      backup["user"] = await crypter.decrypt(resData["USER"]);
      backup["password"] = await crypter.decrypt(resData["PASSWORD"]);
      backup["repeatPassword"] = await crypter.decrypt(resData["PASSWORD"]); 
      setUser(backup);

      if (resData["ROLE"] === "admin") {
        const value = { value: 'admin', label: 'Administrator'};
        setUser({...user, role: value});
      } else if (resData["ROLE"] === "medic") {
        const value = { value: 'medic', label: 'Medic'};
        setUser({...user, role: value});
      } else if (resData["ROLE"] === "assistant") {
        const value = { value: 'assistant', label: 'Assistant'};
        setUser({...user, role: value});
      }

    })
    .catch((error) => {
      alert(error);
    });
  }

  function handleChange(form, value) {

    if (form === "name"){
      setUser({...user, name: value});
    }
    if (form === "lastname"){
      setUser({...user, lastname: value});
    }
    if (form === "id"){
      setUser({...user, id: value});
    }
    if (form === "user"){
      setUser({...user, user: value});
    }
    if (form === "password"){
      setUser({...user, password: value});
    }
    if (form === "repeatpassword"){
      setUser({...user, repeatPassword: value});
    }
    if (form === "role"){
      setUser({...user, role: value});
    }
    
  }

  async function onSubmit() {
    updateUsers();
    
    if(!await checkDuplicate() && !checkEmpty()) {

      var params = JSON.parse(localStorage.getItem('adminUser'));
      params = {
        "user": params.user,
        "password": params.password,
        "NAME": user.name,
        "LASTNAME": user.lastname,
        "ID": await crypter.encrypt(user.id),
        "NEWUSER": await crypter.encrypt(user.user),
        "NEWPASSWORD": await crypter.encrypt(user.password),
        "ROLE": user.role.value,
        "OLDUSER" : resData["USER"]
      }

      sessionCheck.SessionCheck('adminUser','/Admin',history.push);
      await axios.post('http://localhost:4000/Admin/editUser',JSON.stringify(params),
      {
        "headers":{"content-type":"application/json"}
      })
      .then((res) => {
        if (res.data) {
          alert('user add: success');
          userId["USER"] = user.user;
          LoadUserInfo();
        } else {
          alert('user add: failed');
        }
      })
      .catch((error) => {
        alert(error);
      });

    }
  }

  async function updateUsers() {
    
    sessionCheck.SessionCheck('adminUser','/Admin',history.push);
    await axios.post('http://localhost:4000/Admin/getUsers',localStorage.getItem('adminUser'),
    {
      "headers":{"content-type":"application/json"},
    })
    .then((res) => {
      setUsers(res.data);
    })
    .catch((error) => {
      alert(error)
    }); 
  }

  async function checkDuplicate() {
    for (var i=0;i<users.length; i++) {
      if ((parseInt(user.id) === users[i]['ID']) && (resData["ID"] !== users[i]["ID"])){
        alert('duplicated id');
        return true
      }

      if ((user.user === users[i]['USER']) && (await crypter.decrypt(resData["USER"]) !== users[i]["USER"])){
        alert('duplicate user');
        return true
      }
    }
    return false
  }
  
  function checkEmpty() {
   
    if (user.name === "") {
      alert('Empty name!')
      return true;
    } else if (user.lastname === "") {
      alert('Empty lastname');
      return true;
    } else if (user.id === "") {
      alert('Empty id');
      return true;
    } else if (!isInteger(user.id)) {
      alert('Only numbers on Id');
      return true;
    }else if (user.user === "") {
      alert('Empty user');
      return true;
    } else if (user.password === "") {
      alert('Empty password');
      return true;
    } else if (user.role.value === "role") {
      alert('Empty role');
      return true;
    } else {
      return false;
    }
  }

  function isInteger(value) {
    return /^\d+$/.test(value);
  }
  
  return (
    <div style={{left:'0%',top:'0%',height:'100%', width:'100%',zIndex:'10000',position:'absolute'}}>
        <TopButtons.AdminTopButtons/>
        <div style={{height:'85%', width:'100%', top:'15%',left:'0%', position:"absolute"}}>
          <TextField
            style={{left: '10%', top: '8%', position:"absolute"}}
            value={user.name}
            onChange={(value) => {handleChange("name",value.target.value)}}
            label = "Name"
            placeholder = "ex: David"
            helperText = "max 100 characters"
          />
          <TextField
            style={{left: '40%', top: '8%', position:"absolute"}}
            value={user.lastname}
            onChange={(value) => {handleChange("lastname",value.target.value)}}
            label = "Lastname"
            placeholder = "ex: Ruiz"
            helperText = "max 100 characters"
          />
          <TextField
            style={{left: '70%', top: '8%', position:"absolute"}}
            value={user.id}
            onChange={(value) => {handleChange("id",value.target.value)}}
            label = "ID"
            placeholder = "ex: 1234567890"
            helperText = "max 10 characters"
          />
          <TextField
            style={{left: '10%', top: '30%', position:"absolute"}}
            value={user.user}
            onChange={(value) => {handleChange("user",value.target.value)}}
            label = "User"
            placeholder = "ex: druize"
            helperText = "max 100 characters"
          />
          <TextField
            style={{left: '40%', top: '30%', position:"absolute"}}
            value={user.password}
            onChange={(value) => {handleChange("password",value.target.value)}}
            type = 'password'
            label = "Password"
            placeholder = "ex: druize"
            helperText = "max 100 characters"
          />
          <TextField
            style={{left: '70%', top: '30%', position:"absolute"}}
            value={user.repeatPassword}
            onChange={(value) => {handleChange("repeatpassword",value.target.value)}}
            type = 'password'
            label = "Repeat Password"
            placeholder = "ex: druize"
            helperText = "max 100 characters"
          />
          <div style={{left:'10%', top:'50%',position:"absolute", height:'30px', width:'200px'}}>
          <Select
            options={selectOptions}
            value={user.role}
            onChange={(value) => {handleChange("role", value)}}
          />
          </div>
          <Button style={{left:'40%',top:'50%', position:"absolute"}} variant='contained' onClick={onSubmit}>Submit</Button>
        </div>
    </div>
  );
}

export default AdminEdit;