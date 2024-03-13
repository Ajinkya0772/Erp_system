import { Route, Routes, useNavigate } from "react-router";
import Dashboard from "./components/Dashboard";
import OrderManagement from "./components/OrderManagement";
import ProductManagement from "./components/ProductManagement";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";

const App = () => {
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  const updateProductsCount = (count) => {
    setProductsCount(count);
  };

  const updateOrdersCount = (count) => {
    setOrdersCount(count);
  };

  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <Dashboard
              productsCount={productsCount}
              ordersCount={ordersCount}
            />
          }
        />
        <Route
          path="/products"
          element={
            <ProductManagement updateProductsCount={updateProductsCount} />
          }
        />
        <Route
          path="/orders"
          element={<OrderManagement updateOrdersCount={updateOrdersCount} />}
        />
      </Route>
    </Routes>
  );
};
export default App;
