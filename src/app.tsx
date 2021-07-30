import { Home } from 'component/home';
import { Page1 } from 'component/page1';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './style/index.less';

const Routers = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/page1" exact={true} component={Page1} />
          <Route render={() => <Redirect to="/404" />} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

ReactDOM.render(<Routers />, document.getElementById('root'));
