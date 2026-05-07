import { Flex, Text, Image, Button, Box } from "@chakra-ui/react";
import { useFloatingAnimation } from "../../hooks/useFloatingAnimation";

const Hero = () => {
  const imageRef = useFloatingAnimation();

  return (
    <Box
      display={"flex"}
      width={"100%"}
      background="#6A1CE1"
      flexDirection={{
        lg: "row",
        md: "column-reverse",
        base: "column-reverse",
      }}
      justifyContent={"space-between"}
      pt={{ lg: "100px", md: "20px", base: "20px" }}
      h={{ lg: "870px" }}
      border={"1px solid black"}
    >
      <Flex
        w={{ lg: "60%", md: "100%", base: "100%" }}
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        flexDirection="column"
        p={8}
      >
        <Box width={"100%"} p={{ lg: "0 0 0 40px", md: "0px", base: "0px" }}>
          <Box>
            <Text
              color="white"
              fontWeight={"700"}
              textAlign={"left"}
              mb={5}
              letterSpacing={"2px"}
            >
              SECURE AND IT SERVICES
            </Text>
            <Text
              color="white"
              fontWeight={"700"}
              fontSize="40px"
              textAlign={"left"}
              letterSpacing={"2px"}
              lineHeight={"1.4em"}
              mb={5}
              width={"100%"}
            >
              Business with Intelligent Requirements and Expertise
            </Text>
          </Box>
          <Text color="white" textAlign={"left"}>
            Empowering Enterprises with Inspiring Solutions...........
          </Text>

          <Flex alignItems={"center"} width={"100%"}>
            <Button
              bg="#2513d1"
              padding="24px 40px"
              fontSize={"16px"}
              marginTop={"20px"}
              lineHeight={"30px"}
              fontWeight={"700"}
              borderRadius={"3px"}
              color={"#fff"}
              border={"2px solid #2513d1"}
              _hover={{
                backgroundColor: "white",
                border: "2px solid #2513d1",
                color: "#2513d1",
              }}
              href="#"
            >
              Our Services
            </Button>
          </Flex>
        </Box>
      </Flex>
      <Box>
        <Image
          src="./hero.png"
          alt="heroPage"
          ref={imageRef}
          display={{ lg: "block", md: "none", base: "none" }}
        />
      </Box>
    </Box>
  );
};

export default Hero;
