import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import Home from "./app/pages/home";
import Products from "./app/pages/products";
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
import BlogsComment from "./app/pages/blogsInfo/comments";
import Login from "./app/pages/auth/login";
import Profile from "./app/pages/profile";
import AllProducts from "./app/pages/productsInfo/allProducts";
import ProductDraft from "./app/pages/productsInfo/draft";
import Quotes from "./app/pages/productsInfo/quotes";
import Gallery from "./app/pages/gallery";
import TermsConditions from "./app/pages/terms&conditions";
import Faqs from "./app/pages/faqs";
import PrivacyPolicy from "./app/pages/privacyPolicy";
import ContactList from "./app/pages/contactList";
import NewsLetters from "./app/pages/newsletters";

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
      <ToastContainer autoClose={1000} theme="dark" pauseOnHover={true} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
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
            path="/blogs-comments"
            element={
              <ProtectedRoute>
                <BlogsComment />
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
            j
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
          <Route
            path="/products-quotes"
            element={
              <ProtectedRoute>
                <Quotes />
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
          <Route
            path="/news-letters"
            element={
              <ProtectedRoute>
                <NewsLetters />
              </ProtectedRoute>
            }
          />
          {/* <Route path='*' element={
             <div
             style={{
               width: "100%",
               height: "100vh",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               padding: "0 2%",
             }}
           >
             {" "}
             <img src={Img} style={{ display: "block" }} className="col-12 col-sm-6" />
           </div>
          }/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
