import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";

const Icons:React.FC = () => {

  return (
    <Flex>
      <Flex
        display={{base: "none", md: "flex"}}
        align="center"
        borderRight="1px solid"
        pr={{base: 1, md: 3}}
        borderColor="gray.200"
        gap={{base: 1, md: 3}}
      >
        <Flex
          p={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{
            bg: "gray.200",
          }}
        >
          <Icon as={BsArrowUpRightCircle} fontSize={19} />
        </Flex>
        <Flex
          p={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{
            bg: "gray.200",
          }}
        >
          <Icon as={IoFilterCircleOutline} fontSize={22} />
        </Flex>
        <Flex
          p={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{
            bg: "gray.200",
          }}
        >
          <Icon as={IoVideocamOutline} fontSize={22} />
        </Flex>
      </Flex>
      <Flex
        align="center"
        pl={{base: 1, md: 3}}
        gap={{base: 1, md: 3}}
      >
        <Flex
          p={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{
            bg: "gray.200",
          }}
        >
          <Icon as={BsChatDots} fontSize={18} />
        </Flex>
        <Flex
          p={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{
            bg: "gray.200",
          }}
        >
          <Icon as={IoNotificationsOutline} fontSize={20} />
        </Flex>
        <Flex
          display={{base: "none", md: "flex"}}
          p={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{
            bg: "gray.200",
          }}
        >
          <Icon as={GrAdd} fontSize={20} />
        </Flex>
      </Flex>
    </Flex>
  )
}
export default Icons;