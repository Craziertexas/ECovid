import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import LogInStyle from '../Styles/LogInsStyles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowIcon from '@material-ui/icons/ArrowDropUpOutlined';

import crypter from '../utils/encryption';
import Logo from '../Icons/covid-19.png';


function AdminLogin() {

  var [User, SetUser] = useState("");
  var [Password, SetPassword] = useState("");

  let history = useHistory();

  function onUserInput(value) {
    SetUser(value.target.value);
  }

  function onPasswordInput(value) {
    SetPassword(value.target.value);
  }

  async function onLoginClick() {
    
    var params = {
      user: await crypter.encrypt(User),
      password: await crypter.encrypt(Password),
      role: 'admin',
      timestamp: Date.now()
    };

    params = JSON.stringify(params);

    axios.post("http://localhost:4000/Login/checkUser",params,
    {
      "headers":{"content-type":"application/json"},
    })
    .then((res) => {
      if(res.data) {
        localStorage.setItem('adminUser', params);
        history.push("/Admin/Table");
      } else {
        alert('Incorrect user or pasword');
      }
    })
    .catch((error) => {
      alert(error);
    })
    
  }

  return(
    <div style={LogInStyle.AdminLoginStyle}>
      <div style={{left:"calc(50% - 60px)", top:"5%", position:"relative"}}>
        <img src={Logo}/>
      </div>
      <div style={{left:"calc(50% - 110px)",top:"10%",position:"relative"}}>
        <TextField label="User" onChange={onUserInput} value={User}/>
      </div>
      <div style={{left:"calc(50% - 110px)",top:"15%",position:"relative"}}>
        <TextField label="Password" type="password" onChange={onPasswordInput} value={Password}/>
      </div>
      <div style={{left:"calc(50% - 33px)",top:"25%",position:"relative"}}>
        <Button endIcon={<ArrowIcon/>} onClick={onLoginClick}>LogIn</Button>
      </div>
    </div>
  );
}

function RegisterLogin() {

  var [User, SetUser] = useState("");
  var [Password, SetPassword] = useState("");

  let history = useHistory();

  function onUserInput(value) {
    SetUser(value.target.value);
  }

  function onPasswordInput(value) {
    SetPassword(value.target.value);
  }

  async function onLoginClick() {
    
    var params = {
      user: await crypter.encrypt(User),
      password: await crypter.encrypt(Password),
      role: 'assistant',
      timestamp: Date.now()
    };

    params = JSON.stringify(params);

    axios.post("http://localhost:4000/Login/checkUser",params,
    {
      "headers":{"content-type":"application/json"},
    })
    .then((res) => {
      if(res.data) {
        localStorage.setItem('assistantUser', params);
        history.push("/Register/Table");
      } else {
        alert('Incorrect user or pasword');
      }
    })
    .catch((error) => {
      alert(error);
    })
    
  }

  return(
    <div style={LogInStyle.AdminLoginStyle}>
      <div style={{left:"calc(50% - 60px)", top:"5%", position:"relative"}}>
        <img src={Logo}/>
      </div>
      <div style={{left:"calc(50% - 110px)",top:"10%",position:"relative"}}>
        <TextField label="User" onChange={onUserInput} value={User}/>
      </div>
      <div style={{left:"calc(50% - 110px)",top:"15%",position:"relative"}}>
        <TextField label="Password" type="password" onChange={onPasswordInput} value={Password}/>
      </div>
      <div style={{left:"calc(50% - 33px)",top:"25%",position:"relative"}}>
        <Button endIcon={<ArrowIcon/>} onClick={onLoginClick}>LogIn</Button>
      </div>
    </div>
  );
}

export default {AdminLogin, RegisterLogin};