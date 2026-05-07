import React from "react";
import {
  Box,
  ButtonGroup,
  Container,
  HStack,
  Button,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MobileDrawer } from "./MobileDrawer";
import DocumentPopover from "./DocumentPopover";
import { menuLinks } from "../../../constants/navigationMenu";

export const Navbar = () => {
  return (
    <Box
      zIndex={"999"}
      display="flex"
      alignItems="center"
      justifyContent={"center"}
      p={{ base: "10px", lg: "20px 40px 20px 40px" }}
      maxW="100%"
      bg="gray.400"
      top={0}
      right={0}
      position="sticky"
    >
      <Container maxW="100%">
        <HStack justifyContent="space-between">
          <HStack
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            w={{ base: "100%" }}
          >
            <Link to={"/home"}>
              <Box alignSelf={"flex-start"} left={0}>
                <Image src="./logo.png" h={"64px"} w={"128px"} />
              </Box>
            </Link>
            <MobileDrawer />
          </HStack>
          <ButtonGroup
            variant="text.accent"
            colorScheme="gray"
            color={"black"}
            display={{
              base: "none",
              lg: "flex",
            }}
          >
            {Object.keys(menuLinks).map((headerText) =>
              headerText === "Portfolio" ? (
                <DocumentPopover
                  key={headerText}
                  headerText={headerText}
                  documentItems={menuLinks[headerText].items}
                  subLinks={menuLinks[headerText].subLinks}
                />
              ) : (
                <Link key={headerText} to={menuLinks[headerText].link}>
                  <Button
                    color="black"
                    fontWeight="700"
                    lineHeight="28px"
                    borderRadius="0px"
                  >
                    {headerText}
                  </Button>
                </Link>
              )
            )}
          </ButtonGroup>
        </HStack>
      </Container>
    </Box>
  );
};
