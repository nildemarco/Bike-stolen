import React from 'react';
import logo from '../assets/logoPolice.png';

const Nav = () => {
    return (
        <nav>
        <img className="img-nav" alt="Logo police" src={logo} />
        <div>
          <h1><a href="/" >Police Departament of Berlin</a></h1>
          <h5>Stolen Bikes</h5>
        </div>
      </nav>
    );
}
export default Nav;