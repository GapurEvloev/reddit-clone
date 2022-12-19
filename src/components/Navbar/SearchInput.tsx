import React from "react";
import { Flex, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

type SearchInputProps = {
  // user:
};

const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <Flex
      flexGrow={1}
      maxWidth={"600px"}
      m="0 auto"
      alignItems="center"
    >
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.400"
          h="40px"
          // children={<SearchIcon mb={2} />}
        >
          <SearchIcon w={5} h={5}/>
        </InputLeftElement>
        <Input
          placeholder="Search Reddit"
          fontSize="10pt"
          _placeholder={{color: "gray.500"}}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          h="40px"
          bg="gray.50"
          mr={5}
          rounded={20}
        />
      </InputGroup>
    </Flex>
  )
}
export default SearchInput;