import { Box, Flex, Text, Image } from "@chakra-ui/react";
import InformationTechnology from "./InformationTechnologyGrid";
import { Navbar } from "../Navbar/Navbar";
import Loading from "../../loading";
import Footer from "../Footer";
import { usePageLoader } from "../../../hooks/usePageLoader";

const Services = () => {
  const isLoading = usePageLoader();

  return (
    <Box>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <Box width={"100%"} bg={"gray.100"}>
            <Image
              src="./tech services2.jpg"
              alt="thumbnail services"
              h={"580px"}
              w={{ lg: "100%", base: "100%" }}
            />
            <Flex
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              margin={'2px 0 25px 0'}
            >
              <Text
                color={"black"}
                letterSpacing={"-0.2px"}
                lineHeight={"-1px"}
                fontSize={"32px"}
                fontStyle={"italic"}
                textAlign={"center"}
                p={"0 25px"}
              >
                We help organizations thrive by unlocking their tech and people
                potentials. We work with our clients to build impactful products
                and high-performing teams leveraging latest technologies.
              </Text>
            </Flex>
            <Box>
              <InformationTechnology />
            </Box>
          </Box>
          <Footer />
        </>
      )}
    </Box>
  );
};

export default Services;
