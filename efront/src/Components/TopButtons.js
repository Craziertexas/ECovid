import React from 'react';
import {useHistory} from 'react-router-dom';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PersonIcon from '@material-ui/icons/Person';
import AssesmentIcon from '@material-ui/icons/Assessment';
import AssignmentIcon from '@material-ui/icons/Assignment';

import BarStyles from '../Styles/BarStyles';
import Particles from 'react-tsparticles';

import Background from '../Styles/BackgroundStyles';

function HomeTopButtons() {

  let history = useHistory();
  
  function onAdminClick(){
    history.push("/Admin");
  }

  function onRegisterClick(){
    history.push("/Register");
  }

  function onManagerCLick(){
    history.push("/Manager");
  }

  return (
    <div>
      <div style={BarStyles.HomeTopBarStyle}/>
      <Particles width="100%" height="15%" style={{position:"absolute"}} options={Background.HomeParticlesBackground}/>
      <div style={{left:"calc(50% - 200px)",top:"calc(5% - 10px)",zIndex:"100", position:"absolute"}}>
        <ButtonGroup color="primary" aria-label="large outlined primary button group">
          <Button endIcon={<PersonIcon/>} onClick={onAdminClick}>Administration</Button>
          <Button endIcon={<AssesmentIcon/>} onClick={onRegisterClick}>Register</Button>
          <Button endIcon={<AssignmentIcon/>} onClick={onManagerCLick}>Manager</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default {HomeTopButtons};