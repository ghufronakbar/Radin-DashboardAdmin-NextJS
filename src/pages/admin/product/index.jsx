
import { HeadAdmin } from "@/components/HeadAdmin";
import { NavbarAdmin } from "@/components/NavbarAdmin";
import { SidebarMenu } from "@/components/SidebarMenu";
import { TableProduct } from "@/components/table/TableProduct";
import { withAuth } from "@/lib/authorization";
import {
    Container,
    Flex,
    Heading,
} from "@chakra-ui/react";


function Product() {
    return (
        <>
            <HeadAdmin />
            <main>
                <Flex>
                <SidebarMenu flex={1} />
                    <Container maxW="80%">
                    <Heading marginBottom="8" marginTop="8">
                        Data Products
                    </Heading>
                    <TableProduct/>
                </Container>
                </Flex>
                
            </main>
        </>
    );
}

export default withAuth(Product)
