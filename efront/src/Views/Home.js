import React from 'react';
import TopButtons from '../Components/TopButtons';

class Home extends React.Component {

  render() {
    return (
      <div style={{left:"0%", top:"0%", width:"100%", height:"100%", position:"absolute"}}>
        <TopButtons.HomeTopButtons/>
      </div>
    );
  }
}

export default Home;
