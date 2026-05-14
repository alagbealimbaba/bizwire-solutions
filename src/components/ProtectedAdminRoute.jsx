import { Navigate } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <Center minH="100vh" bg="gray.100">
        <Spinner size="xl" color="#a17635" thickness="4px" />
      </Center>
    );
  }

  if (!user || !isAdmin) return <Navigate to="/admin" replace />;
  return children;
};

export default ProtectedAdminRoute;
