import React from 'react';
import { Community } from "../../atoms/communitiesAtom";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";

type HeaderProps = {
  communityData: Community
};

const Header:React.FC<HeaderProps> = ({ communityData}) => {
  const isJoined = false;

  return (
    <Flex
      direction="column"
      width="100%"
      height="146px"
    >
      <Box h="50%" bg="blue.400"></Box>
      <Flex
        justify="center"
        bg={"white"}
        flexGrow={1}
      >
        <Flex w={"95%"} maxW={860}>
          {communityData.imageURL ? (
            <Image src={communityData.imageURL} />
          ) : (
            <Icon as={FaReddit} fontSize={66} pos="relative" top={-3} border={"4px solid white"} borderRadius={"100%"} color={"blue.500"}/>
          )}
          <Flex p={"10px 16px"}>
            <Flex direction={"column"} mr={6}>
              <Text fontWeight={800} fontSize="16pt">
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize="10pt" color={"gray.400"}>
                r/{communityData.id}
              </Text>
            </Flex>
            <Button variant={isJoined ? "outline" : "solid"} h={"30px"} px={6} onClick={() => {}}>
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
export default Header;