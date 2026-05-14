import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Loading from "./components/loading";
import Homepage from "./components/Home/Home";
import AboutUs from "./components/About Us/AboutUs";
import InformationServices from "./components/Home/Grid/InformationServices";
import Services from "./components/Home/Grid/Services";
import PageNotAvailable from "./components/portfolio/PageNotAvailable";
import Blog from "./components/Home/Blog/Blog";
import BlogPost from "./components/Home/Blog/BlogPost";
import AdminLogin from "./components/admin/AdminLogin/AdminLogin";
import Dashboard from "./components/admin/Dashboard/Dashboard";
import CreateBlog from "./components/admin/CreateBlog/CreateBlog";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

const App = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => setShowLoading(false), 3000);
    return () => clearTimeout(delay);
  }, []);

  const withSuspense = (Component) => (
    <React.Suspense fallback={showLoading ? <Loading /> : null}>
      <Component />
    </React.Suspense>
  );

  return (
    <Box fontSize="xl" margin="auto" textAlign={"center"}>
      <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={withSuspense(Homepage)} />
        <Route path="/home" element={withSuspense(Homepage)} />
        <Route path="/about" element={withSuspense(AboutUs)} />
        <Route path="/information-services" element={withSuspense(InformationServices)} />
        <Route path="/services" element={withSuspense(Services)} />
        <Route path="/pagenotavailable" element={withSuspense(PageNotAvailable)} />

        {/* Blog routes */}
        <Route path="/blog" element={withSuspense(Blog)} />
        <Route path="/blog/:id" element={withSuspense(BlogPost)} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedAdminRoute>
              <Dashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <ProtectedAdminRoute>
              <CreateBlog />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
      </AuthProvider>
    </Box>
  );
};

export default App;
