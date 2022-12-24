import React from 'react';
import { GetServerSidePropsContext } from "next";
import { doc, getDoc } from "@firebase/firestore";
import { firestore } from "../../../firebase/clientApp";
import { Community } from "../../../atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";
import CommunityNotFound from "../../../components/Community/NotFound";

interface CommunityPageProps {
  communityData: Community;
}

const CommunityPage:React.FC<CommunityPageProps> = ({communityData}) => {
  if (!communityData) {
    return <CommunityNotFound/>
  }
  return <div>Welcome to {communityData.id}</div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      `communities`,
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists() ? JSON.parse(safeJsonStringify({
          id: communityDoc.id,
          ...communityDoc.data()
        })) : "",
      }
    }
  } catch (error) {
    // could add error page here
    console.log("getServerSideProps error", error)
  }
}

export default CommunityPage;