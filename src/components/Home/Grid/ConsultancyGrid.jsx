import { useState } from "react";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import styles from "./styles.module.css";
const items = [
  {
    logoBackground: "url(./FATM.jpeg)",
    topic: "Financial Advisory and Tax Management",
    subtopic:
      "Our global team of financial advisory experts is well-versed in the financial challenges you may be facing and will work closely with you to provide tailored, practical and technical advice to guide you through these critical moments.",
  },
  {
    logoBackground: "url(./BCM.jpeg)",
    topic: "Business Continuity Management",
    subtopic:
      "We help organizations protect their value creation and the interests of key stakeholders, reputation and brands by providing a framework to build and continuously improve resilience to reduce the impact of any critical disruption.",
  },
  {
    logoBackground: "url(./PIWE.jpeg)",
    topic: "Process Improvement and Waste Elimination",
    subtopic:
      "We relentlessly pursue the elimination of non-value adding (NVA) activities, and the optimization of value adding ones through a systematic approach which identifies and eliminate the root causes of problems.",
  },
  {
    logoBackground: "url(./HCM.jpeg)",
    topic: "Human Capital Management and Skills Development ",
    subtopic:
      "We are excellent partner when it comes to management of the economic value of workers abilities and skills through enhancement of human capital,  recruitment, training, and  implementation of management techniques that optimize the productivity of existing workers and grow talents..",
  },
  {
    logoBackground: "url(./PDO.jpeg)",
    topic: "Property Development to Ownership",
    subtopic:
      "We help individuals and corporate organizations to purchase a tract of land,  develop the building program and design, obtain the necessary public approval, build the structures, manage, and ultimately sell it. Home renovation and repairs to attract better values is one of our best ideas. We are a trusted provider to help you become a successful homeowner..",
      
  },
  {
    logoBackground: "url(./IDM.jpeg)",
    topic: "Infrastructure Development and Maintenance",
    subtopic:
      "We partner with governments and non-governmental organizations to provide basic amenities and facilities that support the quality of life. We collaborate to develop and maintain infrastructure, creating an integral field in the construction industry.",
  },
];

const GridComponent = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <Box
      Width="100%"
      padding={{ lg: "25px", sm: "none" }}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid
        className="styles.grid-cols"
        templateColumns={{
          md: "repeat(2, 1fr)",
          base: "repeat(1, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        {items.map((item, index) => (
          <GridItem
            key={index}
            p={8}
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            borderWidth="1px"
            boxShadow={
              hoveredIndex === index ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "none"
            }
            bg={"white"}
            width="380px"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Box
              bgImage={item.logoBackground}
              bgRepeat="no-repeat"
              bgSize="contain"
              bgPosition="center center"
              width="120px"
              height="120px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{
                transform: `rotateY(${
                  hoveredIndex === index ? "180" : "0"
                }deg)`,
                transition: "transform 1s",
              }}
            ></Box>
            <Text
              fontWeight="700"
              fontSize="20px"
              m={"10px 0"}
              color={"#000"}
              lineHeight={"1.3em"}
              textAlign={"center"}
            >
              {item.topic}
            </Text>
            <Text
              fontSize="15px"
              color="#6a7c92"
              lineHeight={"2em"}
              textAlign={"left"}
            >
              {item.subtopic}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default GridComponent;
