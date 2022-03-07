import React, { Component, Fragment, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import Product from './components/Products';
import { me } from './store';
import SingleProduct from './components/SingleProduct';
import ViewCart from './components/ViewCart';
import AdminUsers from './components/AdminUsers'
import ProductForm from './components/ProductForm';

/**
 * COMPONENT
 */

const Routes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const isAdmin = useSelector((state) => state.auth.isAdmin)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          {/*Admin Routes*/}
          {isAdmin &&
            <Switch>
              <Route exact path="/admin/users">
                <AdminUsers />
              </Route>
              <Route exact path="/admin/addProduct">
                <ProductForm />
              </Route>
              <Route path="/home" component={Home} />
              <Route path="/cart">
                <ViewCart />
              </Route>
              <Route path="/" exact>
                <Product />
              </Route>
              <Route exact path="/products/:productId">
                <SingleProduct />
              </Route>
              <Redirect to="/home" />
            </Switch>
          }
          {/*Non Admin Routes*/}
          <Route path="/home" component={Home} />
          <Route path="/cart">
            <ViewCart />
          </Route>
          <Route path="/" exact>
            <Product />
          </Route>
          <Route exact path="/products/:productId">
            <SingleProduct />
          </Route>
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
          {/*No Login Routes*/}
          <Route path="/" exact>
            <Product />
          </Route>
          <Route path="/cart">
            <ViewCart />
          </Route>
          <Route exact path="/products/:productId">
            <SingleProduct />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      )}
    </div>
  );
};

export default Routes;
