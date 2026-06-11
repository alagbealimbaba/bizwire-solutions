import { Box, Text, Flex } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const points = [
  {
    label: "Clean Design",
    body: "User experience is about aligning business goals, user needs and brand communication. We strive to create interfaces that are easy to use while focusing on the content, the key message, and the most important action — prioritizing function alongside beauty.",
  },
  {
    label: "Process Research",
    body: "A process baseline is a great tool for evaluating and improving your processes. We continuously document, monitor and measure processes against established baselines, enabling us to identify areas for further improvement and guide process enhancements.",
  },
  {
    label: "Right Solutions",
    body: "For every problem there is a solution — but the challenge lies in getting the right one. We are strategic solution providers with rich experience in problem-solving techniques that guarantee the right solutions and provide opportunities for future improvements.",
  },
  {
    label: "Responsive Sites",
    body: "Our designs automatically adjust for different-sized screens and viewports. Someone can browse from any device and it will still look and function perfectly — one seamless solution for the multitude of devices available to your customers.",
  },
];

const ITWork = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Box bg="gray.100" py={{ base: 14, lg: 20 }} px={{ base: 6, lg: 16 }}>
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        gap={{ base: 10, lg: 20 }}
        alignItems={{ lg: "flex-start" }}
        ref={ref}
      >
        {/* Left — heading block */}
        <MotionBox
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          flexShrink={0}
          w={{ base: "100%", lg: "320px" }}
        >
          <Flex alignItems="center" gap={3} mb={3}>
            <Box w="40px" h="3px" bg="#a17635" />
            <Text
              fontSize="xs"
              fontWeight="700"
              color="#a17635"
              letterSpacing="3px"
              textTransform="uppercase"
            >
              Our Approach
            </Text>
          </Flex>
          <Text
            fontSize={{ base: "30px", lg: "42px" }}
            fontWeight="700"
            color="#000"
            fontStyle="italic"
            lineHeight="1.2"
            mb={6}
            textAlign="left"
          >
            From Design to Development to Marketing.
          </Text>
          <Text
            fontSize="sm"
            color="#6a7c92"
            fontStyle="italic"
            lineHeight="1.8"
            textAlign="left"
          >
            Diversifying your target audience and discovering new marketplaces
            can be great ways to develop a new product. We ensure there is
            demand and that your final products are of the highest possible
            quality before you take them to market.
          </Text>
          <Box mt={8} w="60px" h="4px" bg="#000" />
        </MotionBox>

        {/* Right — points */}
        <Box flex="1" display="flex" flexDirection="column" gap={6}>
          {points.map((point, i) => (
            <MotionFlex
              key={point.label}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.15, ease: "easeOut" }}
              alignItems="flex-start"
              gap={5}
              bg="white"
              p={6}
              borderLeft="4px solid"
              borderColor="#a17635"
              textAlign="left"
            >
              <Text
                fontSize="28px"
                fontWeight="800"
                color="gray.200"
                lineHeight="1"
                flexShrink={0}
                mt={1}
              >
                0{i + 1}
              </Text>
              <Box>
                <Text
                  fontWeight="700"
                  color="#000"
                  fontSize="sm"
                  mb={2}
                  textTransform="uppercase"
                  letterSpacing="1px"
                >
                  {point.label}
                </Text>
                <Text
                  fontSize={{ base: "15px", lg: "16px" }}
                  color="#6a7c92"
                  fontStyle="italic"
                  lineHeight="1.85"
                >
                  {point.body}
                </Text>
              </Box>
            </MotionFlex>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default ITWork;
