import React  from "react";
import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

type AuthButtonsProps = {};

const AuthButtons: React.FC<AuthButtonsProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <>
      <Button
        variant="outline"
        h={8}
        display={{base: "none", sm: "flex"}}
        width={{base: "70px", md: "110px"}}
        onClick={() => setAuthModalState({open: true, view: "login"})}
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
        onClick={() => setAuthModalState({open: true, view: "signup"})}
      >
        Sign up
      </Button>
    </>
  )
}

export default AuthButtons;