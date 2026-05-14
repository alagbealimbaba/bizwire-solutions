import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  Stack,
  useDisclosure,
  IconButton,
  Flex,
  Text,
  Box,
  Divider,
} from "@chakra-ui/react";
import DocumentCollapse from "./DocumentCollapse";
import { ToggleButton } from "./ToggleButton";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { menuLinks } from "../../../constants/navigationMenu";
import { useAuth } from "../../../context/AuthContext";
import { logoutUser } from "../../../utils/userAuth";

export const MobileDrawer = ({ onOpenAuth }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { user } = useAuth();

  const handleSignOut = () => {
    logoutUser();
    onClose();
  };

  const handleSignIn = () => {
    onClose();
    onOpenAuth();
  };

  return (
    <>
      <ToggleButton
        onClick={onToggle}
        aria-label="Open menu"
        color="black"
        display={{ base: "inline-flex", lg: "none" }}
      />
      <Drawer size={"full"} placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerContent bg="gray.400">
          <DrawerBody
            style={{ maxHeight: "100vh", overflowY: "1000px" }}
            mt="70px"
            p="4"
          >
            <IconButton
              icon={<MdClose />}
              aria-label="Close menu"
              position="absolute"
              top="10px"
              right="10px"
              bg="transparent"
              color="black"
              onClick={onClose}
            />
            <Stack color={"black"} spacing="1">
              {Object.keys(menuLinks).map((headerText, index) => (
                <div key={headerText}>
                  {index > 0 && <hr style={{ border: "1px solid #000" }} />}
                  {menuLinks[headerText].items ? (
                    <DocumentCollapse
                      key={headerText}
                      headerText={headerText}
                      documentItems={menuLinks[headerText].items}
                      link={menuLinks[headerText].link}
                    />
                  ) : (
                    <Link to={menuLinks[headerText].link}>
                      <Button
                        size={"lg"}
                        color={"black"}
                        variant="tertiary"
                        justifyContent="start"
                      >
                        {headerText}
                      </Button>
                    </Link>
                  )}
                </div>
              ))}

              {/* Auth section */}
              <Box pt={2}>
                <Divider borderColor="#000" mb={3} />
                {user ? (
                  <Flex flexDirection="column" gap={3}>
                    <Flex alignItems="center" gap={2}>
                      <Flex
                        w="32px"
                        h="32px"
                        bg="#000"
                        color="#a17635"
                        alignItems="center"
                        justifyContent="center"
                        fontWeight="700"
                        fontSize="sm"
                        flexShrink={0}
                      >
                        {user.displayName?.[0]?.toUpperCase() || "U"}
                      </Flex>
                      <Box>
                        <Text fontSize="sm" fontWeight="700" color="#000" noOfLines={1}>
                          {user.displayName || "Account"}
                        </Text>
                        <Text fontSize="xs" color="gray.600" noOfLines={1}>
                          {user.email}
                        </Text>
                      </Box>
                    </Flex>
                    <Button
                      size="sm"
                      borderRadius="0"
                      variant="outline"
                      borderColor="#000"
                      color="#000"
                      fontWeight="600"
                      _hover={{ bg: "#000", color: "#a17635" }}
                      onClick={handleSignOut}
                      w="full"
                    >
                      Sign Out
                    </Button>
                  </Flex>
                ) : (
                  <Button
                    size="md"
                    borderRadius="0"
                    bg="#000"
                    color="#a17635"
                    fontWeight="700"
                    _hover={{ bg: "#a17635", color: "#000" }}
                    onClick={handleSignIn}
                    w="full"
                  >
                    Sign In / Create Account
                  </Button>
                )}
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
