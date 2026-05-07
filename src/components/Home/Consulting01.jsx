import { useEffect, useRef } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import gsap from "gsap";
import ReadMore from "./ReusableComps/ReadMore";

const Consulting = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(imageRef.current, {
      y: 40,
      duration: 1,
      opacity: 1,
      yoyo: true,
      repeat: -1,
    });

    tl.play();
  }, []);
  return (
    <>
      <Text
        color={"#000"}
        fontSize={{ lg: "5xl", md: "3xl", base: "3xl" }}
        bg={"gray.100"}
      >
        OUR SUCCESS IS NOT MAGIC....
      </Text>
      <Flex
        flexDirection={{ lg: "row", sm: "column" }}
        justifyContent={"center"}
        p={{
          lg: "0px 50px 0px 50px",
          md: "40px 25px 40px 25px",
          base: "40px 25px 40px 25px",
        }}
        width={"100%"}
        gap={24}
        bg={"gray.100"}
      >
        <Box
          w={{ lg: "30%", md: "100%", base: "100%" }}
          p={{ lg: 3, md: 3, base: 0 }}
          display={'grid'}
          placeItems={'center'}
        >
          <Image
            src="./business02.png"
            alt="thumnail services"
            ref={imageRef}
          />
        </Box>
        <Flex
          w={{ lg: "50%", md: "100%", base: "100%" }}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"flex-start"}
          flexDirection={"column"}
          p={4}
          mt={12}
        >
          <Box>
            <Text
              textAlign={"left"}
              color={"#000"}
              margin={"0 0 10px"}
              lineHeight={"1.4em"}
              fontSize={"32px"}
              width={"100%"}
            >
              We consult to get our solution plans
            </Text>
          </Box>
          <Text
            color={"gray"}
            fontSize={"18px"}
            textAlign={"justify"}
            fontStyle={"italic"}
            lineHeight={"1.8em"}
          >
            We are relentlessly focused on helping you and your business
            maximize value and achieve your ambitions and objectives.
          </Text>
          <Text
            color={"gray"}
            width={{ lg: "580px", md: "100%", base: "100%" }}
            fontSize={"18px"}
            fontStyle={"italic"}
            textAlign={"justify"}
            margin={"20px 0 0 0"}
            lineHeight={"1.8em"}
          >
            We take time to understand your organization and the current
            situation to ensure our approach is personalized, pragmatic,
            productive and value adding.
          </Text>

          <ReadMore />
        </Flex>
      </Flex>
    </>
  );
};

export default Consulting;
