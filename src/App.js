import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import auth from './services/authService'
import Movies from './components/movies'
import NavBar from './components/NavBar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import Movie from './components/movie';
import NotFound from './components/not-found';
import LoginForm from './components/loginForm';
import MovieForm from './components/movieForm';
import RegisterForm from './components/registerForm';
import Logout from './components/logout';
import ProtectedRoute from './components/common/protectedRoute';

class App extends React.Component {
  state = {
  }

  componentDidMount = () => {
    try {
      const user = auth.getCurrentUser()
      this.setState({ user })
    }
    catch (e) {

    }
  }

  render() {
    const { user } = this.state
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <div className="content" className='body'>
          <Switch>
            <Route path="/customers" component={Customers} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/movies/new" exact component={MovieForm} />
            <Route path="/movies"
              render={props => <Movies {...props} user={user} />} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact
              render={props => <Movies {...props} user={this.state.user} />} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
