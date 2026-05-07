import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Navbar } from "./Navbar/Navbar";
import Solutions from "./Solutions";
import FormPage from "./FormPage";
import Business from "./Business-02";
import Consulting from "./Consulting01";
import Blog from "./Blog/Blog";
import Footer from "./Footer";
import Solution from "./Solution-03";
import ITWork from "./ITWork/ITWork";
import Loading from "../loading";

function Homepage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Box textAlign="center" fontSize="xl" w={"100%"}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          {/* <Hero /> */}
          <Solutions />
          {/* <InformationServices />
          <Services /> */}
          <ITWork />
          {/* <Numbers /> */}
          <Consulting />
          <Business />
          <Solution />
          <FormPage />
          {/* <FormCard /> */}
          {/* <Blog /> */}
          <Footer />
        </>
      )}
    </Box>
  );
}

export default Homepage;
