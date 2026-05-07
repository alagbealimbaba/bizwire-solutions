import React from "react";
import PropTypes from "prop-types";
import { Button, Popover, PopoverContent, PopoverTrigger, Stack, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PopoverIcon } from "./PopoverIcon";

const DocumentPopover = ({ headerText, documentItems, subLinks }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      trigger="hover"
      openDelay={20}
    >
      <PopoverTrigger>
        <Button
          color={"black"}
          fontWeight="700"
          lineHeight="28px"
          borderRadius={"0px"}
          rightIcon={<PopoverIcon isOpen={isOpen} />}
          style={{ marginRight: "-20px" }}
        >
          {headerText}
        </Button>
      </PopoverTrigger>
      <PopoverContent borderRadius="0px" maxW={"300px"}>
        <Stack spacing="0">
          {documentItems.map((item) => (
            <Link to={subLinks[item]} key={item}>
              <Button
                variant="tertiary"
                justifyContent="start"
                width={"100%"}
                borderRadius={"0px"}
                _hover={{ backgroundColor: "gray.400", color: "white" }}
                fontSize={"13px"}
                padding={"22px 20px 22px 30px"}
              >
                {item}
              </Button>
            </Link>
          ))}
        </Stack>
      </PopoverContent>
    </Popover>
  );
};

DocumentPopover.propTypes = {
  headerText: PropTypes.string.isRequired,
  documentItems: PropTypes.array.isRequired,
  subLinks: PropTypes.object.isRequired,
};

export default DocumentPopover;
