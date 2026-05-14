import React from "react";
import {
  Box,
  ButtonGroup,
  Container,
  HStack,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MobileDrawer } from "./MobileDrawer";
import DocumentPopover from "./DocumentPopover";
import { menuLinks } from "../../../constants/navigationMenu";
import { useAuth } from "../../../context/AuthContext";
import { logoutUser } from "../../../utils/userAuth";
import AuthModal from "../../Auth/AuthModal";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";

export const Navbar = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
              <MobileDrawer onOpenAuth={onOpen} />
            </HStack>
            <ButtonGroup
              variant="text.accent"
              colorScheme="gray"
              color={"black"}
              display={{ base: "none", lg: "flex" }}
              alignItems="center"
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

              {/* Auth control */}
              {user ? (
                <Menu placement="bottom-end">
                  <MenuButton
                    as={Button}
                    ml={2}
                    borderRadius="0"
                    bg="#000"
                    color="#a17635"
                    _hover={{ bg: "#a17635", color: "#000" }}
                    _active={{ bg: "#a17635", color: "#000" }}
                    px={3}
                    size="sm"
                  >
                    <Flex alignItems="center" gap={2}>
                      <Flex
                        w="22px"
                        h="22px"
                        bg="#a17635"
                        color="#000"
                        alignItems="center"
                        justifyContent="center"
                        fontWeight="700"
                        fontSize="xs"
                        flexShrink={0}
                      >
                        {user.displayName?.[0]?.toUpperCase() || "U"}
                      </Flex>
                      <FiChevronDown size={14} />
                    </Flex>
                  </MenuButton>
                  <MenuList borderRadius="0" border="2px solid" borderColor="#000" p={0} minW="180px" boxShadow="4px 4px 0px #000">
                    <Box px={4} py={3} borderBottom="1px solid" borderColor="gray.200">
                      <Text fontSize="xs" color="#6a7c92" fontStyle="italic">Signed in as</Text>
                      <Text fontSize="sm" fontWeight="700" color="#000" noOfLines={1}>{user.displayName || "User"}</Text>
                      <Text fontSize="xs" color="#6a7c92" noOfLines={1}>{user.email}</Text>
                    </Box>
                    <MenuItem
                      icon={<FiUser size={14} />}
                      fontSize="sm"
                      fontWeight="600"
                      color="#000"
                      borderRadius="0"
                      _hover={{ bg: "gray.100" }}
                      isDisabled
                    >
                      My Account
                    </MenuItem>
                    <MenuDivider m={0} />
                    <MenuItem
                      icon={<FiLogOut size={14} />}
                      fontSize="sm"
                      fontWeight="600"
                      color="red.500"
                      borderRadius="0"
                      _hover={{ bg: "red.50" }}
                      onClick={logoutUser}
                    >
                      Sign Out
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Button
                  ml={2}
                  size="sm"
                  borderRadius="0"
                  bg="#000"
                  color="#a17635"
                  fontWeight="700"
                  _hover={{ bg: "#a17635", color: "#000" }}
                  onClick={onOpen}
                >
                  Sign In
                </Button>
              )}
            </ButtonGroup>
          </HStack>
        </Container>
      </Box>

      <AuthModal isOpen={isOpen} onClose={onClose} onSuccess={onClose} />
    </>
  );
};
