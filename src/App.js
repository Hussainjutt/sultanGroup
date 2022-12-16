import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./app/pages/home";
import Prodeucts from "./app/pages/products";
import AboutUs from "./app/pages/aboutUs";
import Services from "./app/pages/services";
import Contact from "./app/pages/contact";
import Blogs from "./app/pages/blogs";
import Blog from "./app/pages/blogs/components/preview";
import Dashboard from "./app/pages/dashboard";
import CreateBlog from "./app/pages/blogsInfo/createBlog";
import AllBlogs from "./app/pages/blogsInfo/AllBlogs";
import BlogsDraft from "./app/pages/blogsInfo/draft";
import CreateProduct from "./app/pages/productsInfo/createProduct";
import Login from "./app/pages/auth/login";
import Profile from "./app/pages/profile";
import AllProducts from "./app/pages/productsInfo/AllProducts";
import ProductDraft from "./app/pages/productsInfo/draft";
import Gallery from "./app/pages/gallery";
import TermsConditions from "./app/pages/terms&conditions";
import Faqs from "./app/pages/faqs";
import PrivacyPolicy from "./app/pages/privacyPolicy";
import ContactList from "./app/pages/contactList";
import { Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [load, setLoad] = useState(true);
  setTimeout(() => {
    setLoad(false);
  }, 1500);
  const ProtectedRoute = ({ children }) => {
    if (!localStorage.getItem("isAdmin")) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return false ? (
    <Spinner
      size="lg"
      variant="dark"
      style={{ position: "absolute", top: "50%", left: "50%" }}
      animation="grow"
    />
  ) : (
    <>
      <ToastContainer autoClose={1000} theme="colored" pauseOnHover={true} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Prodeucts />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services:type" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:category" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/terms&conditions" element={<TermsConditions />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-blog"
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-blogs"
            element={
              <ProtectedRoute>
                <AllBlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs-draft"
            element={
              <ProtectedRoute>
                <BlogsDraft />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-blog/:id"
            element={
              <ProtectedRoute>
                <CreateBlog forEdit={true} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-products"
            element={
              <ProtectedRoute>
                <AllProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-product"
            element={
              <ProtectedRoute>
                <CreateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-product/:id"
            element={
              <ProtectedRoute>
                <CreateProduct forEdit={true} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products-draft"
            element={
              <ProtectedRoute>
                <ProductDraft />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gallery"
            element={
              <ProtectedRoute>
                <Gallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact-list"
            element={
              <ProtectedRoute>
                <ContactList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
