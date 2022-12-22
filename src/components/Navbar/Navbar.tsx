import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import Directory from "./Directory/Directory";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Flex bg="white" minH="48px" p="6px 12px" justifyContent={{md: "space-between"}} align="center">
      <Flex
        align="center"
        width={{base: "32px", md: "auto"}}
        mr={{base: 3, md: 5}}
        cursor="pointer"
        gap={2}
      >
        <Image src="/images/redditFace.svg" h="32px"/>
        <Image
          display={{base: "none", md: "unset"}}
          src="/images/redditText.svg"
          h="18px"
        />
      </Flex>
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  )
}
export default Navbar;