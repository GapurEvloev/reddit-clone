import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/modal";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import ResetPassword from "./ResetPassword";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);

  const handleModalState = () => {
    setModalState(prev => ({
      ...prev,
      open: false
    }))
  };

  const toggleView = (view: string) => {
    setModalState({
      ...modalState,
      view: view as typeof modalState.view,
    });
  };

  React.useEffect(() => {
    if (user) {
      handleModalState();
    }
  }, [user])

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleModalState}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader textAlign="center">
            {modalState.view === "login" && "Login"}
            {modalState.view === "signup" && "Sign up"}
            {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton/>
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            pb={8}
            pt={0}
          >
            <Flex direction="column" align="center" justify="center" width="70%">
              {
                modalState.view === "login" || modalState.view === "signup" ? (
                  <>
                    <OAuthButtons />
                    <Flex w="100%" justify="center" align="center" fontSize={14} fontWeight={900}>
                      <Text flex={"1 1"} borderBottom="1px solid" h={0} borderColor="gray.200"/>
                      <Text color="gray.500" mx={4}>OR</Text>
                      <Text flex={"1 1"} borderBottom="1px solid" h={0} borderColor="gray.200"/>
                    </Flex>
                    <AuthInputs /*toggleView={toggleView}*/ />
                  </>
                ) : (
                  <ResetPassword toggleView={toggleView} />
                )
              }
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AuthModal;