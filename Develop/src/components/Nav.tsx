import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <h1>Candidate Search</h1>
      <div>
        <Link to="/">Search</Link>
        <Link to="/potential-candidates">Potential Candidates</Link>
      </div>
    </nav>
  );
};

export default Nav;


