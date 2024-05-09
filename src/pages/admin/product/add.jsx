import { HeadAdmin } from "@/components/HeadAdmin";
import { SidebarMenu } from "@/components/SidebarMenu";
import { FormProductAdd } from "@/components/form/FormProductAdd";
import { withAuth } from "@/lib/authorization";
import { Container, Flex } from "@chakra-ui/react";

function ProductAdd() {
  return (
    <>
      <HeadAdmin />
      <main>
      <Flex>
                <SidebarMenu flex={1} /> <Container maxW="80%">
          <FormProductAdd />
        </Container>   </Flex>
       
      </main>
    </>
  );
}

export default withAuth(ProductAdd)