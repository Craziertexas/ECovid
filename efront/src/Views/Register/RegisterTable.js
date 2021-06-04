import React from 'react';
import sessionCheck from '../../utils/SessionCheck';
import TopButtons from '../../Components/TopButtons';
import Charts from '../../Components/Charts';

class AdminTable extends React.Component {
  
  componentDidMount() {
    sessionCheck.SessionCheck('assistantUser','/Register',this.props.history.push);
  }

  render() {
    return (
      <div style={{left:'0%',top:'0%',height:'100%', width:'100%',zIndex:'10000',position:'absolute'}}>
        <TopButtons.RegisterTopButtons/>
        <Charts.RegisterChart/>
      </div>
    );
  }
}

export default AdminTable;