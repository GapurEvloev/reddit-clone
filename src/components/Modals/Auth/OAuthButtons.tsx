import React from "react";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, _, loading, error] = useSignInWithGoogle(auth);
  console.log(error)
  return (
    <Flex direction="column" w="100%" mb={4} gap={2}>
      <Button
        variant="oauth"
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image src="./images/googlelogo.png" maxH="20px" mr={2}/>
        Continue with Google
      </Button>
      <Button variant="oauth">Some other Provider</Button>
      {error && (
        <Text textAlign="center" fontSize="10pt" color="red" mt={2}>
          {error.message}
        </Text>
      )}
    </Flex>
  )
}
export default OAuthButtons;