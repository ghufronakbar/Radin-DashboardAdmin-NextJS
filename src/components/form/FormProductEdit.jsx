import {
  Box,
  Button,
  Center,
  FormControl,
  Image,
  Input,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
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
  Spinner,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../Loading";
import { baseURL } from "@/lib/baseUrl";

export function FormProductEdit() {
  const router = useRouter();
  const { id: id_product } = router.query;
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const pictureRef = useRef();
  const productNameRef = useRef();
  const [type, setType] = useState();
  const informationRef = useRef();
  const priceRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);

  // Fungsi untuk menangani perubahan pada input file gambar
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Mengambil file gambar yang dipilih
    setSelectedImage(URL.createObjectURL(file)); // Membuat URL dari file gambar dan menyimpannya dalam state
  };

  const { data: dataProduct, refetch: refetchDataMenu } = useQuery({
    queryKey: ["product", id_product],
    queryFn: async () => {
      const dataResponse = await axiosInstance.get(`/product/${id_product}`);
      setLoading(false);
      return dataResponse;
    },
  });

  useEffect(() => {
    if (dataProduct && dataProduct.data.values.length > 0) {
      setType(dataProduct.data.values[0].type);
    }
  }, [dataProduct]);

  const handleUpdate = async (id_product) => {
    try {
      if (
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
          product_name: productNameRef.current.value,
          type: type,
          information: informationRef.current.value,
          price: priceRef.current.value,
        };

        if (pictureRef.current.files.length > 0) {
          formData.picture = pictureRef.current.files[0];
        }

        await axiosInstance.put(`/product/edit/${id_product}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast({
          title: "Product has been updated",
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

  if (loading) return <Loading />;

  return (
    <>
      <form>
        {dataProduct?.data.values.map((item) => (
          <Box
            p={8}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            mt={4}
          >
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
                      src={selectedImage}
                    />
                  ) : (
                    <Image
                      borderRadius="18"
                      boxSize="400"
                      objectFit="cover"
                      src={`${baseURL}/images/product/${item.picture}`}
                      alt={item.picture}
                    />
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
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" fontSize="1.2em">
                        🧺
                      </InputLeftElement>
                      <Input
                        name="product_name"
                        ref={productNameRef}
                        defaultValue={item.product_name}
                      />
                    </InputGroup>
                  </FormControl>

                  <RadioGroup
                    mt={4}
                    value={type}
                    onChange={(newValue) => {
                      setType(parseInt(newValue)); // Mengonversi nilai newValue menjadi bilangan bulat
                    }}
                  >
                    <FormLabel>Type</FormLabel>
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
                    <NumberInput defaultValue={item.price} min={0}>
                      <NumberInputField ref={priceRef} />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  <FormLabel mt={4}>Information</FormLabel>
                  <Textarea
                    name="information"
                    ref={informationRef}
                    defaultValue={item.information}
                  ></Textarea>
                </Stack>
              </Box>
            </Flex>
            <VStack mt={4}>
              <Button
                onClick={() => {
                  handleUpdate(id_product);
                }}
              >
                Update
              </Button>
            </VStack>
          </Box>
        ))}
      </form>
    </>
  );
}
