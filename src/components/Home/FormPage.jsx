import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Input,
  Textarea,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { createToastHelpers } from "../../utils/toastUtils";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const inputBase = {
  borderRadius: "0",
  borderColor: "gray.300",
  bg: "white",
  h: "52px",
  fontSize: "15px",
  _focus: { borderColor: "#a17635", boxShadow: "0 0 0 1px #a17635" },
  _placeholder: { color: "gray.400" },
};

const initialForm = { name: "", email: "", phone: "", subject: "", message: "" };

const FormPage = () => {
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const toast = useToast();
  const { success, error } = createToastHelpers(toast);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      error("Missing fields", "Please fill in your name, email and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      error("Invalid email", "Please enter a valid email address.");
      return;
    }
    if (!form.phone) {
      error("Missing phone", "Please enter your phone number.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      success("Message sent!", "We'll get back to you shortly.");
      setForm(initialForm);
    } catch (err) {
      error("Failed to send", err.message || "Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Box bg="gray.100" py={{ base: 14, lg: 20 }} px={{ base: 6, lg: 16 }}>
      {/* Header */}
      <Flex alignItems="center" gap={3} mb={3}>
        <Box w="40px" h="3px" bg="#a17635" />
        <Text fontSize="xs" fontWeight="700" color="#a17635" letterSpacing="3px" textTransform="uppercase">
          Contact Us
        </Text>
      </Flex>
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems={{ lg: "flex-end" }}
        mb={10}
        gap={4}
      >
        <Text
          fontSize={{ base: "28px", lg: "40px" }}
          fontWeight="700"
          color="#000"
          fontStyle="italic"
          lineHeight="1.2"
        >
          Get in touch<br />with us.
        </Text>
        <Text color="#6a7c92" fontStyle="italic" fontSize="sm" maxW="340px" textAlign={{ base: "left", lg: "right" }}>
          Your need is our collaboration. How may we help you?
        </Text>
      </Flex>

      {/* Form */}
      <Box bg="white" p={{ base: 6, lg: 10 }} borderTop="4px solid" borderColor="#a17635">
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" gap={4}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Input
                {...inputBase}
                name="name"
                placeholder="Full Name *"
                value={form.name}
                onChange={handleChange}
              />
              <Input
                {...inputBase}
                name="email"
                type="email"
                placeholder="Email Address *"
                value={form.email}
                onChange={handleChange}
              />
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {/* Phone input styled to match */}
              <Box
                sx={{
                  ".PhoneInput": {
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid var(--chakra-colors-gray-300)",
                    background: "white",
                    height: "52px",
                    padding: "0 12px",
                    gap: "8px",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  },
                  ".PhoneInput:focus-within": {
                    borderColor: "#a17635",
                    boxShadow: "0 0 0 1px #a17635",
                  },
                  ".PhoneInputCountry": {
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    flexShrink: 0,
                  },
                  ".PhoneInputCountrySelect": {
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: "15px",
                    cursor: "pointer",
                    color: "#000",
                  },
                  ".PhoneInputInput": {
                    flex: 1,
                    border: "none",
                    outline: "none",
                    fontSize: "15px",
                    color: "#000",
                    background: "transparent",
                    height: "100%",
                  },
                  ".PhoneInputInput::placeholder": {
                    color: "#A0AEC0",
                  },
                }}
              >
                <PhoneInput
                  international
                  defaultCountry="NG"
                  placeholder="Phone Number *"
                  value={form.phone}
                  onChange={(val) => setForm((f) => ({ ...f, phone: val || "" }))}
                />
              </Box>

              <Input
                {...inputBase}
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
              />
            </SimpleGrid>

            <Textarea
              name="message"
              placeholder="Your Message *"
              value={form.message}
              onChange={handleChange}
              rows={6}
              resize="vertical"
              borderRadius="0"
              borderColor="gray.300"
              fontSize="15px"
              _focus={{ borderColor: "#a17635", boxShadow: "0 0 0 1px #a17635" }}
              _placeholder={{ color: "gray.400" }}
            />

            <Button
              type="submit"
              bg="#000"
              color="#a17635"
              _hover={{ bg: "#a17635", color: "#000" }}
              borderRadius="0"
              h="52px"
              fontWeight="700"
              fontSize="15px"
              isLoading={sending}
              loadingText="Sending..."
              w={{ base: "100%", md: "auto" }}
              px={12}
              alignSelf={{ base: "stretch", md: "flex-start" }}
            >
              Send Message
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default FormPage;
