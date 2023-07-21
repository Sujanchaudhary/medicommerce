import { Routes, Route } from "react-router-dom";
import AddCategory from "./admin/AddCategory";
import AddDoctor from "./admin/AddDoctor";
import AddProduct from "./admin/AddProduct";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import ProductTable from "./admin/ProductTable";

import Login from "./auth/login/login";
import Signup from "./auth/signup/signup";
import Layout from "./user/layout/layout";
import Cart from "./user/pages/cart/cart";
import Checkout from "./user/pages/cart/check-out";
import Doctor from "./user/pages/doctor/doctor";
import Home from "./user/pages/home/home";
import Profiles from "./user/pages/home/Profile";
import OrderDetails from "./user/pages/OrderDetails";
import AddPrescribtion from "./user/pages/prescribtion/AddPrescribtion";
import Product from "./user/pages/product/product";
import SingleProduct from "./user/pages/product/SingleProduct";
import AdminAppointmentTable from "./admin/AdminAppointment";
import AdminOrderTable from "./admin/OrderDetails";
import ForgetPassword from "./auth/login/ForgetPassword";
import ResetPassword from "./auth/login/ResetPassword";
import SingleProductRating from "./admin/SingleProductRating";
import Wishlist from "./user/pages/home/Wishlist";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/profile" element={<Profiles />} />

          <Route path="cart" element={<Cart />} />
          <Route path="product" element={<Product />} />
          <Route path="doctors" element={<Doctor />} />
          <Route path="wishlist" element={<Wishlist />} />

          <Route path="order-details" element={<OrderDetails />} />

          <Route path="single-product/:id" element={<SingleProduct />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="add-prescribtion" element={<AddPrescribtion />} />
        </Route>

        <Route path="/admin/" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="products" element={<ProductTable />} />
          <Route path="products/:id" element={<SingleProductRating />} />

          <Route path="adddoctor" element={<AddDoctor />} />
          <Route path="appointment" element={<AdminAppointmentTable />} />
          <Route path="addcategory" element={<AddCategory />} />
          <Route path="order" element={<AdminOrderTable />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
