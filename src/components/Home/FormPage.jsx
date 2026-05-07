import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import {
  Box,
  Flex,
  Text,
  Button,
  FormControl,
  Grid,
  GridItem,
  Textarea,
  Image,
  Input,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const inputStyles = {
  height: "54px",
  bg: "white",
  color: "#000",
  fontSize: "16px",
  focusbordercolor: "#6f42c1",
  focusborderwidth: "2px",
};

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const FormPage = () => {
  const [formData, setFormData] = React.useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const toast = useToast();

  // Define your Formspree form endpoint URL
  const formEndpoint = "mrbgzlnk"; // Replace with your actual Formspree endpoint

  // Use useForm with the Formspree endpoint
  const [state, handleSubmit] = useForm(formEndpoint);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value || "",
    });
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        position: "bottom-right",

        title: "Error",
        description: "Please fill in all required fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!formData.phone) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Submit the form using Formspree
    await handleSubmit(e);

    if (state.succeeded) {
      toast({
        title: "Success",
        description: "Your message has been sent!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Reset the form and mark it as submitted
      setFormData(initialFormData);
      setIsSubmitted(true);
    }
    if (state.errors) {
      toast({
        title: "Error",
        description: "Your message was not sent successfully!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      return;
    }
  };

  return (
    <Flex
      flexDirection={{ base: "column", md: "column", lg: "row" }}
      alignItems={"center"}
      justifyContent={"center"}
      p={{
        lg: "50px 50px 15px 50px",
        md: "40px 25px 40px 25px",
        base: "40px 25px 40px 25px",
      }}
      width={"100%"}
      gap={{ base: 16, md: 16, lg: 2 }}
      bg={"gray.100"}
    >
      <Box width={{ base: "100%", md: "100%", lg: "50%" }}>
        <Image src="./FormPic.png" alt="Your Image" />
      </Box>
      <Flex
        width={{ base: "100%", md: "100%", lg: "50%" }}
        alignItems={"flex-start"}
      >
        <Box>
          <Flex
            direction={"column"}
            p={2}
            alignItems={"left"}
            justifyContent={"center"}
          >
            <Text
              textAlign={"left"}
              color={"#000"}
              lineHeight={"1.2em"}
              mb={"10px"}
              fontSize={"32px"}
              fontWeight={"700"}
            >
              Get in touch with us{" "}
            </Text>

            <Text
              color={"#6a7c92"}
              textAlign={"left"}
              letterSpacing={"-0.2px"}
              lineHeight={"-1px"}
            >
              Your need is our collaboration. How may we help you?
            </Text>
          </Flex>
          <Box width={{ md: "100%", base: "100%" }}>
            <form method="POST" onSubmit={handleFormSubmit}>
              <FormControl>
                <Grid
                  templateColumns={{
                    base: "1fr",
                    md: "1fr 1fr",
                    lg: "1fr 2fr",
                  }}
                  gap={4}
                  p={2}
                >
                  <GridItem>
                    <Input
                      {...inputStyles}
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </GridItem>
                  <GridItem>
                    <Input
                      {...inputStyles}
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </GridItem>
                </Grid>

                <Grid
                  templateColumns={{
                    base: "1fr",
                    md: "1fr 1fr",
                    lg: "1fr 2fr",
                  }}
                  gap={4}
                  p={2}
                >
                  <GridItem className="phone-input-container">
                    <PhoneInput
                      className="custom-phone-input"
                      name="phone"
                      placeholder="Your Phone No."
                      value={formData.phone}
                      onChange={handlePhoneChange}
                    />
                  </GridItem>
                  <GridItem>
                    <Input
                      {...inputStyles}
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </GridItem>
                </Grid>
              </FormControl>

              <FormControl p={2}>
                <Textarea
                  {...inputStyles}
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  height={"250px"}
                />
              </FormControl>
              <Flex alignItems={"center"} width={"100%"} p={2}>
                <Button
                  type="submit"
                  w={{ base: "100%" }}
                  height={"50px"}
                  marginTop={"5px"}
                  border={"1px solid #a17635"}
                  color="#a17635"
                  borderRadius={"4px"}
                  textAlign={"center"}
                  alignSelf={"start"}
                  padding={"14px 39px"}
                  bg="#000"
                  _hover={{
                    color: "#000",
                    bg: "gray.400",
                    borderColor: "#a17635",
                  }}
                >
                  {isSubmitted ? "Send Message" : "Send Message"}
                </Button>
              </Flex>
            </form>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default FormPage;
