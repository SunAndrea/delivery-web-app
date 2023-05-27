import { useState } from 'react';
import css from './Shops.module.css';
const shopsNames = [
  { name: 'Mc Donny', id: '1' },
  { name: 'CFK', id: '2' },
  { name: 'Burger King', id: '3' },
];

const Shops = ({ onClick, cartItems }) => {
  const [selectedShop, setSelectedShop] = useState(
    JSON.parse(localStorage.getItem('selectedShop')) || null
  );

  const handleButtonClick = shopName => {
    setSelectedShop(shopName);
    onClick(shopName);
    localStorage.setItem('selectedShop', JSON.stringify(shopName));
  };
  return (
    <div className={css.container}>
      <h2>shops</h2>
      <ul className={css.list}>
        {shopsNames.map(shop => (
          <li key={shop.id} className={css.listItem}>
            <button
              onClick={() => handleButtonClick(shop.name)}
              className={css.button}
              disabled={
                selectedShop !== shop.name &&
                selectedShop !== null &&
                cartItems.length > 0
              }
            >
              {shop.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Shops;
