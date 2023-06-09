import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const MerchantRegister = () => {
  const navigate = useNavigate();

  const onRegister = async () => {
    try {
      const token = localStorage.getItem("token");

      const data = {
        name: document.getElementById("name").value,
        address: document.getElementById("address").value,
      };

      //untuk menghandle request bearer header
      const config = {
        headers: {Authorization: `Bearer ${token}`},
      };

      const url = "http://localhost:2000/merchant/register";
      const result = await axios.post(url, data, config);

      //untuk mereset kembali form

      document.getElementById("name").value = "";
      document.getElementById("address").value = "";

      //memberikan alert
      alert(result.data.message);
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} w={700}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Register Merchant
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Merchant Name</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="address" isRequired>
              <FormLabel>Address</FormLabel>
              <Input type="text" />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={onRegister}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                <Link color={"blue.400"} onClick={() => navigate("/")}>
                  Back to home
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
