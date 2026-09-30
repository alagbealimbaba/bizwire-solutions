import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MotionBox = motion(Box);

const items = [
  {
    number: "01",
    topic: "Financial Advisory and Tax Management",
    subtopic:
      "Our global team of financial advisory experts is well-versed in the financial challenges you may be facing and will work closely with you to provide tailored, practical and technical advice to guide you through these critical moments.",
  },
  {
    number: "02",
    topic: "Business Continuity Management",
    subtopic:
      "We help organizations protect their value creation and the interests of key stakeholders, reputation and brands by providing a framework to build and continuously improve resilience to reduce the impact of any critical disruption.",
  },
  {
    number: "03",
    topic: "Process Improvement and Waste Elimination",
    subtopic:
      "We relentlessly pursue the elimination of non-value adding activities, and the optimization of value adding ones through a systematic approach which identifies and eliminates the root causes of problems.",
  },
  {
    number: "04",
    topic: "Human Capital Management and Skills Development",
    subtopic:
      "We are an excellent partner when it comes to management of the economic value of workers abilities and skills through enhancement of human capital, recruitment, training, and implementation of management techniques that optimize the productivity of existing workers and grow talents.",
  },
  {
    number: "05",
    topic: "Property Development to Ownership",
    subtopic:
      "We help individuals and corporate organizations to purchase land, develop building programs and designs, obtain necessary public approvals, build structures, manage, and ultimately sell. Home renovation and repairs to attract better values is one of our best ideas.",
  },
  {
    number: "06",
    topic: "Infrastructure Development and Maintenance",
    subtopic:
      "We partner with governments and non-governmental organizations to provide basic amenities and facilities that support the quality of life. We collaborate to develop and maintain infrastructure, creating an integral field in the construction industry.",
  },
];

const ConsultancyCard = ({ item, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.12, ease: "easeOut" }}
      bg="white"
      borderTop="4px solid"
      borderColor="#a17635"
      p={8}
      position="relative"
      role="group"
      _hover={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
    >
      <Text
        fontSize="52px"
        fontWeight="800"
        color="gray.100"
        lineHeight="1"
        position="absolute"
        top={4}
        right={6}
        userSelect="none"
      >
        {item.number}
      </Text>
      <Box
        w="56px"
        h="4px"
        bg="#a17635"
        mb={5}
        _groupHover={{ w: "80px" }}
        transition="width 0.3s ease"
      />
      <Text
        fontWeight="700"
        fontSize="17px"
        color="#000"
        lineHeight="1.4"
        mb={4}
        textAlign="left"
      >
        {item.topic}
      </Text>
      <Text
        fontSize="14px"
        color="#6a7c92"
        lineHeight="1.85"
        fontStyle="italic"
        textAlign="left"
      >
        {item.subtopic}
      </Text>
    </MotionBox>
  );
};

const ConsultancyGrid = () => (
  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
    {items.map((item, index) => (
      <ConsultancyCard key={item.number} item={item} index={index} />
    ))}
  </SimpleGrid>
);

export default ConsultancyGrid;
