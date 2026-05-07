import { Box } from "@chakra-ui/react";
import Loading from "../loading";
import { Navbar } from "../Home/Navbar/Navbar";
import { BreadCrumbs } from "../breadCrumbs";
import Footer from "../Home/Footer";
import { usePageLoader } from "../../hooks/usePageLoader";

const Mission = () => {
  const isLoading = usePageLoader();

  return (
    <Box>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <BreadCrumbs />
          <Footer />
        </>
      )}
    </Box>
  );
};

export default Mission;
