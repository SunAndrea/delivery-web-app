import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Link = styled(NavLink)`
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: #120b3d;
  font-weight: 500;

  &.active {
    color: #a70960;
  }
`;

const Navigation = () => {
  return (
    <header
      style={{
        width: '100%',
        padding: '10px 0 15px 0',
        boxShadow: '0px 5px 5px -5px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Link to="/">Shop</Link>
      <Link to="/cart">Shopping Cart</Link>
      <Link to="/history">History</Link>
    </header>
  );
};

export default Navigation;
