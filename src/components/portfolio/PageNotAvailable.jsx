import React , {useState,useEffect} from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { Navbar } from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer";
import Loading from "../loading";

const PageNotAvailable = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Box>
      {isLoading ? (
        <Loading />
      ): (
    <>
    <Navbar />
        <Box position={"relative"} height={'100vh'}>
      <Image src="./portfolio.png" w={"100%"} h={'100%'}/>
      <Text
        position={"absolute"}
        top={"450px"}
        left={"550px"}
        color={"white"}
        fontSize={"32px"}
      >
        This page is under development
      </Text>
    </Box>
    <Footer />
</>
      )}
    </Box>
  );
};

export default PageNotAvailable;
