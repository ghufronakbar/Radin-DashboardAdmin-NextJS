import { HeadAdmin } from "@/components/HeadAdmin";
import { NavbarAdmin } from "@/components/NavbarAdmin";
import { FormProductEdit } from "@/components/form/FormProductEdit";
import { Container } from "@chakra-ui/react";

export default function ProductID() {
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
