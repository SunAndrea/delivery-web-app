import { Route, Routes } from 'react-router';

import ShopsPage from 'pages/ShopsPage';
import Navigation from './Navigation/Navigation';
import ShoppingCart from './ShoppingCart/ShoppingCart';
export const App = () => {


 

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<ShopsPage />} />
        <Route
          path="/cart"
          element={<ShoppingCart />}
        />
      </Routes>
    </>
  );
};
