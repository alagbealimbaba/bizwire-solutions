import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useFloatingAnimation } from "../../hooks/useFloatingAnimation";

const Business = () => {
  const imageRef = useFloatingAnimation();

  return (
    <Flex
      flexDirection={{ lg: "row-reverse", sm: "column" }}
      justifyContent={"center"}
      p={{
        lg: "50px 50px 0px 50px",
        md: "40px 25px 40px 25px",
        base: "40px 25px 40px 25px",
      }}
      width={"100%"}
      gap={24}
      bg={"gray.100"}
    >
      <Box
        w={{ lg: "30%", md: "100%", base: "100%" }}
        p={{ lg: 4, md: 3, base: 0 }}
        display={'grid'}
        placeItems={'center'}
      >
        <Image
          src="./consulting01.png"
          alt="thumnail services"
          ref={imageRef}
        />
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
            We partner to provide the solution
          </Text>
        </Box>
        <Text
          color={"#6a7c92"}
          fontSize={"18px"}
          textAlign={"justify"}
          fontStyle={"italic"}
          lineHeight={"1.8em"}
        >
          We mobilize teams of multi-disciplinary experts from across various
          functions in a seamless and efficient way to ensure you have the best
          team collaborating with you regardless of where you are or where your
          product is based.
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
              We provide practical advice to help you make key business
              decisions with clarity and confidence.
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Business;
