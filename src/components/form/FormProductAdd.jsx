import {
  Box,
  Button,
  Center,
  FormControl,
  Image,
  Input,
  Spacer,
  Textarea,
  useToast,
  Flex,
  FormLabel,
  Stack,
  InputGroup,
  InputLeftElement,
  RadioGroup,
  Radio,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

export function FormProductAdd() {
  const router = useRouter();
  const pictureRef = useRef();
  const productNameRef = useRef();
  const [type, setType] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const informationRef = useRef();
  const priceRef = useRef();
  const toast = useToast();

  // Fungsi untuk menangani perubahan pada input file gambar
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Mengambil file gambar yang dipilih
    setSelectedImage(URL.createObjectURL(file)); // Membuat URL dari file gambar dan menyimpannya dalam state
  };

  const handleAdd = async () => {
    try {
      if (
        !pictureRef.current.files[0] ||
        !productNameRef.current.value ||
        !type ||
        !informationRef.current.value ||
        !priceRef.current.value
      ) {
        toast({
          title: "Complete form to insert product",
          status: "warning",
          position: "bottom-right",
          isClosable: true,
        });
      } else {
        const formData = {
          picture: pictureRef.current.files[0],
          product_name: productNameRef.current.value,
          type: type,
          information: informationRef.current.value,
          price: priceRef.current.value,
        };

        await axiosInstance.post(`/product/add`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast({
          title: "Product has been inserted",
          status: "success",
          position: "bottom-right",
          isClosable: true,
        });
        router.push(`/admin/product`);
      }
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  return (
    <>
      <form>
        <Box p={8} borderWidth="1px" borderRadius="lg" overflow="hidden" mt={4}>
          <Flex>
            <Box
              p={8}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              mt={4}
              flex={9}
            >
              <Center>
                {selectedImage ? (
                  <Image
                    borderRadius="18"
                    boxSize="400"
                    objectFit="cover"
                    src={selectedImage || ""}
                  />
                ) : (
                  <>
                    <Box
                      p={8}
                      borderWidth="1px"
                      borderRadius="18"
                      boxSize="400"
                      overflow="hidden"
                      mt={4}
                      flex={9}
                      position="relative" // Menggunakan position: relative untuk Box
                    >
                      <VStack
                        position="absolute" // Menggunakan position: absolute untuk VStack
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)" // Untuk memposisikan VStack di tengah Box
                        zIndex="9999"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <InfoOutlineIcon />
                        <Text>Picture not yet selected</Text>
                      </VStack>
                    </Box>
                  </>
                )}
              </Center>
              <Input
                mt={4}
                type="file"
                name="picture"
                ref={pictureRef}
                onChange={handleImageChange}
              />
            </Box>
            <Spacer flex={1} />
            <Box
              p={8}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              mt={4}
              flex={18}
            >
              <Stack>
                <FormLabel>Product Name</FormLabel>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" fontSize="1.2em">
                      🧺
                    </InputLeftElement>
                    <Input name="product_name" ref={productNameRef} />
                  </InputGroup>
                </FormControl>

                <RadioGroup
                  mt={4}
                  value={type}
                  onChange={(newValue) => {
                    setType(parseInt(newValue)); // Mengonversi nilai newValue menjadi bilangan bulat                    
                  }}
                >
                  <FormLabel>Variant</FormLabel>
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="orange" value={1}>
                      🍚 Sembako
                    </Radio>
                    <Radio colorScheme="blue" value={2}>
                      🥩 Daging
                    </Radio>
                    <Radio colorScheme="green" value={3}>
                      🍎 Buah
                    </Radio>
                  </Stack>
                </RadioGroup>
                <FormControl mt={4}>
                  <FormLabel>Price</FormLabel>
                  <NumberInput min={0}>
                    <NumberInputField ref={priceRef} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormLabel mt={4}>Information</FormLabel>
                <Textarea name="information" ref={informationRef}></Textarea>
              </Stack>
            </Box>
          </Flex>
          <VStack mt={4}>
            <Button
              onClick={() => {
                handleAdd();
              }}
            >
              Submit
            </Button>
          </VStack>
        </Box>
      </form>
    </>
  );
}
