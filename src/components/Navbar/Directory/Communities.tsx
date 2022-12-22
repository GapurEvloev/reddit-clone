import React from 'react';
import CreateCommunityModal from "../../Modals/CreateCommunity/CreateCommunityModal";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";

type CommunitiesProps = {

};

const Communities:React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <CreateCommunityModal isOpen={open} handleClose={() => setOpen(false)} />
      <MenuItem
        width={"100%"}
        fontSize="14"
        _hover={{bg: "gray.100"}}
        onClick={() => setOpen(true)}
      >
        <Flex align="center">
          <Icon fontSize={20} mr={2} as={GrAdd} />
          Create Community
        </Flex>
      </MenuItem>
    </>
  )
}
export default Communities;