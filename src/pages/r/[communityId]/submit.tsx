import React from 'react';
import PageContent from "../../../components/Layout/PageContent";
import { Box, Text } from "@chakra-ui/react";
import NewPostForm from "../../../components/Post/PostForm/NewPostForm";

const SubmitPostPage:React.FC = () => {

  return (
    <PageContent>
      <>
        <Box py={3.5} borderBottom="1px solid" borderColor="white">
          <Text fontWeight={600}>
            Create a post
          </Text>
        </Box>
        <NewPostForm />
      </>
      <>
        {/*about comp*/}
      </>
    </PageContent>
  )
}
export default SubmitPostPage;