import axios from 'axios';

export async function getProducts(shop) {
  try {
    const response = await axios.get(
      `https://delivery-back-end.onrender.com/api/products/${shop}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function postOrder(order) {
  try {
    const response = await axios.post(
      `https://delivery-back-end.onrender.com/api/orders/`,
      order
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
