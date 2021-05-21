import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Views/Home';
import AdminHome from './Views/Admin/AdminHome';
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
              <Route path="/Admin" component={AdminHome}/>
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

