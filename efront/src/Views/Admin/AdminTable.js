import React from 'react';
import sessionCheck from '../../utils/SessionCheck';
import TopButtons from '../../Components/TopButtons';
import Charts from '../../Components/Charts';

class AdminTable extends React.Component {
  
  componentDidMount() {
    sessionCheck.SessionCheck('adminUser','/Admin',this.props.history.push);
  }

  render() {
    return (
      <div style={{left:'0%',top:'0%',height:'100%', width:'100%',zIndex:'10000',position:'absolute'}}>
        <TopButtons.AdminTopButtons/>
        <Charts.AdminChart/>
      </div>
    );
  }
}

export default AdminTable;