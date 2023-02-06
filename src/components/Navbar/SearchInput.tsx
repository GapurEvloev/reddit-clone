import React from 'react';
import { Flex, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { User } from '@firebase/auth';

type SearchInputProps = {
  user?: User | null;
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  return (
    <Flex
      flexGrow={1}
      maxWidth={user ? 'auto' : '600px'}
      m="0 auto"
      alignItems="center"
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.400" h="40px">
          <SearchIcon w={5} h={5} />
        </InputLeftElement>
        <Input
          placeholder="Search Reddit"
          fontSize="10pt"
          _placeholder={{ color: 'gray.500' }}
          _hover={{
            bg: 'white',
            border: '1px solid',
            borderColor: 'blue.500',
          }}
          _focus={{
            outline: 'none',
            border: '1px solid',
            borderColor: 'blue.500',
          }}
          h="40px"
          bg="gray.50"
          mr={{ base: 2, md: 5 }}
          rounded={20}
        />
      </InputGroup>
    </Flex>
  );
};
export default SearchInput;
