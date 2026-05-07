import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useFloatingAnimation } from "../../hooks/useFloatingAnimation";

const Business = () => {
  const imageRef = useFloatingAnimation();

  return (
    <Flex
      flexDirection={{ lg: "row", sm: "column" }}
      justifyContent={"center"}
      p={{
        lg: "50px 50px 15px 50px",
        md: "40px 25px 40px 25px",
        base: "40px 25px 40px 25px",
      }}
      width={"100%"}
      gap={24}
      flexDir={"row-reverse"}
      bg={"gray.100"}
    >
      <Box
        w={{ lg: "30%", md: "100%", base: "100%" }}
        p={{ lg: 4, md: 3, base: 0 }}
        display={"grid"}
        placeItems={"center"}
      >
        <Image src="./solution03.png" alt="thumnail services" ref={imageRef} />
      </Box>
      <Flex
        w={{ lg: "50%", md: "100%", base: "100%" }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"flex-start"}
        flexDirection={"column"}
        p={4}
        mt={12}
      >
        <Box>
          <Text
            textAlign={"left"}
            color={"#000"}
            margin={"0 0 10px"}
            lineHeight={"1.2em"}
            fontSize={"36px"}
            width={"100%"}
          >
            Technology is not a barrier
          </Text>
        </Box>
        <Text
          color={"#6a7c92"}
          fontSize={"18px"}
          textAlign={"justify"}
          fontStyle={"italic"}
          lineHeight={"1.8em"}
        >
          We take full advantage of the present and next waves of digital
          transformation to help businesses embrace new technologies to optimize
          operations, create new value, and serve customers in new ways.{" "}
        </Text>

        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"flex-start"}
          flexDirection={"column"}
          gap={4}
          w={"100%"}
          mt={4}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={7}
          >
            <Text
              width={{ lg: "580px", md: "100%", base: "100%" }}
              fontSize={"18px"}
              textAlign={"justify"}
              fontStyle={"italic"}
              lineHeight={"1.8em"}
            >
              These new technologies present significant opportunity for
              businesses in every industry and the first businesses to
              understand automation and these transformative technologies will
              be the ones to reap the greatest rewards in the marketplace.{" "}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Business;
