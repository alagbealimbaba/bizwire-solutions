import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import corevalues from "../Sections/corevalues.png";

const Corevalues = () => {
  return (
    <Box
      textAlign={"justify"}
      p={{
        lg: "50px 50px 35px 50px",
        md: "40px 25px 40px 25px",
        base: "40px 25px 40px 25px",
      }}
      color={"black"}
    >
      <Box>
        <Box display={"grid"} placeItems={"center"}>
          {" "}
          <Image src={corevalues} w={"1146px"} h={"308px"} />
        </Box>
        <Box w={"100%"} h={"33px"} bg={"gray.700"} />
      </Box>
      <Box display={"grid"} gap={12} mt={2} flexDirection={{lg:'row' , base:'column'}} gridTemplateColumns={{lg: '4fr 4fr 4fr 4fr' ,base:'2fr 2fr'}}>
        <Box display={"flex"} flexDirection={"column"} gap={3} w={{lg:'100%'}} alignItems={'center'} justifyContent={'center'}>
          <Text textAlign={"center"} fontWeight={"700"}>
            Partnership
          </Text>
          <Text>
            We deliver simplified and consistent experience to become a
            strategic partner with absolute transparency to improve trust and
            creditability.
          </Text>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={3}>
          <Text textAlign={"center"} fontWeight={"700"}>
            Prudency
          </Text>
          <Text>
            Solutions are not just made available. We ensure deployment of
            custom-made products that are efficient, reliable, and nominal.
          </Text>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={3}>
          <Text textAlign={"center"} fontWeight={"700"}>
            Improvement
          </Text>
          <Text>
            It is not about giving the business a better product, it’s about
            making it a better Business! We focus on increased 
            visible business 
            values.
          </Text>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={3}>
          <Text textAlign={"center"} fontWeight={"700"}>
            Continuity
          </Text>
          <Text>
            We have taken decisive and effective actions to consider resilience
            and have embedded a recovery centric mindset in our products.{" "}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Corevalues;
