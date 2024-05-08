import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Loading } from "../Loading";
import { useState } from "react";
import { baseURL } from "@/lib/baseUrl";
import { EditIcon } from "@chakra-ui/icons";

export function TableProduct() {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [modalStockIsOpen, setModalStockIsOpen] = useState(false);
  const [idProduct, setIdProduct] = useState();
  const [stockValue, setStockValue] = useState("");
  const [nameProductValue, setNameProductValue] = useState("");

  let i = 1;
  const { data: dataProduct, refetch: refetchDataProduct } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const dataResponse = await axiosInstance.get("/products");
      setLoading(false);
      return dataResponse;
    },
  });

  const handleDelete = async (id_product) => {
    try {
      await axiosInstance.delete(`/product/product/${id_product}`);
      toast({
        title: "Menu has been deleted",
        status: "warning",
        position: "bottom-right",
        isClosable: true,
      });
      refetchDataProduct();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handleSetStock = async (id_product) => {
    try {
      await axiosInstance.put(`/product/setstock/${id_product}`, {
        stock: stockValue,
      });
      toast({
        title: `Stock ${nameProductValue} has been set to ${stockValue}`,
        status: "info",
        position: "bottom-right",
        isClosable: true,
      });
      refetchDataProduct();
      setModalStockIsOpen(false);
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handleDetail = (id) => {
    router.push(`/admin/product/${id}`);
  };

  const goToAdd = () => {
    router.push(`/admin/product/add`);
  };

  if (loading) return <Loading />;

  return (
    <>
      <Button
        borderRadius="md"
        colorScheme="green"
        px={4}
        my={4}
        variant="outline"
        onClick={() => {
          goToAdd();
        }}
      >
        🧺 Add Product
      </Button>
      <Box p={8} borderWidth="1px" borderRadius="lg" overflow="hidden">
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th></Th>
                <Th>Product Name</Th>
                <Th>
                  <Center>Type</Center>
                </Th>
                <Th>
                  <Center>Stock</Center>
                </Th>
                <Th>Price</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataProduct?.data.values.map((item) => (
                <Tr key={item.id_product}>
                  <Td>{i++}</Td>
                  <Td>
                    <Image
                      borderRadius="18"
                      boxSize="60px"
                      objectFit="cover"
                      src={`${baseURL}/images/product/${item.picture}`}
                      alt={item.picture}
                    />
                  </Td>
                  <Td>
                    <Text as="b">{item.product_name}</Text>
                  </Td>
                  <Td>
                    <Center>
                      {item.type == 1 && (
                        <Button
                          borderRadius="md"
                          colorScheme="orange"
                          variant="outline"
                          px={2}
                          h={8}
                        >
                          🍚 Sembako
                        </Button>
                      )}
                      {item.type == 2 && (
                        <Button
                          borderRadius="md"
                          colorScheme="orange"
                          variant="outline"
                          px={4}
                          h={8}
                        >
                          🥩 Daging
                        </Button>
                      )}
                      {item.type == 3 && (
                        <Button
                          borderRadius="md"
                          colorScheme="orange"
                          variant="outline"
                          px={6}
                          h={8}
                        >
                          🍎 Buah
                        </Button>
                      )}
                    </Center>
                  </Td>
                  <Td isNumeric>
                    {item.stock}{" "}
                    <EditIcon
                      onClick={() => {
                        setModalStockIsOpen(true);
                        setIdProduct(item.id_product);
                        setStockValue(item.stock);
                        setNameProductValue(item.product_name)
                      }}
                    />
                  </Td>
                  <Td>Rp {item.price},00</Td>{" "}
                  <Td>
                    {" "}
                    <Center>
                      <Button
                        variant="outline"
                        colorScheme="grey"
                        onClick={() => handleDetail(item.id_product)}
                      >
                        <Text as="b">Detail</Text>
                      </Button>
                    </Center>
                    <Center marginTop={1}>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDelete(item.id_product)}
                      >
                        Delete
                      </Button>
                    </Center>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Modal
        isOpen={modalStockIsOpen}
        onClose={() => setModalStockIsOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Stock</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Set Stock</FormLabel>

              <NumberInput min={0}value={stockValue}>
                <NumberInputField
                  
                  onChange={(e) => setStockValue(e.target.value)}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper onClick={()=>{setStockValue(stockValue+1)}} />
                  <NumberDecrementStepper  onClick={()=>{setStockValue(stockValue-1)}} />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setModalStockIsOpen(false)} mr={3}>
              Cancel
            </Button>{" "}
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => {
                handleSetStock(idProduct);
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
