import { Route, Routes } from 'react-router';

import ShopsPage from 'pages/ShopsPage';
import Navigation from './Navigation/Navigation';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import History from './History/History';
export const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<ShopsPage />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </>
  );
};
