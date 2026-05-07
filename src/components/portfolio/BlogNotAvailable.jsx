import { Box, Image, Text } from "@chakra-ui/react";
import { Navbar } from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer";
import Loading from "../loading";
import { usePageLoader } from "../../hooks/usePageLoader";

const BlogNotAvailable = () => {
  const isLoading = usePageLoader();

  return (
    <Box>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <Box position={"relative"} height={'100vh'}>
            <Image src="./blog-page.jpg" w={"100%"} h={'100%'} />
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
