
import { HeadAdmin } from "@/components/HeadAdmin";
import { NavbarAdmin } from "@/components/NavbarAdmin";
import { TableProduct } from "@/components/table/TableProduct";
import { withAuth } from "@/lib/authorization";
import {
    Container,
    Heading,
} from "@chakra-ui/react";


function Product() {
    return (
        <>
            <HeadAdmin />
            <main>
                <NavbarAdmin />
                <Container maxW="80%">
                    <Heading marginBottom="8" marginTop="8">
                        Data Products
                    </Heading>
                    <TableProduct/>
                </Container>
            </main>
        </>
    );
}

export default withAuth(Product)
