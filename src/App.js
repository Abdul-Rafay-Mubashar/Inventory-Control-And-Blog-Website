import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css';
import AddBlog from './AddBlog';
import Welcome from './Welcome';
import SideBar from './SideBar';
import AddItems from './AddItems';
import ViewBlog from './ViewBlog';
import ViewItem from './ViewItem';
import ViewSpecificBlog from './ViewSpecificBlog';
import Update from './Update';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/AddBlog" component={AddBlog} />
        <Route path="/AddItems" component={AddItems} />
        <Route path="/ViewItem" component={ViewItem} />
        <Route path="/ViewBlog" component={ViewBlog} />
        <Route path="/ViewSpecificBlog" component={ViewSpecificBlog} />
        <Route path="/UpdateItem" component={Update} />
        {/* <Route path="/Welcome" component={Welcome} /> */}
      </Switch>
    </Router>
  );
}

export default App;







