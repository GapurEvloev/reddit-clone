import React from "react";
import { Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "../../Modals/Auth/AuthModal";
import { User } from "@firebase/auth";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({user}) => {
  return (
    <>
      <AuthModal />
      <Flex justifyContent="space-between" alignItems="center" gap={2}>
        {user ? (
          <Icons />
        ) : <AuthButtons/>}
        <UserMenu user={user} />
      </Flex>
    </>
  )
}
export default RightContent;