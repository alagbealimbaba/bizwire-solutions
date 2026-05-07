import { Box, Flex, Image, Text } from "@chakra-ui/react";

const Numbers = () => {
  return (
    <Flex
      bgImage={"./NumbersBG.jpg"}
      bgSize={"cover"}
      p={{
        lg: "80px 50px 85px 50px",
        md: "40px 25px 40px 25px",
        base: "40px 25px 40px 25px",
      }}
      justifyContent={"space-evenly"}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={3}
      >
        <Box bgImage={"./shape-10.png"} padding={10} bgSize={"cover"}>
          <Image src="./coding.png" color={"white"} padding={""} />
        </Box>
        <Box color={"white"}>
          <Text fontSize={"3xl"}>364K</Text>
          <Text>Happy Client</Text>
        </Box>
      </Box>

      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={3}
      >
        <Box bgImage={"./shape-10.png"} padding={10} bgSize={"cover"}>
          <Image src="./light-bulb.png" color={"white"} padding={""} />
        </Box>
        <Box color={"white"}>
          <Text fontSize={"3xl"}>245+</Text>
          <Text>Win Award</Text>
        </Box>
      </Box>

      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={3}
      >
        <Box bgImage={"./shape-10.png"} padding={10} bgSize={"cover"}>
          <Image src="./writer.png" padding={""} />
        </Box>
        <Box color={"white"}>
          <Text fontSize={"3xl"}>142K</Text>
          <Text>Project Done</Text>
        </Box>
      </Box>

      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={3}
      >
        <Box bgImage={"./shape-10.png"} padding={10} bgSize={"cover"}>
          <Image src="./analysis.png" color={"white"} padding={""} />
        </Box>
        <Box color={"white"}>
          <Text fontSize={"3xl"}>982+</Text>
          <Text>Project Research</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Numbers;
