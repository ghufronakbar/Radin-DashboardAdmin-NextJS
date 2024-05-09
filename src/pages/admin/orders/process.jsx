
import { HeadAdmin } from "@/components/HeadAdmin";
import { NavbarAdmin } from "@/components/NavbarAdmin";
import { TableOrders } from "@/components/table/TableOrders";
import { withAuth } from "@/lib/authorization";

import {
    Container,
    Heading,
} from "@chakra-ui/react";


function Process() {
    return (
        <>
            <HeadAdmin />
            <main>
                <NavbarAdmin />
                <Container maxW="80%">
                    <Heading marginBottom="8" marginTop="8">
                        Data Orders
                    </Heading>
                   {TableOrders(4)}
                </Container>
            </main>
        </>
    );
}

export default withAuth(Process)
