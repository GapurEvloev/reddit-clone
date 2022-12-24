import React from 'react';
import { useRecoilState, useSetRecoilState } from "recoil";
import { Community, CommunitySnippet, communityState } from "../atoms/communitiesAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import { collection, doc, getDocs, increment, writeBatch } from "@firebase/firestore";
import { authModalState } from "../atoms/authModalAtom";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const onJoinOrLeaveCommunity = (community: Community, isJoined: boolean) => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    setLoading(true);
    if (isJoined) {
      leaveCommunity(community.id);
      return;
    }
    joinCommunity(community);
  };

  const getMySnippets = async () => {
    setLoading(true);

    try {
      const snippetDocs = await getDocs(collection(firestore, `users/${user?.uid}/communitySnippets`));

      const snippets = snippetDocs.docs.map(doc => ({...doc.data()}));

      setCommunityStateValue(prev => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }))
      console.log("snippets", snippets);
    } catch (error: any) {
      console.log("getMySnippets error", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const joinCommunity = async (community: Community) => {
    try {
      const batch = writeBatch(firestore);

      const newSnippet: CommunitySnippet = {
        communityId: community.id,
        imageURL: community.imageURL || "",
      };

      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          community.id // will for sure have this value at this point
        ),
        newSnippet
      );

      batch.update(doc(firestore, "communities", community.id), {
        numberOfMembers: increment(1),
      });

      // perform batch writes
      await batch.commit();

      // Add current community to snippet
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log("joinCommunity error", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const leaveCommunity = async (communityId: string) => {
    try {
      const batch = writeBatch(firestore);

      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets/${communityId}`)
      );

      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.log("leaveCommunity error", error);
      setError(error.message)
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
    error,
  }
}
export default useCommunityData;