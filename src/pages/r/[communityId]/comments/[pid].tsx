import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import About from '../../../../components/Community/About';
import PageContent from '../../../../components/Layout/PageContent';
import PostItem from '../../../../components/Post/PostItem';
import { auth } from '../../../../firebase/clientApp';
import useCommunityData from '../../../../hooks/useCommunityData';
import usePosts from '../../../../hooks/usePosts';

const PostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { postStateValue, setPostStateValue, onDeletePost, onVote } =
    usePosts();

  return (
    <PageContent>
      <>
        {postStateValue.selectedPost && (
          <PostItem
            post={postStateValue.selectedPost}
            onVote={onVote}
            onDeletePost={onDeletePost}
            userVoteValue={
              postStateValue.postVotes.find(
                (item) => item.postId === postStateValue.selectedPost?.id,
              )?.voteValue
            }
            userIsCreator={user?.uid === postStateValue.selectedPost?.creatorId}
          />
        )}
      </>
      <>{/*<About/>*/}</>
    </PageContent>
  );
};

export default PostPage;
