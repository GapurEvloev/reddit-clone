import React from "react";
import { Community } from "../../atoms/communitiesAtom";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import { FaReddit } from "react-icons/fa";
import Link from "next/link";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore, storage } from "../../firebase/clientApp";
import { useRouter } from "next/router";

type AboutProps = {
  communityData: Community
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  const [user] = useAuthState(auth); // will revisit how 'auth' state is passed
  const router = useRouter();

  return (
    <Box position="sticky" top="14px">
      <Flex
        justify="space-between"
        align="center"
        p={3}
        color="white"
        bg="blue.400"
        borderRadius="4px 4px 0px 0px"
      >
        <Text fontSize="10pt" fontWeight={700}>
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} cursor="pointer" />
      </Flex>
      <Flex direction="column" p={3} bg="white" borderRadius="0px 0px 4px 4px">
        <Stack spacing={2}>
          <Flex width="100%" p={2} fontWeight={600} fontSize="10pt">
            <Flex direction="column" flexGrow={1}>
              <Text>
                {communityData?.numberOfMembers?.toLocaleString()}
              </Text>
              <Text>Members</Text>
            </Flex>
            <Flex direction="column" flexGrow={1}>
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex
            align="center"
            width="100%"
            p={1}
            fontWeight={500}
            fontSize="10pt"
          >
            <Icon as={RiCakeLine} mr={2} fontSize={18} />
            {communityData?.createdAt && (
              <Text>
                Created{" "}
                {moment(
                  new Date(communityData.createdAt!.seconds * 1000)
                ).format("MMM DD, YYYY")}
              </Text>
            )}
            <Link href={`/r/${router.query.community}/submit`}>
              <Button mt={3} height="30px">
                Create Post
              </Button>
            </Link>
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
};

export default About;