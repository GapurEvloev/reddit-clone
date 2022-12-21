import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "../../Modals/Auth/AuthModal";
import { signOut, User } from "@firebase/auth";
import { auth } from "../../../firebase/clientApp";
import Icons from "./Icons";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({user}) => {
  return (
    <>
      <AuthModal />
      <Flex justifyContent="space-between" alignItems="center" gap={2}>
        {user ? (
          <>
            <Icons />
            <Button onClick={() => signOut(auth)}>Log out</Button>
          </>
        ) : <AuthButtons/>}
        {/*<MenuWrapper />*/}
      </Flex>
    </>
  )
}
export default RightContent;