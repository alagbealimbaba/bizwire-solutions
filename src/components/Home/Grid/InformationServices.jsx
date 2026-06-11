import { Box, Flex, Text, SimpleGrid } from "@chakra-ui/react";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MotionBox = motion(Box);

const items = [
  {
    number: "01",
    image: "./ADE.jpeg",
    topic: "Application Development & E-Commerce",
    subtopic:
      "We create custom solutions across a wide spectrum of functions and industries. Web, Mobile and Enterprise Resource Planning systems development, customization and integration aligned with business priorities and objectives.",
  },
  {
    number: "02",
    image: "./ANI.jpeg",
    topic: "Office Automation & Networking Infrastructure",
    subtopic:
      "Complete office automation and cabling solutions using appropriate technology. Our network services range from OS installation to servers, firewall configurations, routers, switches, Voice Solutions, and VPNs.",
  },
  {
    number: "03",
    image: "./DMS.jpg",
    topic: "Technical Digital Marketing Services",
    subtopic:
      "Tailored digital marketing solutions that propel your business to new heights. We understand your brand, your goals, and your unique market — committed to driving success day after day.",
  },
  {
    number: "04",
    image: "./DEA.jpg",
    topic: "Data Engineering & Analytics",
    subtopic:
      "Leveraging leading-edge analytics plus the power of data science to help clients make more intelligent decisions, deliver innovative solutions and improve overall results.",
  },
  {
    number: "05",
    image: "./WFM.jpg",
    topic: "Workflow Management",
    subtopic:
      "Automating business workflows to optimize people, processes and data for better outcomes. We offer workflow implementation services using the latest AI and ML tools.",
  },
  {
    number: "06",
    image: "./IOT.jpeg",
    topic: "Internet of Things (IoT)",
    subtopic:
      "Beat your competitors to the number one spot in automation by using IoT apps. We design and deploy smart connected systems tailored to your business needs.",
  },
];

const ServiceCard = ({ item, index }) => {
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
      transition="box-shadow 0.3s ease"
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
        bgImage="url('/team-work.jpg')"
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
                Tech Services
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
              Unlocking Tech & People Potential
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
              We help organizations thrive by building impactful products and
              high-performing teams leveraging the latest technologies.
            </Text>
          </MotionBox>
        </Flex>
      </Box>

      {/* Services grid */}
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
          Our Technology<br />Service Areas
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {items.map((item, index) => (
            <ServiceCard key={item.number} item={item} index={index} />
          ))}
        </SimpleGrid>
      </Box>

      <Footer />
    </Box>
  );
};

export default Services;
