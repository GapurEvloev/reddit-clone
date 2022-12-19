import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "./SearchInput";

const Navbar: React.FC = () => {
  return (
    <Flex bg="white" minH="44px" p="6px 12px" justifyContent={{md: "space-between"}}>
      <Flex
        align="center"
        width={{base: "40px", md: "auto"}}
        mr={{base: 0, md: 2}}
        cursor="pointer"
      >
        <Image src="/images/redditFace.svg" h="30px"/>
        <Image
          display={{base: "none", md: "unset"}}
          src="/images/redditText.svg"
          w="69px"
        />
      </Flex>
      {/*<Directory />*/}
      <SearchInput/>
      {/*<RightContent />*/}
    </Flex>
  )
}
export default Navbar;