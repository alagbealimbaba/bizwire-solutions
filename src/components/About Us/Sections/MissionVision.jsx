import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import mission from "../Sections/mission.png";

const MissionVision = () => {
  return (
    <Box
      display={"flex"}
      textAlign={"justify"}
      p={{
        lg: "30px 50px 10px 50px",
        md: "40px 25px 40px 25px",
        base: "40px 25px 40px 25px",
      }}
      flexDirection={{ lg: "row", base: "column-reverse" }}
      gap={28}
      color={"black"}
      //   bg={"gray.100"}
    >
      <Box
        w={{ lg: "50%", base: "100%" }}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"space-around"}
      >
        <Box>
          <Text mb={1} fontWeight={"700"} fontSize={'24px'}>
            Our Vision
          </Text>
          <Text>
            Bizwire Dynamics Limited (BDL) is a young but fast-growing solution
            provider and consultancy establishment with a vision to leverage
            Information and Communication Technologies to create Solutions and
            Experiences that drive impacts. .{" "}
          </Text>
        </Box>
        <Box>
          <Text mb={1} fontWeight={"700"} fontSize={'24px'}>
            Our Mission
          </Text>
          <Text>
            To be the partner of choice for many of the leading businesses and
            problem-solving enterprises, SMEs and technology challengers through
            custom services that brings out values from investments.
          </Text>
        </Box>
      </Box>
      <Box>
        <Image src={mission} w={"990px"} h={"452px"} />
      </Box>
    </Box>
  );
};

export default MissionVision;
