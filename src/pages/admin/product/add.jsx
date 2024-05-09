import { HeadAdmin } from "@/components/HeadAdmin";
import { NavbarAdmin } from "@/components/NavbarAdmin";
import { FormProductAdd } from "@/components/form/FormProductAdd";
import { withAuth } from "@/lib/authorization";
import { Container } from "@chakra-ui/react";

function ProductAdd() {
  return (
    <>
      <HeadAdmin />
      <main>
        <NavbarAdmin />
        <Container maxW="80%">
          <FormProductAdd />
        </Container>
      </main>
    </>
  );
}

export default withAuth(ProductAdd)