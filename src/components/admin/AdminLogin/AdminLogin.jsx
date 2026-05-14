import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  Button,
  Text,
  Heading,
  VStack,
  Center,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Flex,
  Image,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { adminLogin, adminLogout } from "../../../utils/adminAuth";
import { createToastHelpers } from "../../../utils/toastUtils";
import { useAuth } from "../../../context/AuthContext";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { error } = createToastHelpers(toast);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (user && isAdmin) navigate("/dashboard");
    if (user && !isAdmin) {
      error("Access denied", "This account does not have admin privileges.");
      adminLogout();
    }
  }, [user, isAdmin, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      error("Missing fields", "Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      await adminLogin(email, password);
      // redirect handled by useEffect above
    } catch {
      error("Login failed", "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg="gray.900" display="flex" flexDirection="column">
      <Center flex="1" p={6}>
        <Box
          w={{ base: "100%", sm: "400px" }}
          bg="white"
          borderRadius="2xl"
          boxShadow="2xl"
          overflow="hidden"
        >
          {/* Header */}
          <Box
            backgroundImage="linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
            p={8}
            textAlign="center"
          >
            <Flex justifyContent="center" mb={3}>
              <Image src="./logo.png" h="56px" w="112px" />
            </Flex>
            <Text color="gray.400" fontSize="sm">
              Admin Portal
            </Text>
          </Box>

          {/* Form */}
          <Box p={8}>
            <Heading as="h2" size="md" textAlign="center" color="gray.800" mb={6}>
              Sign in to continue
            </Heading>
            <form onSubmit={handleLogin}>
              <VStack spacing={4}>
                <Input
                  placeholder="Admin email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                  borderRadius="lg"
                  borderColor="gray.300"
                  _focus={{ borderColor: "#a17635", boxShadow: "0 0 0 1px #a17635" }}
                  isRequired
                />
                <InputGroup size="lg">
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    borderRadius="lg"
                    borderColor="gray.300"
                    _focus={{ borderColor: "#a17635", boxShadow: "0 0 0 1px #a17635" }}
                    isRequired
                  />
                  <InputRightElement>
                    <IconButton
                      icon={showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      variant="ghost"
                      size="sm"
                      color="gray.400"
                      aria-label="Toggle password"
                      onClick={() => setShowPassword((s) => !s)}
                    />
                  </InputRightElement>
                </InputGroup>

                <Button
                  type="submit"
                  w="100%"
                  size="lg"
                  borderRadius="lg"
                  bg="#000"
                  color="#a17635"
                  _hover={{ bg: "#a17635", color: "#000" }}
                  fontWeight="700"
                  mt={2}
                  isLoading={loading}
                  loadingText="Signing in..."
                >
                  Sign In
                </Button>
              </VStack>
            </form>
          </Box>
        </Box>
      </Center>
    </Box>
  );
}

export default AdminLogin;
