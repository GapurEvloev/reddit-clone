import React from 'react';
import { Button, Flex, Image } from "@chakra-ui/react";

const OAuthButtons:React.FC = () => {

  return (
    <Flex direction="column" w="100%" mb={4} gap={2}>
      <Button variant="oauth">
        <Image src="./images/googlelogo.png" maxH="20px" mr={2}/>
        Continue with Google
      </Button>
      <Button variant="oauth">Some other Provider</Button>
    </Flex>
  )
}
export default OAuthButtons;