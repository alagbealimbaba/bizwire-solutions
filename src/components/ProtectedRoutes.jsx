import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';  // Correct import
import { auth } from '../../firebaseConfig';  // Your Firebase auth configuration

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);  // useAuthState is a named export

  if (loading) {
    return <div>Loading...</div>;  // Optionally, show a loading state while checking auth
  }

  return user ? children : <Navigate to="/login" />;  // Redirect to login if not authenticated
}

export default ProtectedRoute;
