import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { useHoverIndex } from "../../../hooks/useHoverIndex";

const items = [
  {
    logoBackground: "url(./smartphone.png)",
    topic: "Clean Design",
    subtopic:
      "Always keep in mind that user experience is about aligning businessgoals, user needs and brand communication. Clarity in design is a philosophy that emphasizes the visibility of an interface and the ease of use for its users. We strive to create an interface that is easy to use, while also providing flexibility and customization, focusing on the content, the key message, the most important action, and prioritizing function over beauty",
  },
  {
    logoBackground: "url(./analysis.png)",
    topic: "Process Research",
    subtopic:
      "A process baseline is a great tool for evaluating and improving your processes. it serves as a documented snapshot of a process at a particular moment in time. Once a process is documented , you can analyze it for inefficiences and set improvement goals.We continuously document, monitor and measure processes against the established baselines which enable us identify areas for further improvement and to guide process enhancements.",
  },
  {
    logoBackground: "url(./padlock.png)",
    topic: "Right Solutions",
    subtopic:
      "It is commonly said that for every problem, there is a solution. But the challenge lies in getting the right solution and/or getting the solution right. Getting the right solution is a systematic process while getting the solution right is majorly based on luck. We are strategic solution provider with very rich experiences in problem solving techniques that guarantee the right solutions and provide opportunities for future improvements.",
  },
  {
    logoBackground: "url(./coding.png)",
    topic: "Responsive Site",
    subtopic:
      "Our designs automatically adjust for different-sized screens and viewports. Someone can browse our website from any device, and it will still look and function perfectly. Our web development design approach creates dynamic changes to the appearance of a website, depending on the screen size and orientation of the device being used to view it. One solution for the multitude of devices available to customers, ranging from tiny phones to huge desktop monitors.",
  },
];

const GridComponent = () => {
  const { hoveredIndex, handleMouseEnter, handleMouseLeave } = useHoverIndex();

  return (
    <Box
      w={"100%"}
      padding={{ lg: "20px", sm: "none" }}
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
          lg: "repeat(2, 1fr)",
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
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Box
              bgImage={item.logoBackground}
              bgRepeat="no-repeat"
              bgSize="contain"
              bgPosition="center center"
              width="100px"
              height="100px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{
                transform: `rotateY(${hoveredIndex === index ? "180" : "0"}deg)`,
                transition: "transform 1s",
              }}
            ></Box>
            <Text
              fontSize="26px"
              m={"10px 0"}
              color={"#000"}
              lineHeight={"1.3em"}
              textAlign={"center"}
            >
              {item.topic}
            </Text>
            <Text
              fontSize="18px"
              color="#6a7c92"
              lineHeight={"2em"}
              textAlign={"justify"}
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
