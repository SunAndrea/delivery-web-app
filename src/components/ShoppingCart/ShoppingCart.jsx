import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './ShoppingCart.module.css';
import { postOrder } from 'API/api';
const ShoppingCart = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cart')) || []
  );
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (cartItems.length === 0) {
      localStorage.setItem('selectedShop', null);
    }
    const calculatedTotalPrice = cartItems.reduce(
      (total, { price, quantity }) => total + price * quantity,
      0
    );
    setTotalPrice(calculatedTotalPrice);
  }, [cartItems]);
  const navigate = useNavigate();

  const handleQuantityChange = (productId, quantity) => {
    const updatedCartItems = cartItems.map(item => {
      if (item._id === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);

    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleDeleteItem = productId => {
    const updatedCartItems = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedCartItems);

    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = {
      deliveryData: formData,
      productsData: cartItems,
      totalPrice,
    };
    await postOrder(data);
    setCartItems([]);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
    });
    setTotalPrice(0);
    localStorage.setItem('cart', null);
    navigate('/');
  };

  return (
    <div className={css.wrapper}>
      <form onSubmit={handleSubmit} className={css.form}>
        <label className={css.label}>Name</label>
        <input
          className={css.input}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label className={css.label}>Email</label>
        <input
          className={css.input}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label className={css.label}>Phone</label>
        <input
          className={css.input}
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <label className={css.label}>Address</label>
        <input
          className={css.input}
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <button className={css.button} type="submit">
          send
        </button>
      </form>
      <div style={{ position: 'relative' }}>
        <ul className={css.list}>
          {cartItems.map(({ _id, imgURL, name, quantity, price }) => {
            return (
              <li className={css.listItem} key={_id}>
                <img
                  className={css.image}
                  src={imgURL}
                  alt="product"
                  width={250}
                  height={209}
                />
                <h2>{name}</h2>
                <div>
                  <input
                    onChange={e => handleQuantityChange(_id, e.target.value)}
                    type="number"
                    min="1"
                    value={quantity}
                  />
                  <p>{price * quantity} UAH</p>
                  <button
                    style={{ backgroundColor: 'red' }}
                    className={css.button}
                    onClick={() => handleDeleteItem(_id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        {cartItems.length > 0 && (
          <p className={css.totalPrice}>Total price: {totalPrice} UAH</p>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
