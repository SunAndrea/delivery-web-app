import axios from 'axios';

export async function getProducts(shop) {
  try {
    const { data } = await axios.get(
      `https://delivery-back-end.onrender.com/api/products/${shop}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function postOrder(order) {
  try {
    const { data } = await axios.post(
      `https://delivery-back-end.onrender.com/api/orders/`,
      order
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getOrdersHistory(phone) {
  try {
    const { data } = await axios.get(
      `https://delivery-back-end.onrender.com/api/orders/?phone=${phone}`
    );

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
