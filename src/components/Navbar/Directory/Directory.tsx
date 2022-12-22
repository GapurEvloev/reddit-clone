import React from 'react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { TiHome } from "react-icons/ti";


const Directory:React.FC = () => {

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        px="6px"
        py="8px"
        borderRadius={4}
        mr={4}
        _hover={{outline: "1px solid", outlineColor: "gray.200"}}
      >
        <Flex align="center" justify="space-between" width={{base: "auto", lg: "200px"}}>
          <Icon fontSize={24} as={TiHome} />
          <Text fontWeight={600} fontSize={14} ml={{base: 1}} mr="auto" display={{base: "none", lg: "flex"}}>Home</Text>
          <ChevronDownIcon ml={{base: 1}} />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem>
          {/*<Communities />*/}
          Communities
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
export default Directory;