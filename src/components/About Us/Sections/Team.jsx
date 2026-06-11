import { Box, Text, Flex } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const points = [
  {
    label: "Research-Oriented",
    body: "We parade talented professionals with strong engineering, finance, and planning backgrounds, extensively exposed to the broad spectrum of project planning, management, computing and communication technologies.",
  },
  {
    label: "Tailored Solutions",
    body: "It is our culture not just to make modern technology available, but to provide tailored solutions that meet the need and budget of every customer — ensuring the highest level of technical and accounting expertise.",
  },
  {
    label: "Collaborative Spirit",
    body: "We collaborate; find answers, solve problems, provide solutions and get you inspired. Great things in business are never done by one person.",
  },
];

const Team = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Box bg="gray.100" py={{ base: 14, lg: 20 }} px={{ base: 6, lg: 16 }}>
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        gap={{ base: 10, lg: 20 }}
        alignItems={{ lg: "flex-start" }}
        ref={ref}
      >
        {/* Left — heading block */}
        <MotionBox
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          flexShrink={0}
          w={{ base: "100%", lg: "320px" }}
        >
          <Flex alignItems="center" gap={3} mb={3}>
            <Box w="40px" h="3px" bg="#a17635" />
            <Text
              fontSize="xs"
              fontWeight="700"
              color="#a17635"
              letterSpacing="3px"
              textTransform="uppercase"
            >
              Our Team
            </Text>
          </Flex>
          <Text
            fontSize={{ base: "30px", lg: "42px" }}
            fontWeight="700"
            color="#000"
            fontStyle="italic"
            lineHeight="1.2"
            mb={6}
          >
            People who make it happen.
          </Text>
          <Text
            fontSize="sm"
            color="#6a7c92"
            fontStyle="italic"
            lineHeight="1.8"
          >
            Great things in business are never done by one person. Our strength
            lies in the people behind every solution we deliver.
          </Text>
          <Box mt={8} w="60px" h="4px" bg="#000" />
        </MotionBox>

        {/* Right — points */}
        <Box flex="1" display="flex" flexDirection="column" gap={6}>
          {points.map((point, i) => (
            <MotionFlex
              key={point.label}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.15, ease: "easeOut" }}
              alignItems="flex-start"
              gap={5}
              bg="white"
              p={6}
              borderLeft="4px solid"
              borderColor="#a17635"
              textAlign="left"
            >
              <Text
                fontSize="28px"
                fontWeight="800"
                color="gray.200"
                lineHeight="1"
                flexShrink={0}
                mt={1}
                textAlign="center"
              >
                0{i + 1}
              </Text>
              <Box>
                <Text
                  fontWeight="700"
                  color="#000"
                  fontSize="sm"
                  mb={2}
                  textTransform="uppercase"
                  letterSpacing="1px"
                >
                  {point.label}
                </Text>
                <Text
                  fontSize={{ base: "15px", lg: "16px" }}
                  color="#6a7c92"
                  fontStyle="italic"
                  lineHeight="1.85"
                >
                  {point.body}
                </Text>
              </Box>
            </MotionFlex>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default Team;
