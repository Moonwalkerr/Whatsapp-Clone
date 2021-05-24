import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import { auth, firestore } from "../firebaseConfig";
import getRecipentEmail from "../utils/getRecipentEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
const SidebarChat = ({ id, users }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const displayChat = () => {
    router.push("/chat/" + id);
  };

  const recipentEmail = getRecipentEmail(users, user);
  //   console.log(recipentEmail);
  const [recipentSnapshot] = useCollection(
    firestore.collection("users").where("userEmail", "==", recipentEmail)
  );
  //   the above function is doing cross-referecing throught the user's coleection and gets the snapshot of the recipent which we can use further

  const recipent = recipentSnapshot?.docs?.[0]?.data();
  return (
    <ChatContainer onClick={displayChat}>
      {recipent ? (
        <UserAvatar src={recipent.photoURL}></UserAvatar>
      ) : (
        <UserAvatar>{recipentEmail[0]}</UserAvatar>
      )}
      <p>{recipentEmail}</p>
    </ChatContainer>
  );
};

export default SidebarChat;

const ChatContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  word-break: break-word;
  padding: 12px;
  :hover {
    opacity: 0.9;
  }
`;
const UserAvatar = styled(Avatar)`
  margin-right: 15px;
`;
