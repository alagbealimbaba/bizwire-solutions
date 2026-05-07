import { Flex, Text, Box } from "@chakra-ui/react";
import ReadMore from "./ReusableComps/ReadMore";
const FormCard = () => {
  return (
    <Flex
      p={{
        lg: "50px 50px 15px 50px",
        md: "40px 25px 40px 25px",
        base: "40px 25px 40px 25px",
      }}
      w={"100%"}
      alignItems={"center"}
      justifyContent={"space-evenly"}
      bg={` url('/bg1.png') center center/cover no-repeat scroll`}
      bgColor={"gray.400"}
      gap={{ base: 2, md: 2, lg: 8 }}
      h={{ base: "150px", md: "200px", lg: "200px" }}
    >
      <Box width="50%">
        <Text
          margin={"0 0 10px"}
          fontWeight={"700"}
          color={"black"}
          fontSize={{ base: "20px", md: "28px", lg: "28px" }}
          lineHeight={"1.3em"}
          textAlign={"left"}
          width={{ base: "100%", lg: "500px" }}
        >
          Great Things In Business Are Never Done By One Person.
        </Text>
      </Box>
      <Box width={"50%"}>
        <ReadMore />
      </Box>
    </Flex>
  );
};

export default FormCard;
