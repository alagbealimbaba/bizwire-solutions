import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { Navbar } from "../Home/Navbar/Navbar";
import { BreadCrumbs } from "../breadCrumbs";
import Footer from "../Home/Footer";
import Hero from "./Sections/Hero";
import Vision from "./Sections/MissionVision";
import Team from "./Sections/Team";
import Corevalues from "./Sections/Corevalues";

const AboutUs = () => {
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
      ) : (
        <>
          <Navbar />
          {/* <BreadCrumbs /> */}
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
