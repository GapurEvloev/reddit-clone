import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";

const Navbar: React.FC = () => {
  return (
    <Flex bg="white" minH="48px" p="6px 12px" justifyContent={{md: "space-between"}}>
      <Flex
        align="center"
        width={{base: "40px", md: "auto"}}
        mr={{base: 0, md: 5}}
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
      {/*<Directory />*/}
      <SearchInput/>
      <RightContent />
    </Flex>
  )
}
export default Navbar;