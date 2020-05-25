import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './pages/index.jsx'
import Item from './pages/item/index.jsx'


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/item" component={Item}/>
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('app')
  );
