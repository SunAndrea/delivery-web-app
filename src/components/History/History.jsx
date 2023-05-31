import { getOrdersHistory } from 'API/api';
import { useState } from 'react';
import css from './History.module.css';

const History = () => {
  const [phone, setPhone] = useState('');
  const [history, setHistory] = useState([]);

  const handleChange = async e => {
    setPhone(e.target.value);

    const data = await getOrdersHistory(e.target.value);
    setHistory(data);
  };

  const formatDateTime = dateTime => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(dateTime).toLocaleString('en-US', options);
  };

  return (
    <div className={css.container}>
      <label className={css.label}>Find orders by phone</label>
      <input
        className={css.input}
        onChange={handleChange}
        value={phone}
        placeholder="+380"
        type="text"
      ></input>
      <ul className={css.historyList}>
        {history.map(item => {
          return (
            <li className={css.historyItem} key={item._id}>
              {item.productsData.map(product => {
                return (
                  <div key={product._id} className={css.historyProduct}>
                    <img
                      className={css.historyImage}
                      src={product.imgURL}
                      width={150}
                      alt="food"
                    />
                    <p className={css.historyName}>{product.name}</p>
                    <p className={css.historyQuantity}>
                      {product.price}/per piece
                    </p>
                    <p className={css.historyQuantity}>
                      quantity:{product.quantity}
                    </p>
                  </div>
                );
              })}
              <p className={css.historyTotalPrice}>
                Total Price:{item.totalPrice}
              </p>
              <p>Created At: {formatDateTime(item.createdAt)}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default History;
