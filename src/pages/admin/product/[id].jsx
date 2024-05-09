import { HeadAdmin } from "@/components/HeadAdmin";
import { NavbarAdmin } from "@/components/NavbarAdmin";
import { FormProductEdit } from "@/components/form/FormProductEdit";
import { withAuth } from "@/lib/authorization";
import { Container } from "@chakra-ui/react";

function ProductID() {
  return (
    <>
      <HeadAdmin />
      <main>
        <NavbarAdmin />
        <Container maxW="80%">
          <FormProductEdit />
        </Container>
      </main>
    </>
  );
}

export default withAuth(ProductID)