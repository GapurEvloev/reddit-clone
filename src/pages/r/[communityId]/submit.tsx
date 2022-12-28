import React from 'react';
import PageContent from "../../../components/Layout/PageContent";
import { Box, Text } from "@chakra-ui/react";
import NewPostForm from "../../../components/Post/PostForm/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";

const SubmitPostPage:React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <PageContent>
      <>
        <Box py={3.5} borderBottom="1px solid" borderColor="white">
          <Text fontWeight={600}>
            Create a post
          </Text>
        </Box>
        {user && <NewPostForm user={user}/>}
      </>
      <>
        {/*about comp*/}
      </>
    </PageContent>
  )
}
export default SubmitPostPage;