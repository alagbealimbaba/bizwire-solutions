import { Box } from "@chakra-ui/react";
import Loading from "../loading";
import { Navbar } from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer";
import Hero from "./Sections/Hero";
import Vision from "./Sections/MissionVision";
import Team from "./Sections/Team";
import Corevalues from "./Sections/Corevalues";
import { usePageLoader } from "../../hooks/usePageLoader";

const AboutUs = () => {
  const isLoading = usePageLoader();

  return (
    <Box>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <Hero />
          <Vision />
          <Team />
          <Corevalues />
          <Footer />
        </>
      )}
    </Box>
  );
};

export default AboutUs;
