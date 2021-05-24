import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebaseConfig";
import Head from "next/head";
import getRecipentEmail from "../../utils/getRecipentEmail";

const ChatDisplay = ({ messages, chat }) => {
  const [user] = useAuthState(auth);

  return (
    <>
      <Head>
        <title>Chat with {getRecipentEmail(chat.users, user)} </title>
      </Head>
      <ChatContainer>
        <ChatScreen />
      </ChatContainer>
    </>
  );
};

export default ChatDisplay;

const ChatContainer = styled.div``;
const ChatScreen = styled.div``;

// for server side rendering of chats before loading the page itself
export const getServerSideProps = async (context) => {
  const ref = firestore.collection("chats").doc(context.query.id);

  // preparing the messages on server
  const messageRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();
  // we cant use onSnapshot() on server side as it doesnt makes any sense

  const messages = messageRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      // from API to client side : we lose the timestamp datatype
      // .getTime() function helps us to get correct timestamp format in Unix timestamp format
      timestamp: messages.timestamp.toDate().gettTime(),
    }));
  // preparing the chats
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  // we can test pre rendering / server side rendering by console log
  console.log(chat, messages);

  // ultimately server returns us the props which we can pass to the main component to render data
  return {
    props: {
      // during passing data via network, it needs to be stringyfied
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
};
