import { getProducts } from 'API/api';
import ProductsList from 'components/ProductsList/ProductsList';
import { useEffect, useState } from 'react';

const { default: Shops } = require('components/Shops/Shops');

const ShopsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedShop] = useState(
    JSON.parse(localStorage.getItem('selectedShop')) || null
  );
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
      <Shops onClick={onShopClick}></Shops>
      <ProductsList products={products}></ProductsList>
    </div>
  );
};

export default ShopsPage;
