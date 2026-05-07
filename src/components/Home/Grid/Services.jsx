import { Box, Flex, Text, Image } from "@chakra-ui/react";
import ConsultancyGrid from "./ConsultancyGrid";
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
              src="./Consult.jpg"
              alt="thumbnail services"
              h={"580px"}
              w={{ lg: "100%", base: "100%" }}
            />
            <Flex
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              textAlign={"left"}
              margin={'2px 0 25px 0'}
            >
              <Text
                color={"#000"}
                width={"100%"}
                letterSpacing={"-0.2px"}
                lineHeight={"-1px"}
                marginBottom={{ lg: "0px", md: "15px", base: "15px" }}
                fontSize={"32px"}
                fontStyle={"italic"}
                textAlign={'center'}
                p={'0 25px'}
              >
                We specialized in transformation and process management
                collaborations that will create a positive ripple effect on your
                business strategy, operating models and quality of life.{" "}
              </Text>
            </Flex>
            <Box>
              <ConsultancyGrid />
            </Box>
          </Box>
          <Footer />
        </>
      )}
    </Box>
  );
};

export default Services;
