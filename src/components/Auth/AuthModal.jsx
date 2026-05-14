import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Text,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
  Flex,
  Image,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineClose } from "react-icons/ai";
import { registerUser, loginUser } from "../../utils/userAuth";

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setErrorMsg("");
    setShowPassword(false);
    setMode("login");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const switchMode = (m) => {
    setMode(m);
    setErrorMsg("");
  };

  const friendlyError = (err) => {
    const code = err?.code || "";
    if (code === "auth/email-already-in-use") return "An account with this email already exists.";
    if (code === "auth/invalid-email") return "Please enter a valid email address.";
    if (code === "auth/weak-password") return "Password must be at least 6 characters.";
    if (code === "auth/invalid-credential") return "Invalid email or password.";
    if (code === "auth/user-not-found") return "No account found with this email.";
    if (code === "auth/wrong-password") return "Incorrect password.";
    return err?.message || "Something went wrong. Please try again.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (mode === "register" && !name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!email.trim() || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const user =
        mode === "login"
          ? await loginUser(email, password)
          : await registerUser(name, email, password);
      reset();
      onSuccess(user);
    } catch (err) {
      setErrorMsg(friendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered size="md">
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent borderRadius="0" overflow="hidden" mx={4}>
        <Box h="3px" bg="#a17635" />

        <Box bg="#000" px={6} py={4}>
          <Flex justifyContent="space-between" alignItems="center">
            <Flex alignItems="center" gap={3}>
              <Image src="./logo.png" h="36px" w="72px" />
              <Text color="#a17635" fontSize="sm" fontStyle="italic">
                {mode === "login" ? "Sign In" : "Create Account"}
              </Text>
            </Flex>
            <IconButton
              icon={<AiOutlineClose />}
              variant="ghost"
              color="gray.400"
              size="sm"
              _hover={{ color: "white" }}
              aria-label="Close"
              onClick={handleClose}
            />
          </Flex>
        </Box>

        <ModalBody px={6} py={6} bg="white">
          <Flex mb={6} borderBottom="2px solid" borderColor="gray.200">
            {[
              { key: "login", label: "Sign In" },
              { key: "register", label: "Create Account" },
            ].map(({ key, label }) => (
              <Button
                key={key}
                variant="ghost"
                borderRadius="0"
                borderBottom="2px solid"
                borderColor={mode === key ? "#a17635" : "transparent"}
                color={mode === key ? "#000" : "gray.400"}
                fontWeight={mode === key ? "700" : "400"}
                mb="-2px"
                px={4}
                pb={3}
                fontStyle="italic"
                onClick={() => switchMode(key)}
                _hover={{ color: "#000" }}
              >
                {label}
              </Button>
            ))}
          </Flex>

          <form onSubmit={handleSubmit}>
            <Flex flexDirection="column" gap={4}>
              {mode === "register" && (
                <Input
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  borderRadius="0"
                  borderColor="gray.300"
                  _focus={{ borderColor: "#a17635", boxShadow: "0 0 0 1px #a17635" }}
                />
              )}
              <Input
                placeholder="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                borderRadius="0"
                borderColor="gray.300"
                _focus={{ borderColor: "#a17635", boxShadow: "0 0 0 1px #a17635" }}
              />
              <InputGroup>
                <Input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  borderRadius="0"
                  borderColor="gray.300"
                  _focus={{ borderColor: "#a17635", boxShadow: "0 0 0 1px #a17635" }}
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

              {errorMsg && (
                <Box bg="red.50" border="1px solid" borderColor="red.200" p={3}>
                  <Text color="red.600" fontSize="sm">
                    {errorMsg}
                  </Text>
                </Box>
              )}

              <Button
                type="submit"
                bg="#000"
                color="#a17635"
                _hover={{ bg: "#a17635", color: "#000" }}
                borderRadius="0"
                fontWeight="700"
                isLoading={loading}
                loadingText={mode === "login" ? "Signing in..." : "Creating account..."}
                w="100%"
                mt={1}
              >
                {mode === "login" ? "Sign In" : "Create Account"}
              </Button>

              <Text fontSize="sm" color="#6a7c92" textAlign="center" fontStyle="italic">
                {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                <Box
                  as="span"
                  color="#000"
                  fontWeight="600"
                  cursor="pointer"
                  textDecoration="underline"
                  onClick={() => switchMode(mode === "login" ? "register" : "login")}
                >
                  {mode === "login" ? "Create one" : "Sign in"}
                </Box>
              </Text>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
