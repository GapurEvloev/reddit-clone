import React from "react";
import { Community } from "../atoms/communitiesAtom";
import { Post, postState } from "../atoms/postsAtom";
import { useRecoilState } from "recoil";
import { deleteObject, ref } from "@firebase/storage";
import { firestore, storage } from "../firebase/clientApp";
import { deleteDoc, doc } from "@firebase/firestore";

const usePosts = (communityData?: Community) => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async () => {};

  const onSelectPost = () => {};

  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      };

      const postDocRef = doc(firestore, 'posts', post.id!);
      await deleteDoc(postDocRef);

      setPostStateValue(prev => ({
        ...prev,
        posts: prev.posts.filter(item => item.id !== post.id),
      }));

      return true;
    } catch (error: any) {
      console.log("onDeletePost error", error.message);
      return false;
    }

    return true;
  };

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    onSelectPost,
  }
};

export default usePosts;