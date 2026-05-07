import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig'; // Ensure you have your Firestore config
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'; // Firestore methods
import { useNavigate } from 'react-router-dom';
import { Box, Input, Button, Text, Heading, VStack, Link, useToast } from '@chakra-ui/react';
import { Navbar } from './Home/Navbar/Navbar';
import Footer from './Home/Footer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const toast = useToast(); // Initialize toast

  // Function to check role in Firestore after login
  const checkUserRole = async (uid) => {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const role = userDoc.data().role;
      if (role === 'admin') {
        navigate('/admin-dashboard'); // Redirect to admin page if admin
      } else {
        navigate('/blog'); // Redirect to regular blog page if user
      }
    } else {
      throw new Error('User data not found.');
    }
  };

  // Handle login logic
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check user role after login
      await checkUserRole(user.uid);

      toast({
        title: 'Logged in successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Login failed.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle sign up logic
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // By default, set the role of the new user as 'user' in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'user', // Default role for new users
      });

      toast({
        title: 'User signed up successfully!',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });

      navigate('/blog'); // Redirect to blog after sign up
    } catch (error) {
      toast({
        title: 'Sign up failed.',
        description: error.message,
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main login box */}
      <Box padding={20} flex="1" display="flex" alignItems="center" justifyContent="center" mt={30} mb={30}>
        <Box
          width={{ base: '90%', md: '400px' }}
          p={6}
          borderRadius="md"
          boxShadow="lg"
          bg="white"
        >
          <VStack spacing={6}>
            <Heading as="h2" size="lg" textAlign="center" color={'black'}>
              {isSignUp ? 'Sign Up' : 'Login'}
            </Heading>

            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              size="md"
              borderRadius="md"
              variant="outline"
              isRequired
            />

            <Input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              size="md"
              borderRadius="md"
              variant="outline"
              isRequired
            />

            {isSignUp ? (
              <Button
                width="100%"
                sx={{
                  background: "#000", // Initial background color (black)
                  color: "#a17635", // Initial text color (gold)
                  _hover: {
                    background: "#a17635", // Hover background color (gold)
                    color: "#000", // Hover text color (black)
                  },
                }}
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            ) : (
              <Button
                width="100%"
                sx={{
                  background: "#000", // Initial background color (black)
                  color: "#a17635", // Initial text color (gold)
                  _hover: {
                    background: "#a17635", // Hover background color (gold)
                    color: "#000", // Hover text color (black)
                  },
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
            )}

            <Text fontSize={'16px'}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <Link
                color="black"
                ml={2}
                onClick={() => setIsSignUp(!isSignUp)}
                style={{ cursor: 'pointer' }}
              >
                {isSignUp ? 'Login' : 'Sign Up'}
              </Link>
            </Text>
          </VStack>
        </Box>
      </Box>

      {/* Footer fixed at the bottom */}
      <Box mt="auto" width="100%">
        <Footer />
      </Box>
    </Box>
  );
}

export default Login;
