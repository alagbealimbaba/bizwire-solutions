import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import aboutHeroImage from "../Sections/AboutHero.jpeg";

const Hero = () => {
  return (
    <Box>
      <Box position={"relative"}>
        <Image src={aboutHeroImage} />
        <Box
          position={"absolute"}
          top={"10px"}
          left={"5px"}
          color={"white"}
          fontSize={"32px"}
        >
          <Text>Our Company</Text>
        </Box>
        <Box
          position={"absolute"}
          top={"50px"}
          right={"15px"}
          color={"black"}
          textAlign={"left"}
          display={"flex"}
          flexDirection={"column"}
          gap={5}
        >
          <Text
            w={{ lg: "415px", base: "200px" }}
            fontSize={{ lg: "16px", base: "10px" }}
            fontStyle={"italic"}
            fontWeight={"bold"}
          >
            We provide solutions with intelligent requirements and
            expertise…………….
          </Text>
          <Text fontSize={{ lg: "16px", base: "12px" }}>
            Exactly where your business needs it.
          </Text>
        </Box>
      </Box>
    
    </Box>
  );
};

export default Hero;
