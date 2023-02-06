import { Inter } from '@next/font/google';
import { NextPage } from 'next';
import Head from "next/head";
import { Post, PostVote } from '../atoms/postsAtom';
import CreatePostLink from '../components/Community/CreatePostLink';
import PersonalHome from '../components/Community/PersonalHome';
import Premium from '../components/Community/Premium';
import Recommendations from '../components/Community/Recommendations';
import PageContent from '../components/Layout/PageContent';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostLoader from '../components/Post/Loader';
import PostItem from '../components/Post/PostItem';
import { auth, firestore } from '../firebase/clientApp';
import { useEffect, useState } from 'react';
import useCommunityData from '../hooks/useCommunityData';
import usePosts from '../hooks/usePosts';
import { Stack } from '@chakra-ui/react';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
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

  const {
    communityStateValue: { mySnippets, snippetsFetched },
  } = useCommunityData();

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

  const getUserPostVotes = async () => {
    try {
      const postIds = postStateValue.posts.map((post) => post.id);
      const postVotesQuery = query(
        collection(firestore, `users/${user?.uid}/postVotes`),
        where('postId', 'in', postIds),
      );
      const postVoteDocs = await getDocs(postVotesQuery);
      const postVotes = postVoteDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPostStateValue((prev) => ({
        ...prev,
        postVotes: postVotes as PostVote[],
      }));
    } catch (error) {
      console.log('getUserPostVotes', error);
    }
  };

  useEffect(() => {
    if (snippetsFetched) buildUserHomeFeed();
  }, [snippetsFetched]);

  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();
  }, [user, loadingUser]);

  useEffect(() => {
    if (user && postStateValue.posts.length) getUserPostVotes();

    return () => {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    };
  }, [user, postStateValue.posts]);

  return (
    <>
      <Head>
        <title>Reddit clone</title>
      </Head>
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
        <Stack spacing={5}>
          <Recommendations />
          <Premium />
          <PersonalHome />
        </Stack>
      </PageContent>
    </>
  );
};

export default Home;
