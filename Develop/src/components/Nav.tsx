import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '10px' }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/">Home</Link>
        <Link to="/potential-candidates">Potential Candidates</Link>
      </div>
    </nav>
  );
};

export default Nav;
