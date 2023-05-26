import { useState } from 'react';
import { Link } from 'react-router-dom';

import css from './ProductsList.module.css';

const ProductsList = ({ products }) => {
  // eslint-disable-next-line no-unused-vars
  const [addedToCart, setAddedToCart] = useState(
    JSON.parse(localStorage.getItem('cart')) || []
  );

  const handleAddToCart = product => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.push(product);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    setAddedToCart(cartItems);
  };

  const isAddedToCart = product => {
    return addedToCart.some(
      clickedProduct => clickedProduct._id === product._id
    );
  };

  return (
    <>
      <ul className={css.list}>
        {products.map(product => {
          return (
            <li key={product._id} className={css.listItem}>
              <img
                className={css.image}
                src={product.imgURL}
                alt="product"
                width={250}
              />
              <p>{product.name}</p>
              <p>{product.price} UAH</p>

              {isAddedToCart(product) ? (
                <Link to="/cart" className={css.link}>
                  Go to Cart
                </Link>
              ) : (
                <button
                  onClick={() => handleAddToCart(product)}
                  className={css.button}
                >
                  Add to Cart
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ProductsList;
