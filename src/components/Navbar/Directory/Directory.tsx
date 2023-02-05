import React from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from '@chakra-ui/react';
import useDirectory from '../../../hooks/useDirectory';
import Communities from './Communities';

const Directory: React.FC = () => {
  const {
    directoryState: { isOpen, selectedMenuItem },
    toggleMenuOpen,
  } = useDirectory();

  return (
    <Menu isOpen={isOpen} onOpen={toggleMenuOpen} onClose={toggleMenuOpen}>
      <MenuButton
        cursor="pointer"
        px="6px"
        py="8px"
        borderRadius={4}
        mr={4}
        _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}
      >
        <Flex
          align="center"
          justify="space-between"
          width={{ base: 'auto', lg: '200px' }}
        >
          {selectedMenuItem.imageURL ? (
            <Image borderRadius="full" boxSize="24px" mr={{ base: 0, md: 1 }} src={selectedMenuItem.imageURL} alt="Community image" />
          ) : (
            <Icon
              fontSize={24}
              mr={{ base: 0, md: 1 }}
              as={selectedMenuItem.icon}
              color={selectedMenuItem.iconColor}
            />
          )}
          <Text
            fontWeight={600}
            fontSize={14}
            ml={{ base: 1 }}
            mr="auto"
            display={{ base: 'none', lg: 'inline-block' }}
            maxW="80%"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {selectedMenuItem.displayText}
          </Text>
          <ChevronDownIcon ml={{ base: 1 }} />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  );
};
export default Directory;
