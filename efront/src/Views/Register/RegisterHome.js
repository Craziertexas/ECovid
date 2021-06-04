import React from 'react';
import Background from '../../Styles/BackgroundStyles';
import Login from '../../Components/LogIns';
import Particles from "react-tsparticles";
class RegisterHome extends React.Component {
  render() {
    return (
      <div style={{left:"0%",top:"0%",width:"100%", height:"100%",position:"absolute"}}>
        <Particles width="100%" height="100%" style={{position:"absolute"}} options={Background.RegisterParticlesBackground}/>
        <Login.RegisterLogin/>
      </div>
    );
  }
}

export default RegisterHome; 