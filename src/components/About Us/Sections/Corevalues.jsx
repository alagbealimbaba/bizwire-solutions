import { Box, Text, Flex, SimpleGrid } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MotionBox = motion(Box);

const values = [
  {
    number: "01",
    title: "Partnership",
    body: "We deliver simplified and consistent experience to become a strategic partner with absolute transparency to improve trust and creditability.",
  },
  {
    number: "02",
    title: "Prudency",
    body: "Solutions are not just made available. We ensure deployment of custom-made products that are efficient, reliable, and nominal.",
  },
  {
    number: "03",
    title: "Improvement",
    body: "It is not about giving the business a better product, it's about making it a better business. We focus on increased visible business values.",
  },
  {
    number: "04",
    title: "Continuity",
    body: "We have taken decisive and effective actions to consider resilience and have embedded a recovery-centric mindset in our products.",
  },
];

const Corevalues = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Box bg="white" py={{ base: 14, lg: 20 }} px={{ base: 6, lg: 16 }}>
      {/* Header */}
      <Flex alignItems="center" gap={3} mb={3} ref={ref}>
        <Box w="40px" h="3px" bg="#a17635" />
        <Text fontSize="xs" fontWeight="700" color="#a17635" letterSpacing="3px" textTransform="uppercase">
          Core Values
        </Text>
      </Flex>

      <Text
        fontSize={{ base: "30px", lg: "42px" }}
        fontWeight="700"
        color="#000"
        fontStyle="italic"
        mb={12}
        lineHeight="1.2"
      >
        The principles that <br />guide everything we do.
      </Text>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
        {values.map((value, i) => (
          <MotionBox
            key={value.title}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: i * 0.12, ease: "easeOut" }}
            bg="gray.100"
            p={7}
            borderTop="4px solid"
            borderColor="#a17635"
            position="relative"
            _hover={{ bg: "#000", transition: "background 0.3s ease" }}
            role="group"
          >
            <Text
              fontSize="52px"
              fontWeight="800"
              lineHeight="1"
              position="absolute"
              top={4}
              right={5}
              userSelect="none"
              color="gray.200"
              _groupHover={{ color: "whiteAlpha.200" }}
              transition="color 0.3s ease"
            >
              {value.number}
            </Text>
            <Text
              fontSize="xs"
              fontWeight="700"
              color="#a17635"
              letterSpacing="2px"
              textTransform="uppercase"
              mb={4}
            >
              {value.title}
            </Text>
            <Text
              fontSize="15px"
              color="#6a7c92"
              fontStyle="italic"
              lineHeight="1.85"
              _groupHover={{ color: "gray.300" }}
              transition="color 0.3s ease"
            >
              {value.body}
            </Text>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Corevalues;
