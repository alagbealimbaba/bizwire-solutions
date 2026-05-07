import { Box, Flex, Text } from "@chakra-ui/react";
import InformationTechnology from "./InformationTechnologyGrid";

const Services = () => {
  return (
    <Box
      bg={"gray.100"}
 p={{
          lg: "50px 50px 0px 50px",
          md: "40px 25px 40px 25px",
          base: "40px 25px 40px 25px",
        }}
    >
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text
          color={"#000"}
          fontSize={"32px"}
          textTransform={""}
          fontWeight={"600"}
          margin-bottom={"15px"}
          letterSpacing={"1px"}
          margin={"0 0 5px"}
          textAlign={"left"}
        >
          From Design to Development to Marketing{" "}
        </Text>

        <Text
          color={"#000000"}
          width={{lg :'100%' ,base:"100%"}}
          
          letterSpacing={"-0.2px"}
          lineHeight={"-1px"}
          marginBottom={{ lg: "0px", md: "15px", base: "15px" }}
          fontSize={"16px"}
          textAlign={"left "}
        >
          <Text margin={"6px 0"} fontSize={'18px'}>
            Diversifying your target audience and discovering new marketplaces
            can be great ways to develop a new product. It is also essential to
            keep attracting customers with new features and values so they don’t
            lose interest in your products over time.
          </Text>
          <Text margin={"10px 0"} fontSize={'18px'}>
            While Product Development is Important. Product development
            strategies are more important to ensure value for your potential
            customers, as well as ensuring that there is demand and that your
            final products are of the highest possible quality before your take
            the products to market.
          </Text>
          <Text margin={"10px 0"} fontSize={'18px'}>
            The spark of inspiration that produces a promising innovation is
            immensely thrilling. However, the many steps that are followed in
            getting an invention to market can seem overwhelming. Get in touch
            for a simplified approach that will make you a leader in the
            competitive market.
          </Text>{" "}
        </Text>
      </Flex>
      <Box>
        <InformationTechnology />
      </Box>
    </Box>
  );
};

export default Services;