import React  from "react";
import { Button } from "@chakra-ui/react";

type AuthButtonsProps = {};

const AuthButtons: React.FC<AuthButtonsProps> = () => {
  return (
    <>
      <Button
        variant="outline"
        h={8}
        display={{base: "none", sm: "flex"}}
        width={{base: "70px", md: "110px"}}
      >
        Log in
      </Button>
      <Button
        variant="solid"
        bg="brand.100"
        _hover={{bg: "brand.200"}}
        h={8}
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
      >
        Sign up
      </Button>
    </>
  )
}

export default AuthButtons;