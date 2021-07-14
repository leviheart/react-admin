import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//引用组件
import Login from './views/login/Index.js';
//后台首页
import Index from './views/index/Index';
import PrivateRouter from './components/privateRouter/index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact component={Login} path="/"></Route>
          <PrivateRouter component={Index} path="/index"></PrivateRouter>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
