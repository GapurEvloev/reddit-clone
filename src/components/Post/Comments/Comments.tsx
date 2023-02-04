import { Box, Flex, Stack } from '@chakra-ui/react';
import { User } from '@firebase/auth';
import {
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from 'firebase/firestore';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import { Post, postState } from '../../../atoms/postsAtom';
import { firestore } from '../../../firebase/clientApp';
import CommentInput from './CommentInput';
import { Comment } from './CommentItem';

type CommentsProps = {
  user?: User | null;
  selectedPost: Post;
  communityId: string;
};

const Comments: React.FC<CommentsProps> = ({
  user,
  selectedPost,
  communityId,
}) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentFetchLoading, setCommentFetchLoading] = useState(false);
  const [commentCreateLoading, setCommentCreateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState('');
  const setAuthModalState = useSetRecoilState(authModalState);
  const setPostState = useSetRecoilState(postState);

  const onCreateComment = async () => {
    if (!user) {
      setAuthModalState({ open: true, view: 'login' });
      return;
    }

    setCommentCreateLoading(true);

    try {
      const batch = writeBatch(firestore);

      // Create comment document
      const commentDocRef = doc(collection(firestore, 'comments'));
      batch.set(commentDocRef, {
        id: commentDocRef.id,
        postId: selectedPost.id,
        creatorId: user.uid,
        creatorDisplayText: user.email!.split('@')[0],
        creatorPhotoURL: user.photoURL,
        communityId,
        text: commentText,
        postTitle: selectedPost.title,
        createdAt: serverTimestamp(),
      } as Comment);

      // Update post numberOfComments
      const postDocRef = doc(firestore, 'posts', selectedPost?.id!);
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });

      await batch.commit();

      setCommentText("");
      const { id: postId, title } = selectedPost;
      setComments((prev) => [
        {
          id: commentDocRef.id,
          postId: selectedPost.id,
          creatorId: user.uid,
          creatorDisplayText: user.email!.split('@')[0],
          creatorPhotoURL: user.photoURL,
          communityId,
          text: commentText,
          postTitle: selectedPost.title,
          createdAt: serverTimestamp(),
        } as Comment,
        ...prev,
      ]);

      // Fetch posts again to update number of comments
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as Post,
        postUpdateRequired: true,
      }));
    } catch (error: any) {
      console.log('onCreateComment error', error.message);
    } finally {
      setCommentCreateLoading(false);
    }
  };

  const onDeleteComment = async (comment: any) => {};

  const getPostComments = async () => {};

  React.useEffect(() => {
    getPostComments();
  }, []);

  return (
    <Box bg="white" p={2} borderRadius="0px 0px 4px 4px">
      <Flex
        direction="column"
        pl={10}
        pr={4}
        mb={6}
        fontSize="10pt"
        width="100%"
      >
        <CommentInput
          commentText={commentText}
          setCommentText={setCommentText}
          createLoading={commentCreateLoading}
          user={user}
          onCreateComment={onCreateComment}
        />
      </Flex>
      <Stack spacing={6} p={2}></Stack>
    </Box>
  );
};

export default Comments;
