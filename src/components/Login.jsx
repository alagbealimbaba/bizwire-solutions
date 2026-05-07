import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Box, Input, Button, Text, Heading, VStack, Link, useToast } from '@chakra-ui/react';
import { Navbar } from './Home/Navbar/Navbar';
import Footer from './Home/Footer';
import { createToastHelpers } from '../utils/toastUtils';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { success, error } = createToastHelpers(toast);

  const checkUserRole = async (uid) => {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const role = userDoc.data().role;
      navigate(role === 'admin' ? '/admin-dashboard' : '/blog');
    } else {
      throw new Error('User data not found.');
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await checkUserRole(userCredential.user.uid);
      success('Logged in successfully!');
    } catch (err) {
      error('Login failed.', err.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'user',
      });

      success('User signed up successfully!', undefined, { position: 'top' });
      navigate('/blog');
    } catch (err) {
      error('Sign up failed.', err.message, { position: 'top' });
    }
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />

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

            <Button
              width="100%"
              sx={{
                background: "#000",
                color: "#a17635",
                _hover: { background: "#a17635", color: "#000" },
              }}
              onClick={isSignUp ? handleSignUp : handleLogin}
            >
              {isSignUp ? 'Sign Up' : 'Login'}
            </Button>

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

      <Box mt="auto" width="100%">
        <Footer />
      </Box>
    </Box>
  );
}

export default Login;
