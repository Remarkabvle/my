import "./App.css";

import { Route, Routes, useLocation } from "react-router-dom";

import Admin from "./pages/Admin/Admin";
import Create from "./pages/Admin/create/Create";
import CreateProduct from "./pages/Admin/createProduct/CreateProduct";
import Customer from "./pages/Admin/Customer/Customer";
import Customers from "./pages/Admin/customers/Customers";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Profile from "./pages/Admin/profile/Profile";
import Seller from "./pages/Admin/seller/Seller";
import Sellers from "./pages/Admin/sellers/Sellers";
import Storage from "./pages/Admin/storage/Storage";
import { useState } from "react";

function App() {
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== "/" && <Header setMenu={setMenu} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin menu={menu} />}>
          <Route path="customers" element={<Customers />} />
          <Route path="customer/:id" element={<Customer />} />
          <Route path="storage" element={<Storage />} />
          <Route path="sellers" element={<Sellers />} />
          <Route path="seller/:id" element={<Seller />} />
          <Route path="create" element={<Create />} />
          <Route path="createProduct" element={<CreateProduct />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
