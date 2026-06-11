import { Box, Flex, Text } from "@chakra-ui/react";
import ConsultancyGrid from "./ConsultancyGrid";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MotionBox = motion(Box);

const Services = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <Box>
      <Navbar />

      {/* Hero */}
      <Box
        position="relative"
        h={{ base: "420px", lg: "580px" }}
        bgImage="url('/radission-us-_XeQ8XEWb4Q-unsplash.jpg')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        _before={{
          content: '""',
          position: "absolute",
          inset: 0,
          bg: "rgba(0,0,0,0.58)",
        }}
      >
        <Flex
          ref={heroRef}
          position="relative"
          h="100%"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          px={{ base: 6, lg: 16 }}
          textAlign="center"
          gap={5}
        >
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Flex alignItems="center" justifyContent="center" gap={3} mb={3}>
              <Box w="40px" h="3px" bg="#a17635" />
              <Text fontSize="xs" fontWeight="700" color="#a17635" letterSpacing="3px" textTransform="uppercase">
                Consulting Services
              </Text>
              <Box w="40px" h="3px" bg="#a17635" />
            </Flex>
            <Text
              fontSize={{ base: "28px", lg: "48px" }}
              fontWeight="700"
              color="white"
              fontStyle="italic"
              lineHeight="1.2"
              maxW="800px"
              mx="auto"
            >
              Transformation & Process Excellence
            </Text>
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            maxW="680px"
          >
            <Text
              color="gray.300"
              fontSize={{ base: "15px", lg: "17px" }}
              fontStyle="italic"
              lineHeight="1.8"
            >
              We specialized in transformation and process management
              collaborations that create a positive ripple effect on your
              business strategy, operating models, and quality of life.
            </Text>
          </MotionBox>
        </Flex>
      </Box>

      {/* Consulting grid */}
      <Box bg="gray.100" py={{ base: 14, lg: 20 }} px={{ base: 6, lg: 16 }}>
        <Flex alignItems="center" gap={3} mb={3}>
          <Box w="40px" h="3px" bg="#a17635" />
          <Text fontSize="xs" fontWeight="700" color="#a17635" letterSpacing="3px" textTransform="uppercase">
            What We Offer
          </Text>
        </Flex>
        <Text
          fontSize={{ base: "28px", lg: "40px" }}
          fontWeight="700"
          color="#000"
          fontStyle="italic"
          mb={12}
          lineHeight="1.2"
        >
          Our Consulting<br />Service Areas
        </Text>

        <ConsultancyGrid />
      </Box>

      <Footer />
    </Box>
  );
};

export default Services;
