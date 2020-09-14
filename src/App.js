import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Order from './Components/Order/Order';
import Manage from './Components/Manage/Manage';
import NotFound from './Components/NotFound/NotFound';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Shipment from './Components/Shipment/Shipment';
import Login from './Components/Login/Login';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';


export const UserContext = createContext();
function App() {
  const [loggedInUser,setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser,setLoggedInUser]}>
      <h3>Email: {loggedInUser.email}</h3>
      <Router>
      <Header></Header>
        <Switch>
          <Route path='/shop'>
            <Shop></Shop>
          </Route>
          <Route path='/order'> 
              <Order></Order>
          </Route>
          <PrivateRoute path='/manage'>
              <Manage></Manage>
          </PrivateRoute>
          <PrivateRoute path='/shipment'>
              <Shipment></Shipment>
          </PrivateRoute>
          <Route path='/login'>
             <Login></Login>
          </Route>
          <Route exact path = '/'>
            <Shop></Shop>
          </Route>
          <Route path='/product/:productKey'>
                <ProductDetail></ProductDetail>
          </Route>
          <Route path='*'>
             <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
