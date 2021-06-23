import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
//引用组件
import Home from './views/Home';
import About from './views/About';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div class="test">
        <HashRouter>
          <Switch>
            <Route exact component={Home} path="/"></Route>
            <Route component={About} path="/about"></Route>
          </Switch>
        </HashRouter>
      </div>
    )
  }
}

export default App;
