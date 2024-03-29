import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import AllHosts from './components/AllHosts';
import AddHost from './components/AddHost';
import HostDetails from './components/HostDetails';
import EditHost from './components/EditHost';
import { authenticate } from './store/session';
import AllHounds from './components/AllHounds';
import AddHound from './components/AddHound';
import HoundDetails from './components/HoundDetails';
import EditHound from './components/EditHound';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/log-in' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
          <ProtectedRoute
          path='/add-host'
          exact={true}>
          <AddHost />
        </ProtectedRoute>
          <Route
          path='/add-hound'
          exact={true}>
          <AddHound />
        </Route>
        <ProtectedRoute
          path='/host/:hostId/edit'
          exact={true}>
          <EditHost />
        </ProtectedRoute>
        <ProtectedRoute
          path='/hound/:houndId/edit'
          exact={true}>
          <EditHound />
        </ProtectedRoute>
        <Route exact path='/host/:hostId'>
          <HostDetails />
        </Route>
        <Route exact path='/hound/:houndId'>
          <HoundDetails />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path="/hounds" exact={true}>
          <AllHounds />
        </Route>
        <Route path='/' exact={true} >
         <AllHosts />
        </Route>
        <Route exact path='/404'>
          <h1>404 Error: Not found</h1>
        </Route>
        <Route exact path='/403'>
          <h1>403 Error: Forbidden</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
