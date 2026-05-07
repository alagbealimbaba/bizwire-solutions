import { Box, Text } from "@chakra-ui/react";
import { Jelly } from "@uiball/loaders";
const Loading = () => {
  return (
    <Box
      bg={"#EDF2F7"}
      height={"100vh"}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
    >
      <Jelly size={55} speed={1.4} color="#a17635" />
      <Text>Loading...</Text>
    </Box>
  );
};

export default Loading;
