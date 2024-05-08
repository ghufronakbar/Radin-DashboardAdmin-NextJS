import { HeadAdmin } from "@/components/HeadAdmin";
import { NavbarAdmin } from "@/components/NavbarAdmin";
import { FormProductAdd } from "@/components/form/FormProductAdd";
import { Container } from "@chakra-ui/react";

export default function ProductAdd() {
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
