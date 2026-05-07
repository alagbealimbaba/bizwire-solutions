import { Box, Text, Flex, Badge, Grid } from "@chakra-ui/react";

const BlogGrid = () => {
  return (
    <Grid
      templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}
      flexDir={{ lg: "row", base: "column", md: "column" }}
      padding={"20px"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={{ lg: 8, base: "40px", md: "40px" }}
    >
      <Box
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        width={"380px"}
        height={"450px"}
        display={"flex"}
        flexDirection={"column"}
        p={4}
        alignItems={"center"}
        position={"relative"}
        gap={2}
      >
        <Box
          width={"270px"}
          height={"200px"}
          position={"relative"}
          display={"flex"}
          flexDir={"column"}
          bgImage={"./blog1.jpg"}
          bgPosition={"center"}
        >
          <Badge
            display={"inline-block"}
            mt={2}
            ml={2}
            letterSpacing={"1px"}
            marginRight={"5px"}
            padding={"5px 16px"}
            fontSize={"12px"}
            fontWeight={"500"}
            borderRadius={"2px"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"108px"}
            height={"29px"}
            bgColor={"#000"}
            color={"#a17635"}
          >
            Marketing
          </Badge>
          <Box
            display={"flex"}
            fontSize={"14px"}
            width={"100%"}
            padding={"12px 20px"}
            borderRadius={"3px"}
            bottom={"-20px"}
            position={"absolute"}
            textAlign={"center"}
            flexDir={"column"}
            alignSelf={"center"}
            color={"#6a7c92"}
            bgColor={"white"}
            boxShadow="0 9px 6px rgba(0, 0, 0, 0.1)"
          >
            Itsolve - february 24{" "}
          </Box>
        </Box>

        <Text
          width={"230px"}
          fontWeight="700"
          fontSize="20px"
          m={"30px 0"}
          color={"#000"}
          lineHeight={"1.3em"}
        >
          Plan Your Project with Your Software
        </Text>
        <Text fontSize="15px" color="#6a7c92" lineHeight={"2em"}>
          {" "}
          Meh synth Schlitz, tempor duis single-origin coffee ea next level
          ethnic fingerstache.
        </Text>
      </Box>
      <Box
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        width={"380px"}
        height={"450px"}
        display={"flex"}
        flexDirection={"column"}
        p={4}
        alignItems={"center"}
        position={"relative"}
        gap={2}
      >
        <Box
          width={"270px"}
          height={"200px"}
          position={"relative"}
          display={"flex"}
          flexDir={"column"}
          bgImage={"./blog2.jpg"}
          bgPosition={"center"}
        >
          <Badge
            display={"inline-block"}
            mt={2}
            ml={2}
            letterSpacing={"1px"}
            marginRight={"5px"}
            padding={"5px 16px"}
            fontSize={"12px"}
            fontWeight={"500"}
            borderRadius={"2px"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"108px"}
            height={"29px"}
            bgColor={"#000"}
            color={"#a17635"}
          >
            Business
          </Badge>
          <Box
            display={"flex"}
            fontSize={"14px"}
            width={"100%"}
            padding={"12px 20px"}
            borderRadius={"3px"}
            bottom={"-20px"}
            position={"absolute"}
            textAlign={"center"}
            flexDir={"column"}
            alignSelf={"center"}
            color={"#6a7c92"}
            bgColor={"white"}
            boxShadow="0 9px 6px rgba(0, 0, 0, 0.1)"
          >
            Itsolve - february 24{" "}
          </Box>
        </Box>

        <Text
          width={"230px"}
          fontWeight="700"
          fontSize="20px"
          m={"30px 0"}
          color={"#000"}
          lineHeight={"1.3em"}
        >
          You have a Great Is Business Idea?
        </Text>
        <Text fontSize="15px" color="#6a7c92" lineHeight={"2em"}>
          {" "}
          Meh synth Schlitz, tempor duis single-origin coffee ea next level
          ethnic fingerstache.
        </Text>
      </Box>
      <Box
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        width={"380px"}
        height={"450px"}
        display={"flex"}
        flexDirection={"column"}
        p={4}
        alignItems={"center"}
        position={"relative"}
        gap={2}
      >
        <Box
          width={"270px"}
          height={"200px"}
          position={"relative"}
          display={"flex"}
          flexDir={"column"}
          bgImage={"./blog3.jpg"}
          bgPosition={"center"}
        >
          <Badge
            display={"inline-block"}
            mt={2}
            ml={2}
            letterSpacing={"1px"}
            marginRight={"5px"}
            padding={"5px 16px"}
            fontSize={"12px"}
            fontWeight={"500"}
            borderRadius={"2px"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"108px"}
            height={"29px"}
            bgColor={"#000"}
            color={"#a17635"}
          >
            Minimalist
          </Badge>
          <Box
            display={"flex"}
            fontSize={"14px"}
            width={"100%"}
            padding={"12px 20px"}
            borderRadius={"3px"}
            bottom={"-20px"}
            position={"absolute"}
            textAlign={"center"}
            flexDir={"column"}
            alignSelf={"center"}
            color={"#6a7c92"}
            bgColor={"white"}
            boxShadow="0 9px 6px rgba(0, 0, 0, 0.1)"
          >
            Itsolve - february 24{" "}
          </Box>
        </Box>

        <Text
          width={"230px"}
          fontWeight="700"
          fontSize="20px"
          m={"30px 0"}
          color={"#000"}
          lineHeight={"1.3em"}
        >
          How to Make Website WCAG Compliant?
        </Text>
        <Text fontSize="15px" color="#6a7c92" lineHeight={"2em"}>
          {" "}
          Meh synth Schlitz, tempor duis single-origin coffee ea next level
          ethnic fingerstache.
        </Text>
      </Box>
    </Grid>
  );
};

export default BlogGrid;
