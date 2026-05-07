import { Box, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const ReadMore = () => {
  return (
    <RouterLink  to={'/services'}>
      <Button
      mt={"20px"}
        width={"161px"}
        height={"52px"}
        border={"2px solid #000"}
        backgroundColor={"#000"}
        color={"#a17635"}
        _hover={{
          backgroundColor: "gray.400", 
          color: "black", 
          transition: "background-color 0.5s, color 0.5s",
        }}
      >
        Read More
      </Button>
    </RouterLink>
  );
};

export default ReadMore;
