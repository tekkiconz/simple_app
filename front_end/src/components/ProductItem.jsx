/* eslint-disable react/prop-types */
const ProductItem = ({ product, onChangeQuantity, amount, total }) => {
  const { productId, name, price } = product;
  const onAdd = () => {
    onChangeQuantity(productId, amount + 1);
  };
  const onRemove = () => {
    onChangeQuantity(productId, amount - 1);
  };
  const onChange = (newAmount) => {
    onChangeQuantity(productId, newAmount);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <p>{name}</p>
      <p>{price}</p>
      <button onClick={onRemove}>-</button>
      <input value={amount} onChange={onChange} />
      <button onClick={onAdd}>+</button>
      {total && <div>Total cost of this products: ${total}</div>}
    </div>
  );
};

export default ProductItem;
