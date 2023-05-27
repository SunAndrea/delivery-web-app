import { getProducts } from 'API/api';
import ProductsList from 'components/ProductsList/ProductsList';
import { useEffect, useState } from 'react';

const { default: Shops } = require('components/Shops/Shops');

const ShopsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedShop] = useState(
    JSON.parse(localStorage.getItem('selectedShop')) || null
  );
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cart')) || []
  );

  const handleCarts = data => {
    setCartItems(data);
  };

  useEffect(() => {
    if (selectedShop) {
      onShopClick(selectedShop);
    }
  }, [selectedShop]);
  const onShopClick = async shop => {
    const data = await getProducts(shop);
    setProducts(data);
  };
  return (
    <div style={{ display: 'flex' }}>
      <Shops cartItems={cartItems} onClick={onShopClick}></Shops>
      <ProductsList
        handleCarts={handleCarts}
        products={products}
      ></ProductsList>
    </div>
  );
};

export default ShopsPage;
