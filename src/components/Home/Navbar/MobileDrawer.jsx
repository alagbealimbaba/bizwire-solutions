import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  Stack,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import DocumentCollapse from "./DocumentCollapse";
import { ToggleButton } from "./ToggleButton";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { menuLinks } from "../../../constants/navigationMenu";

export const MobileDrawer = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <>
      <ToggleButton
        onClick={onToggle}
        aria-label="Open menu"
        color="black"
        display={{
          base: "inline-flex",
          lg: "none",
        }}
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
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
