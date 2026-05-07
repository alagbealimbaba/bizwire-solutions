import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/loading";
import Homepage from "./components/Home/Home";
import AboutUs from "./components/About Us/AboutUs";
import InformationServices from "./components/Home/Grid/InformationServices";
import Services from "./components/Home/Grid/Services";
import PageNotAvailable from "./components/portfolio/PageNotAvailable";
import AllBlogs from "./components/admin/AllBlogs/AllBlogs";
import BlogInfo from "./components/admin/BlogInfo/BlogInfo";
import AdminLogin from "./components/admin/AdminLogin/AdminLogin";
import Dashboard from "./components/admin/Dashboard/Dashboard";
import Login from "./components/Login";
import BlogNotAvailable from "./components/portfolio/BlogNotAvailable";

const App = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => setShowLoading(false), 3000);
    return () => clearTimeout(delay);
  }, []);

  return (
    <Box fontSize="xl" margin="auto" textAlign={"center"}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/blog"
          element={
            <React.Suspense fallback={showLoading ? <Loading /> : null}>
              <BlogNotAvailable />
            </React.Suspense>
          }
        />
        <Route path="/allblogs" element={<AllBlogs />} />
        <Route path="/bloginfo/:id" element={<BlogInfo />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/dasboard" element={<Dashboard />} />
        <Route
          path="/"
          element={
            <React.Suspense fallback={showLoading ? <Loading /> : null}>
              <Homepage />
            </React.Suspense>
          }
        />
        <Route
          path="/home"
          element={
            <React.Suspense fallback={showLoading ? <Loading /> : null}>
              <Homepage />
            </React.Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <React.Suspense fallback={showLoading ? <Loading /> : null}>
              <AboutUs />
            </React.Suspense>
          }
        />
        <Route
          path="/information-services"
          element={
            <React.Suspense fallback={showLoading ? <Loading /> : null}>
              <InformationServices />
            </React.Suspense>
          }
        />
        <Route
          path="/services"
          element={
            <React.Suspense fallback={showLoading ? <Loading /> : null}>
              <Services />
            </React.Suspense>
          }
        />
        <Route
          path="/pagenotavailable"
          element={
            <React.Suspense fallback={showLoading ? <Loading /> : null}>
              <PageNotAvailable />
            </React.Suspense>
          }
        />
      </Routes>
    </Box>
  );
};

export default App;
