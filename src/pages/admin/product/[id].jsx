import { HeadAdmin } from "@/components/HeadAdmin";
import { SidebarMenu } from "@/components/SidebarMenu";
import { FormProductEdit } from "@/components/form/FormProductEdit";
import { withAuth } from "@/lib/authorization";
import { Container, Flex } from "@chakra-ui/react";

function ProductID() {
  return (
    <>
      <HeadAdmin />
      <main>
        <Flex>
          <SidebarMenu flex={1} />{" "}
          <Container maxW="80%">
            <FormProductEdit />
          </Container>{" "}
        </Flex>
      </main>
    </>
  );
}

export default withAuth(ProductID);
