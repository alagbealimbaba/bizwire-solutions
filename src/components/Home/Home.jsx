import { Box } from "@chakra-ui/react";
import { Navbar } from "./Navbar/Navbar";
import Solutions from "./Solutions";
import FormPage from "./FormPage";
import Business from "./Business-02";
import Consulting from "./Consulting01";
import Footer from "./Footer";
import Solution from "./Solution-03";
import ITWork from "./ITWork/ITWork";
import Loading from "../loading";
import { usePageLoader } from "../../hooks/usePageLoader";

function Homepage() {
  const isLoading = usePageLoader();

  return (
    <Box textAlign="center" fontSize="xl" w={"100%"}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <Solutions />
          <ITWork />
          <Consulting />
          <Business />
          <Solution />
          <FormPage />
          <Footer />
        </>
      )}
    </Box>
  );
}

export default Homepage;
