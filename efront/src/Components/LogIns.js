import React, {useState} from 'react';
import LogInStyle from '../Styles/LogInsStyles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowIcon from '@material-ui/icons/ArrowDropUpOutlined';

import Logo from '../Icons/covid-19.png';

function AdminLogin() {

  var [User, SetUser] = useState("");
  var [Password, SetPassword] = useState("");

  function onUserInput(value) {
    SetUser(value.target.value);
  }

  function onPasswordInput(value) {
    SetPassword(value.target.value);
  }

  function onLoginClick() {
    console.log(User);
    console.log(Password);
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

export default {AdminLogin};