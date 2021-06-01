import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Views/Home';
import AdminHome from './Views/Admin/AdminHome';
import AdminTable from './Views/Admin/AdminTable';
import AdminAdd from './Views/Admin/AdminAdd';
import AdminEdit from './Views/Admin/AdminEdit';
import ManagerHome from './Views/Manager/ManagerHome';
import RegisterHome from './Views/Register/RegisterHome';
import VisualizerHome from './Views/Visualizer/VisualizerHome';
import ErrorPage from './Views/Error';

class Index extends React.Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
            <Switch>
              <Route path="/" component={Home} exact/>
              <Route exact path="/Admin" component={AdminHome}/>
              <Route path="/Admin/Table" component={AdminTable}/>
              <Route path="/Admin/Add" component={AdminAdd}/>
              <Route path="/Admin/Edit" component={AdminEdit}/>
              <Route path="/Manager" component={ManagerHome}/>
              <Route path="/Register" component={RegisterHome}/>
              <Route path="/Visualizer" component={VisualizerHome}/>
              <Route component={ErrorPage}/>
            </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Index/>
  </React.StrictMode>,
  document.getElementById('root')
);

