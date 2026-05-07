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

export const MobileDrawer = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  // Create a similar menu structure as the desktop navbar
  const mobileMenuLinks = {
    Home: { link: "/home" },
    Company: {
      link: "/about",
    },
    "Tech Services": {
      link: "/information-services",
    },
    Consulting: {
      link: "/services",
    },
    Portfolio: {
      link: "/home",
      items: [
        "Cooperative Management",
        "Pension & Gratuity Management",
        "Business Impact Analysis",
        "Risk Management",
        "Portfolio Management",
        "Human Resources/Payroll",
        "Association Membership Management",
        "Product Distribution Visibility",
      ],
    },
    Blog: { link: "/blog" },
  };

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
              {Object.keys(mobileMenuLinks).map((headerText, index) => (
                <div key={headerText}>
                  {index > 0 && <hr style={{ border: "1px solid #000" }} />}

                  {mobileMenuLinks[headerText].items ? (
                    <DocumentCollapse
                      key={headerText}
                      headerText={headerText}
                      documentItems={mobileMenuLinks[headerText].items}
                      link={mobileMenuLinks[headerText].link}
                    />
                  ) : (
                    <Link to={mobileMenuLinks[headerText].link}>
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
