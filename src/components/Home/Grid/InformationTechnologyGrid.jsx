import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { useHoverIndex } from "../../../hooks/useHoverIndex";

const items = [
  {
    logoBackground: "url(./ADE.jpeg)",
    topic: "Application Development and  E-Commerce",
    subtopic:
      "We create custom solutions across a wide spectrum of functions and industries to meet specific needs. Web, Mobile and Enterprise Resource Planning systems development, customization and integration that is aligned with business priorities, strategies and objectives.",
  },
  {
    logoBackground: "url(./ANI.jpeg)",
    topic: "Office Automations and Networking Infrastructure",
    subtopic:
      "A complete office automation is a strength and cabling solutions are delivered using appropriate technology. Our network solution services range from installation of operating system to servers and firewall configurations including implementation of routers, switches, Voice Solutions, VPNs, etc",
  },
  {
    logoBackground: "url(./DMS.jpg)",
    topic: "Technical Digital Marketing Services                  ",
    subtopic:
      "We believe in tailored digital marketing solutions that propel your business to new heights. Join a partnership that understands your brand, your goals, and your unique market. We're not just an agency – we're your digital marketing allies, committed to driving success day after day.",
  },
  {
    logoBackground: "url(./DEA.jpg)",
    topic: "Data Engineering & Analytics",
    subtopic:
      "We leverage our leading-edge analytics, plus the power of data science and products, to help our clients make more intelligent decisions, deliver innovative solutions and improve overall results.       ",
  },
  {
    logoBackground: "url(./WFM.jpg)",
    topic: "Workflow Management",
    subtopic:
      "Automating business workflows allows you to optimize people, processes and data to achieve better business outcomes. This will increase efficiency and empowers your team to focus on high-value tasks. We offer workflow implementation services using latest AI and ML tools.      ",
  },
  {
    logoBackground: "url(./IOT.jpeg)",
    topic: "Internet of Things (IoT)                  ",
    subtopic:
      "Beat Your Competitors to be number one spot in automation by using IoT apps.      ",
  },
];

const GridComponent = () => {
  const { hoveredIndex, handleMouseEnter, handleMouseLeave } = useHoverIndex();

  return (
    <Box
      Width="100%"
      padding={{ lg: "25px", base: "90px" }}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid
        className="grid-cols"
        templateColumns={{
          md: "repeat(2, 1fr)",
          base: "repeat(1, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        {items.map((item, index) => (
          <GridItem
            key={index}
            p={8}
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            borderWidth="1px"
            boxShadow={
              hoveredIndex === index ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "none"
            }
            bg={"white"}
            width="380px"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Box
              bgImage={item.logoBackground}
              bgRepeat="no-repeat"
              bgSize="contain"
              bgPosition="center center"
              width="120px"
              height="120px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{
                transform: `rotateY(${hoveredIndex === index ? "180" : "0"}deg)`,
                transition: "transform 1s",
              }}
            ></Box>
            <Text
              fontWeight="700"
              fontSize="20px"
              m={"10px 0"}
              color={"#000"}
              lineHeight={"1.3em"}
              textAlign={"center"}
            >
              {item.topic}
            </Text>
            <Text
              fontSize="15px"
              color="#6a7c92"
              lineHeight={"2em"}
              textAlign={"left"}
            >
              {item.subtopic}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default GridComponent;
