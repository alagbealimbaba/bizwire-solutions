import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import team from "../Sections/team.jpeg";

const Team = () => {
  return (
    <Box
      display={"flex"}
      p={{
        lg: "20px 50px 15px 50px",
        md: "40px 25px 40px 25px",
        base: "40px 25px 40px 25px",
      }}
      bg={"gray.100"}
      color={"black"}
      flexDirection={{ lg: "row", base: "column" }}
    >
      <Box w={{ lg: "50%", base: "100%" }}>
        <Image src={team} w={"555px"} h={"420px"} />
      </Box>
      <Box
        w={{ lg: "50%", base: "100%" }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        textAlign={"justify"}
        fontSize={"18px"}
        marginTop={{ lg: 0, base: "40px" }}
      >
        <Text fontWeight={"700"} fontSize={"24px"}>
          Our Team
        </Text>
        <Text>Great things in business are never done by one person.</Text>
        <Text>
          We parade talented and research-oriented professionals with strong
          engineering, finance, and planning backgrounds, who are extensively
          exposed to the broad spectrum of project planning, management,
          computing and communication technologies.
        </Text>
        <Text>
          It is our culture not just to make modern technology available, but to
          provide tailored made solutions that meet the need and budget of every
          customer. We therefore engage the services of highly trained,
          qualified, and experienced professionals who ensure the highest level
          of technical and accounting expertise is vested in our products.{" "}
        </Text>
        <Text>
          We collaborate; find answers, solve problems, provide solutions and
          get you inspired.
        </Text>
      </Box>
    </Box>
  );
};

export default Team;
