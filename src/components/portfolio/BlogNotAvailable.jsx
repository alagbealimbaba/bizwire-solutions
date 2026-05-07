import React , {useState,useEffect} from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { Navbar } from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer";
import Loading from "../loading";

const BlogNotAvailable = () => {
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
      <Image src="./blog-page.jpg" w={"100%"} h={'100%'}/>
      <Text
        position={"absolute"}
        top={"400px"}
        left={"750px"}
        color={"black"}
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

export default BlogNotAvailable;
