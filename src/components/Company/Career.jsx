import { Box } from "@chakra-ui/react";
import { Navbar } from "../Home/Navbar/Navbar";
import { BreadCrumbs } from "../breadCrumbs";
import Footer from "../Home/Footer";

const Mission = () => {
  return (
    <Box>
      <Navbar />
      <BreadCrumbs />
      <Footer />
    </Box>
  );
};

export default Mission;
