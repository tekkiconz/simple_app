import axios from "axios";

export const submitOrder = async (orderItems) => {
  return axios
    .post("http://localhost:3000/orders", {
      orderItems,
    })
    .then(({ data }) => data);
};
