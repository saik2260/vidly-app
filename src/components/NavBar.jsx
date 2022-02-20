import React, { Component } from 'react';
import { Router, NavLink } from 'react-router-dom'
import Movies from './movies';


class NavBar extends React.Component {
    render() {
        const { user } = this.props
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">Vidly</NavLink>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className='navbar-nav'>
                            <NavLink className='nav-item nav-link' to="/movies">Movies</NavLink>
                            <NavLink className='nav-item nav-link' to="/customers">Customers</NavLink>
                            <NavLink className='nav-item nav-link' to="/rentals">Rentals</NavLink>
                            {!user &&
                                <React.Fragment>
                                    <NavLink className='nav-item nav-link' to="/login">Login</NavLink>
                                    <NavLink className='nav-item nav-link' to="/register">Register</NavLink>
                                </React.Fragment>
                            }
                            {user &&
                                <React.Fragment>
                                    <NavLink className='nav-item nav-link' to="/profile">{user.name}</NavLink>
                                    <NavLink className='nav-item nav-link' to="/logout">Logout</NavLink>
                                </React.Fragment>
                            }
                        </div>
                    </div>
                </div>
            </nav>


        );
    }
}

export default NavBar;