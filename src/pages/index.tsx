import Head from 'next/head';
import { Inter } from '@next/font/google';
import { NextPage } from 'next';
import { Post, PostVote } from '../atoms/postsAtom';
import CreatePostLink from '../components/Community/CreatePostLink';
import PageContent from '../components/Layout/PageContent';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostLoader from '../components/Post/Loader';
import PostItem from '../components/Post/PostItem';
import { auth, firestore } from '../firebase/clientApp';
import { useRecoilValue } from 'recoil';
import { communityState } from '../atoms/communitiesAtom';
import { useEffect, useState } from 'react';
import useCommunityData from "../hooks/useCommunityData";
import usePosts from '../hooks/usePosts';
import { Stack } from '@chakra-ui/react';
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from 'firebase/firestore';

const inter = Inter({ subsets: ['latin'] });

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  } = usePosts();

  const {communityStateValue: {mySnippets, snippetsFetched}} = useCommunityData();

  const buildUserHomeFeed = async () => {
    setLoading(true);
    try {
      if (mySnippets.length) {
        const myCommunityIds = mySnippets.map((snippet) => snippet.communityId);
        const postQuery = query(
          collection(firestore, 'posts'),
          where('communityId', 'in', myCommunityIds),
          limit(10),
        );

        const postDocs = await getDocs(postQuery);
        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostStateValue((prev) => ({
          ...prev,
          posts: posts as Post[],
        }));
      } else {
      }
    } catch (error) {
      console.log('communityStateValue error', error);
    } finally {
      setLoading(false);
    }
  };

  const buildNoUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, 'posts'),
        orderBy('voteStatus', 'desc'),
        limit(10),
      );

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('NO USER FEED', posts);

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserPostVotes = () => {};

  useEffect(() => {
    if (snippetsFetched) buildUserHomeFeed();
  }, [snippetsFetched]);


  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();
  }, [user, loadingUser]);

  return (
    <PageContent>
      <>
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map((post) => (
              <PostItem
                post={post}
                userIsCreator={user?.uid === post.creatorId}
                onVote={onVote}
                onDeletePost={onDeletePost}
                key={post.id}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (item) => item.postId === post.id,
                  )?.voteValue
                }
                onSelectPost={onSelectPost}
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <></>
    </PageContent>
  );
};

export default Home;
