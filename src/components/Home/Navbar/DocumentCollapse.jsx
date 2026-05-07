import { Button, Collapse, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { PopoverIcon } from "./PopoverIcon";
import { Link } from "react-router-dom";
const DocumentCollapse = ({ headerText, documentItems, link }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Button
        justifyContent="space-between"
        variant="tertiary"
        size="lg"
        onClick={onToggle}
      >
        <Text as="span">{headerText}</Text>
        <PopoverIcon isOpen={isOpen} />
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Stack spacing="1" alignItems="stretch" ps="4">
          {Array.isArray(documentItems) &&
            documentItems.map((item) => (
              <Link to={link + "/" + item.toLowerCase()} key={item}>
                <Button
                  key={item}
                  variant="tertiary"
                  size="lg"
                  justifyContent="start"
                >
                  {item}
                </Button>
              </Link>
            ))}
        </Stack>
      </Collapse>
    </>
  );
};

export default DocumentCollapse;
