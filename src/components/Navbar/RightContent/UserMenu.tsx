import React from 'react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Icon, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { signOut, User } from "@firebase/auth";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout, MdOutlineLogin } from "react-icons/md";
import { auth } from "../../../firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { IoSparkles } from "react-icons/io5";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu:React.FC<UserMenuProps> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        px="6px"
        py="8px"
        borderRadius={4}
        _hover={{outline: "1px solid", outlineColor: "gray.200"}}
      >
        <Flex align="center">
          {user ? (
            <>
              <Icon fontSize={24} mr={1} color="gray.300" marginRight={0} as={FaRedditSquare}/>
              <Flex
                direction="column"
                display={{base: "none", lg: "flex"}}
                fontSize={9}
                align="flex-start"
                mx={1}
              >
                <Text fontWeight={700}>
                  {user?.displayName || user.email?.split("@")[0]}
                </Text>
                <Flex>
                  <Icon as={IoSparkles} color="brand.100" mr={1}/>
                  <Text color="gray.400">1 karma</Text>
                </Flex>
              </Flex>
            </>
          ) : (
            <Icon fontSize={24} color="gray.400" as={VscAccount} />
          )}
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        { user ? <>
          <MenuItem
            fontSize="14"
            fontWeight={700}
            _hover={{bg: "gray.100"}}
          >
            <Flex align="center" gap={2}>
              <Icon fontSize={20} as={CgProfile} />
              <span>Profile</span>
            </Flex>
          </MenuItem>
          <MenuDivider mx={3}/>
          <MenuItem
            fontSize="14"
            fontWeight={700}
            _hover={{bg: "gray.100"}}
            onClick={() => signOut(auth)}
          >
            <Flex align="center" gap={2}>
              <Icon fontSize={20} as={MdOutlineLogout} />
              <span>Log Out</span>
            </Flex>
          </MenuItem>
        </> : <>
          <MenuItem
            fontSize="14"
            fontWeight={700}
            _hover={{bg: "gray.100"}}
            onClick={() => setAuthModalState({open: true, view: "login"})}
          >
            <Flex align="center" gap={2}>
              <Icon fontSize={20} as={MdOutlineLogin} />
              <span>Log In / Sign Up</span>
            </Flex>
          </MenuItem>
        </> }
      </MenuList>
    </Menu>
  );
}
export default UserMenu;