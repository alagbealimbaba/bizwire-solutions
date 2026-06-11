import { Box } from "@chakra-ui/react";
import { Navbar } from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer";
import Hero from "./Sections/Hero";
import Vision from "./Sections/MissionVision";
import Team from "./Sections/Team";
import Corevalues from "./Sections/Corevalues";

const AboutUs = () => {
  return (
    <Box>
      <Navbar />
      <Hero />
      <Vision />
      <Team />
      <Corevalues />
      <Footer />
    </Box>
  );
};

export default AboutUs;
