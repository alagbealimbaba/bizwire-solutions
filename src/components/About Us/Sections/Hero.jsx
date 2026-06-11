import { Box, Image } from "@chakra-ui/react";
import React from "react";

const Hero = () => {
  return (
    <Box>
      <Box position="relative">
        <Image
          src="/alex-kotliarskyi-QBpZGqEMsKg-unsplash.jpg"
          w="100%"
          maxH="500px"
          objectFit="cover"
        />
      </Box>
    </Box>
  );
};

export default Hero;
