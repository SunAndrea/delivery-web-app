import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import css from './ShoppingCart.module.css';
import { postOrder } from 'API/api';
const ShoppingCart = () => {
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

  const handleDeleteItem = productId => {
    const updatedCartItems = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedCartItems);

    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    address: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    address: Yup.string().required('Address is required'),
  });

  const handleSubmit = async values => {
    const data = {
      deliveryData: values,
      productsData: cartItems,
      totalPrice,
    };
    await postOrder(data);
    setCartItems([]);

    setTotalPrice(0);
    localStorage.removeItem('cart');

    localStorage.setItem('selectedShop', null);
    values.name = '';
    values.email = '';
    values.phone = '';
    values.address = '';
    navigate('/');
  };

  return (
    <div className={css.wrapper}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={css.form}>
          <label className={css.label} htmlFor="name">
            Name
          </label>
          <Field
            className={css.input}
            id="name"
            name="name"
            placeholder="Jane"
          />
          <ErrorMessage
            name="name"
            component="div"
            className={css.errorMessage}
          />

          <label className={css.label} htmlFor="email">
            Email
          </label>
          <Field
            className={css.input}
            id="email"
            type="email"
            name="email"
            placeholder="jane@acme.com"
          />
          <ErrorMessage
            name="email"
            component="div"
            className={css.errorMessage}
          />

          <label className={css.label} htmlFor="phone">
            Phone
          </label>
          <Field
            className={css.input}
            id="phone"
            name="phone"
            placeholder="+380999999999"
          />
          <ErrorMessage
            name="phone"
            component="div"
            className={css.errorMessage}
          />

          <label className={css.label} htmlFor="address">
            Address
          </label>
          <Field
            className={css.input}
            id="address"
            name="address"
            placeholder="123 Main Street, New York"
          />
          <ErrorMessage
            name="address"
            component="div"
            className={css.errorMessage}
          />

          {cartItems.length > 0 && (
            <button className={css.button} type="submit">
              Submit
            </button>
          )}
        </Form>
      </Formik>

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
                />
                <p>{name}</p>
                <div className={css.descriptionWrapper}>
                  <div className={css.inputContainer}>
                    <button
                      onClick={() => handleQuantityChange(_id, quantity - 1)}
                      className={css.buttonInput}
                      disabled={quantity === 1 && true}
                    >
                      -
                    </button>
                    <input
                      className={css.quantityInput}
                      onChange={e => handleQuantityChange(_id, e.target.value)}
                      type="number"
                      min="1"
                      value={quantity}
                      readOnly
                    />
                    <button
                      onClick={() => handleQuantityChange(_id, quantity + 1)}
                      className={css.buttonInput}
                    >
                      +
                    </button>
                  </div>
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
