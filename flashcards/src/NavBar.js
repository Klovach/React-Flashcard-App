import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container'>
                <span className='navbar-brand' href='#'>
                    My Flashcards
                </span>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                    <div className='navbar-nav'>
                        <Link to='/' className='nav-item nav-link'>
                            Home
                        </Link>
                        <Link to='/new' className='nav-item nav-link'>
                            Create
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
