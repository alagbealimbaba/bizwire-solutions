import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { FaCircle } from "react-icons/fa";
import gsap from "gsap";

const Solutions = () => {
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
      <Box
        display={"flex"}
        flexDirection={{ lg: "row", md: "column", base: "column" }}
        w={"100%"}
        justifyContent={{ sm: "center", md: "center", lg: "space-between" }}
        alignItems={"center"}

        bgImage={"bg-image.png"}
        bgSize={"cover"}
        bgPos={"center"}
        bgRepeat={"none"}
        h={"85vh"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          w={"100%"}
          mb={"80px"}
        >
          <Text
            fontSize={"44px"}
            textAlign={"center"}
            color={"#000000"}
            textTransform={"capitalize"}
            fontStyle={"italic"}
            margin={"0 0 10px"}
            lineHeight={"1.4em"}
            fontWeight={"700"}
          >
            Business with intelligent requirements and expertise
          </Text>
          <Text textAlign={"center"} color={"black"} fontStyle={"italic"}>
            Empowering the world with inspiring solutions……………….
          </Text>
        </Box>
      </Box>
      <Flex
        p={{
          lg: "50px 50px 0px 50px",
          md: "40px 25px 40px 25px",
          base: "40px 25px 40px 25px",
        }}
        bg={"gray.100"}
        gap={10}
        flexDirection={{
          lg: "row",
          md: "column-reverse",
          base: "column-reverse",
        }}
      >
        <Box w={{ lg: "30%", md: "100%", base: "100%" }}
          p={{ lg: 3, md: 3, base: 0 }}
          display={'grid'}
          placeItems={'center'}>
          <Image
            src="./hero.png"
            alt="thumbnail services"
          ref={imageRef}
          />
        </Box>
        <Flex
          w={{ lg: "70%", md: "100%", base: "100%" }}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"flex-start"}
          flexDirection={"column"}
            p={{ lg: 4, md: 4, base: 0 }}
          // border={"1px solid black"}
        >
          <Box textAlign={"left"}>
            <Text
              fontWeight={"600"}
              lineHeight={"1.2"}
              color={"#000"}
              margin={"0 0 10px"}
              fontSize={"32px"}
              width={{  md: "100%", base: "100%" }}
            >
              Exclusive Agency For Critical and Value-Adding Solutions
            </Text>
          </Box>
          <Text textAlign={"left"}  color={"#000"}  fontWeight={"400"}>
            Bizwire is the partner of choice for many of the leading businesses
            and problem-solving enterprises, SMEs and technology challengers. We
            help businesses elevate their worth through custom services that
            bring out values from investments. 
          </Text>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"flex-start"}
            flexDirection={"column"}
            gap={2}
            w={"100%"}
            mt={4}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={3}
            >
              <FaCircle size={"10px"} color="black" />
              <Text
                fontSize={{ lg: "18px", md: "14px", base: "14px" }}
                color={"gray.600"}
                letterSpacing={"-0.5px"}
              >
                Information Technology and Communication Services{" "}
              </Text>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={3}
            >
              <FaCircle size={"10px"} color="black" />
              <Text
                fontSize={{ lg: "18px", md: "14px", base: "14px" }}
                color={"gray.600"}
                letterSpacing={"-0.5px"}
              >
                Business Continuity Management
              </Text>
            </Box>

            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={3}
            >
              <FaCircle size={"10px"} color="black" />
              <Text
                fontSize={{ lg: "18px", md: "14px", base: "14px" }}
                color={"gray.600"}
                letterSpacing={"-0.5px"}
              >
                General Process Improvement
              </Text>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={3}
            >
              <FaCircle size={"10px"} color="black" />
              <Text
                fontSize={{ lg: "18px", md: "14px", base: "14px" }}
                color={"gray.600"}
                letterSpacing={"-0.5px"}
              >
                Financial Advisory and Tax Management
              </Text>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={3}
            >
              <FaCircle size={"10px"} color="black" />
              <Text
                fontSize={{ lg: "18px", md: "14px", base: "14px" }}
                color={"gray.600"}
                letterSpacing={"-0.5px"}
              >
                Property Development
              </Text>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={3}
            >
              <FaCircle size={"10px"} color="black" />
              <Text
                fontSize={{ lg: "18px", md: "14px", base: "14px" }}
                color={"gray.600"}
                letterSpacing={"-0.5px"}
              >
                Infrastructure Development
              </Text>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={3}
            >
              <FaCircle size={"10px"} color="black" />
              <Text
                fontSize={{ lg: "18px", md: "14px", base: "14px" }}
                color={"gray.600"}
                letterSpacing={"-0.5px"}
              >
                Human Capital Development
              </Text>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Solutions;
