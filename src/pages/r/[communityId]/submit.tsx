import React from 'react';
import About from '../../../components/Community/About';
import PageContent from '../../../components/Layout/PageContent';
import { Box, Text } from '@chakra-ui/react';
import NewPostForm from '../../../components/Post/PostForm/NewPostForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';
import { useRecoilValue } from 'recoil';
import { communityState } from '../../../atoms/communitiesAtom';
import useCommunityData from '../../../hooks/useCommunityData';

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  // const communityStateValue = useRecoilValue(communityState);
  const { communityStateValue } = useCommunityData();
  console.log('COMMUNITY', communityStateValue);

  return (
    <PageContent>
      <>
        <Box py={3.5} borderBottom="1px solid" borderColor="white">
          <Text fontWeight={600}>Create a post</Text>
        </Box>
        {user && (
          <NewPostForm
            user={user}
            communityImageURL={communityStateValue.currentCommunity?.imageURL}
          />
        )}
      </>
      <>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </>
    </PageContent>
  );
};
export default SubmitPostPage;
