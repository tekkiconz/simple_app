import { useLayoutEffect, useState } from "react";
import { getProducts } from "./services/product";
import ProductItem from "./components/ProductItem";
import { submitOrder } from "./services/order";

function App() {
  const [products, setProducts] = useState([]);
  const [order, setOrderData] = useState(null);
  console.log(products);
  const [selectedProduct, setSelectedProducts] = useState({});

  const onChangeQuantity = (productId, quantity) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  useLayoutEffect(() => {
    getProducts().then((fetchedProduct) => setProducts(fetchedProduct));
  }, []);

  const sendOrder = async () => {
    const payload = Object.entries(selectedProduct).map(([key, value]) => ({
      productId: key,
      quantity: value,
    }));
    const data = await submitOrder(payload);
    setOrderData(data);
  };

  const findItemTotal = (productId) => {
    if (!order) {
      return null;
    }
    const itemIndex = order.orderItems.findIndex(
      ({ product: { productId: currentProductId } }) =>
        productId === currentProductId
    );

    if (itemIndex < 0) {
      return null;
    }
    return order.orderItems[itemIndex].total;
  };

  return (
    <div>
      <div>
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.productId}
            onChangeQuantity={onChangeQuantity}
            amount={selectedProduct[product.productId] || 0}
            total={findItemTotal(product.productId)}
          />
        ))}
      </div>
      <button onClick={sendOrder}>Check</button>
      {order?.total && (
        <div>
          <p>Total cost of the order is {order.total}</p>
        </div>
      )}
    </div>
  );
}

export default App;
