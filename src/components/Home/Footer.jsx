import { Box, Flex, Link, Text, Image } from "@chakra-ui/react";
import { HiMail } from "react-icons/hi";
import { AiFillPhone } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  const [isFacebookHovered, setIsFacebookHovered] = useState(false);
  const [isTwitterHovered, setIsTwitterHovered] = useState(false);
  const [isInstagramHovered, setIsInstagramHovered] = useState(false);
  const [isGlobeHovered, setIsGlobeHovered] = useState(false);

  const customIcon = {
    color: "#c9923e",
    fontSize: "12px",
    backgroundColor: "#000",
    height: "45px",
    width: "45px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: "45px",
    borderRadius: "5px",
    marginBottom: "20px",
  };

  const socialIconStyle = {
    fontSize: "15px",
    margin: "0 6px",
    transition: "0.3s",
    width: "45px",
    height: "45px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: "45px",
    textAlign: "center",
    borderRadius: "50%",
  };
  const scrollToContactUs = () => {
    const contactSection = document.getElementById("contact-us-section");
    contactSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={{ lg: "30px 30px 40px 30px", base: "20px 0px 70px 0px" }}
      flexDirection="column"
      gap={2}
      backgroundColor="gray.400"
      color="white"
    >
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Image src="./logo.png" h={"64px"} w={"128px"} />
        <Box
          h={"64px"}
          color={"black"}
          paddingTop={"12px"}
          fontSize={"xl"}
          fontWeight="semibold"
        >
          <Text>Dynamics Ltd.</Text>
        </Box>
      </Box>
      <Box
        display="flex"
        w="100%"
        alignItems="flex-start"
        justifyContent={{
          lg: "space-evenly",
          md: "space-between",
          base: "space-between",
        }}
        flexDirection={"row"}
        gap={{ lg: 0, md: 2, base: 2 }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          w={{ lg: "33%", md: "100%", base: "100%" }}
          gap={{ lg: 0, md: 3, base: 0 }}
        >
          <Box style={customIcon}>
            <HiMail fontSize="18px" />
          </Box>
          <Text color={"black"} fontWeight="semibold" fontSize="md">
            Email Address
          </Text>
          <Text
            color={"black"}
            textAlign={"center"}
            fontSize={{ lg: "18px", base: "16px" }}
          >
            consult@bizwiredynamics.com
          </Text>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          w={{ lg: "33%", md: "100%", base: "100%" }}
        >
          <Box style={customIcon}>
            <AiFillPhone fontSize="18px" />
          </Box>
          <Text color={"black"} fontWeight="semibold" fontSize="md">
            Telephone Number
          </Text>
          <Text
            color={"black"}
            textAlign={"center"}
            fontSize={{ lg: "18px", base: "16px" }}
          >
            +234 8039601150
          </Text>
        </Box>
      </Box>
      <Box display="flex" gap={6} flexDirection="column">
        <Box>
          <Flex
            flexDirection={{ base: "column", lg: "row" }}
            gap={{ lg: 8, md: 2, base: 3 }}
            fontSize={{ lg: "16px", md: "14px", base: "14px" }}
            justifyContent={"center"}
            alignItems={"center"}
            color={"black"}
            mt={4}
          >
            <RouterLink to={"/home"}>Home</RouterLink>
            <RouterLink to={"/about"}>Company</RouterLink>
            <RouterLink to={"/information-services"}>Tech Service</RouterLink>
            <RouterLink to={"/services"}>Consulting</RouterLink>
            <RouterLink to={"/pagenotavailable"}>Portfolio</RouterLink>
            <RouterLink to={"/blog"}>Blog</RouterLink>
          </Flex>
        </Box>
        <Box>
          <Text color={"black"} align="center" fontSize={"16px"}>
            Copyright &copy; Bizwire Dynamics Ltd all rights reserved
          </Text>
        </Box>
        <Box display="flex" gap={6} justifyContent="center" alignItems="center">
          <Link
            style={{
              ...socialIconStyle,
              color: isFacebookHovered ? "#000" : "#a17635",
              background: isFacebookHovered ? "#a17635" : "#000",
            }}
            onMouseEnter={() => setIsFacebookHovered(true)}
            onMouseLeave={() => setIsFacebookHovered(false)}
          >
            <FaFacebookF />
          </Link>
          <Link
            style={{
              ...socialIconStyle,
              color: isTwitterHovered ? "#000" : "#a17635",
              background: isTwitterHovered ? "#a17635" : "#000",
            }}
            onMouseEnter={() => setIsTwitterHovered(true)}
            onMouseLeave={() => setIsTwitterHovered(false)}
          >
            <FaXTwitter />
          </Link>
          <Link
            style={{
              ...socialIconStyle,
              color: isInstagramHovered ? "#000" : "#a17635",
              background: isInstagramHovered ? "#a17635" : "#000",
            }}
            onMouseEnter={() => setIsInstagramHovered(true)}
            onMouseLeave={() => setIsInstagramHovered(false)}
          >
            <FaInstagram />
          </Link>
          <Link
            style={{
              ...socialIconStyle,
              color: isGlobeHovered ? "#000" : "#a17635",
              background: isGlobeHovered ? "#a17635" : "#000",
            }}
            onMouseEnter={() => setIsGlobeHovered(true)}
            onMouseLeave={() => setIsGlobeHovered(false)}
          >
            <HiOutlineGlobeAlt />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
