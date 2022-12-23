import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/modal";
import { Box, Button, Checkbox, Divider, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { doc, getDoc, runTransaction, serverTimestamp, setDoc } from "@firebase/firestore";
import { auth, firestore } from "../../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

type CreateCommunityModalProps = {
  isOpen: boolean;
  handleClose: () => void
};

const CreateCommunityModal:React.FC<CreateCommunityModalProps> = ({isOpen, handleClose}) => {
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError("");

    if (value.length > 21) return;

    setCommunityName(value);

    setCharsRemaining(21 - value.length)
  }

  const onCommunityTypeChange = ({target: {name}}: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityType(name);
  }

  const handleCreateCommunity = async () => {
    if (error) setError("");

    // validate the communityName
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityName) || communityName.length < 3) {
      setError("Community names must be between 3-21 characters, and can only contain letters, numbers or underscores");
      return;
    }

    setLoading(true);

    try {
      const communityDocRef = doc(firestore, "communities", communityName);

      await runTransaction(firestore, async (transaction) => {
        // check if the community exists in db
        const communityDoc = await transaction.get(communityDocRef);

        if (communityDoc.exists()) {
          throw new Error(`Sorry, r/${communityName} is already taken. Try another.`);
        }

        // Create community
        transaction.set(communityDocRef, {
          creatorID: user?.uid,
          createAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
          //
        });

        // create community snippet on user
        transaction.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityName), {
          communityId: communityName,
          isModerator: true,
        });
      });
    } catch (error: any) {
      console.error(error);
      setError(error.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            dir="column"
            fontSize={15}
            p={3}
          >
            Create a community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider/>
            <ModalCloseButton />
            <ModalBody
              display="flex"
              flexDirection="column"
              p={"10px 0"}
            >
              <Text fontWeight={600} fontSize={15}>Name</Text>
              <Text fontSize={11} color="gray.500">
                Community names including capitalization cannot be changed
              </Text>
              <Text
                pos="relative"
                top="28px"
                left="12px"
                width="20px"
                color="gray.400"
              >r/</Text>
              <Input value={communityName} size="sm" pl={6} onChange={handleChange} />
              <Text
                fontSize={12}
                color={charsRemaining ? "gray.500" : "red"}
                pt={2}
              >{charsRemaining} characters remaining</Text>
              <Text fontSize="9pt" color="red" pt={1}>{error}</Text>
              <Box my={4}>
                <Text
                  fontWeight={600}
                  fontSize={15}
                  mb={1}
                >
                  Community type
                </Text>
                {/*checkbox*/}
                <Stack spacing={2}>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="baseline" gap={1}>
                      <Icon as={BsFillPersonFill} alignSelf="center" color="gray.500" mr={1}/>
                      <Text fontSize={14}>Public</Text>
                      <Text fontSize={10} color="gray.500">
                        Anyone can view, post, and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="baseline" gap={1}>
                      <Icon as={BsFillEyeFill} alignSelf="center" color="gray.500" mr={1}/>
                      <Text fontSize={14}>Restricted</Text>
                      <Text fontSize={10} color="gray.500">
                        Anyone can view this community, but only approved users can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="baseline" gap={1}>
                      <Icon as={HiLockClosed} alignSelf="center" color="gray.500" mr={1}/>
                      <Text fontSize={14} >Private</Text>
                      <Text fontSize={10} color="gray.500">
                        Only approved users can view and submit to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0 0 10px 10px">
            <Button variant="outline" h={8} mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button h={8} onClick={handleCreateCommunity} isLoading={loading}>
              Create community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default CreateCommunityModal;