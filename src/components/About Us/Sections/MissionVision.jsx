import { Box, Text, Flex, SimpleGrid } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MotionBox = motion(Box);

const cards = [
  {
    number: "01",
    title: "Our Vision",
    body: "Bizwire Dynamics Limited (BDL) is a young but fast-growing solution provider and consultancy establishment with a vision to leverage Information and Communication Technologies to create Solutions and Experiences that drive impacts.",
  },
  {
    number: "02",
    title: "Our Mission",
    body: "To be the partner of choice for many of the leading businesses and problem-solving enterprises, SMEs and technology challengers through custom services that brings out values from investments.",
  },
];

const MissionVision = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Box bg="white" py={{ base: 14, lg: 20 }} px={{ base: 6, lg: 16 }}>
      <Flex alignItems="center" gap={3} mb={3} ref={ref}>
        <Box w="40px" h="3px" bg="#a17635" />
        <Text fontSize="xs" fontWeight="700" color="#a17635" letterSpacing="3px" textTransform="uppercase">
          Who We Are
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
        Driven by purpose,<br />built on expertise.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {cards.map((card, i) => (
          <MotionBox
            key={card.title}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.18, ease: "easeOut" }}
            bg="gray.100"
            p={8}
            borderTop="4px solid"
            borderColor="#a17635"
            position="relative"
          >
            <Text
              fontSize="64px"
              fontWeight="800"
              color="gray.200"
              lineHeight="1"
              position="absolute"
              top={4}
              right={6}
              userSelect="none"
            >
              {card.number}
            </Text>
            <Text
              fontSize="xs"
              fontWeight="700"
              color="#a17635"
              letterSpacing="2px"
              textTransform="uppercase"
              mb={3}
            >
              {card.title}
            </Text>
            <Text
              fontSize={{ base: "16px", lg: "17px" }}
              color="#6a7c92"
              fontStyle="italic"
              lineHeight="1.85"
            >
              {card.body}
            </Text>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default MissionVision;
