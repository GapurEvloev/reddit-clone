import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from '@chakra-ui/react';
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
import CommentItem, { Comment } from './CommentItem';

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
  const [commentFetchLoading, setCommentFetchLoading] = useState(true);
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

      setCommentText('');
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
          createdAt: {
            seconds: Date.now() / 1000,
          },
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

  const getPostComments = async () => {
    try {
      const commentsQuery = query(
        collection(firestore, 'comments'),
        where('postId', '==', selectedPost?.id),
        orderBy('createdAt', 'desc'),
      );
      const commentDocs = await getDocs(commentsQuery);
      const comments = commentDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(comments as Comment[]);
    } catch (error) {
      console.log('getPostComments', error);
    } finally {
      setCommentFetchLoading(false);
    }
  };

  React.useEffect(() => {
    if (!selectedPost) return;
    getPostComments();
  }, [selectedPost]);

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
        {!commentFetchLoading && (
          <CommentInput
            commentText={commentText}
            setCommentText={setCommentText}
            createLoading={commentCreateLoading}
            user={user}
            onCreateComment={onCreateComment}
          />
        )}
      </Flex>
      <Stack spacing={6} p={2} pl={10} pb={6}>
        {commentFetchLoading ? (
          <>
            {[0, 1, 2].map((item) => (
              <Box key={item} p={6} bg="white">
                <SkeletonCircle size={'10'} />
                <SkeletonText mt="4" noOfLines={2} spacing={4} />
              </Box>
            ))}
          </>
        ) : (
          <>
            {comments.length === 0 ? (
              <Flex
                dir="column"
                justify="center"
                align="center"
                borderTop="1px solid"
                borderColor="gray.100"
                p={20}
              >
                <Text fontWeight={700} opacity={0.3}>
                  No Comments Yet
                </Text>
              </Flex>
            ) : (
              <>
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onDeleteComment={onDeleteComment}
                    loadingDelete={false}
                    userId={user?.uid}
                  />
                ))}
              </>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Comments;
