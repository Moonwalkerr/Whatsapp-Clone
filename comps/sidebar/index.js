import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import { Button, IconButton } from "@material-ui/core";
import { MoreVertOutlined, Search } from "@material-ui/icons";
import * as EmailValidator from "email-validator";
import { auth, firestore } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import SidebarChat from "../sidebarChat";

const Sidebar = () => {
  const [user] = useAuthState(auth);

  const logout = async () => {
    await auth.signOut();
  };
  const addNewChat = () => {
    const email = prompt("Enter the email address of receiver");
    if (!email) console.log("not email");

    // email validator will validate the correct email addresses and will then allow them to pass to firestore
    if (
      EmailValidator.validate(email) &&
      !chatAlreadyExists(email) &&
      email !== user.email
    ) {
      // adding new chat to firestore
      firestore.collection("chats").add({
        users: [user.email, email],
      });
    } else {
      console.log("error");
    }
  };

  //   fetching user's chat doc
  const useChatRef = firestore
    .collection("chats")
    .where("users", "array-contains", user.email);

  const [chatSnapshot] = useCollection(useChatRef);
  //   real time listener for the same

  //   function to check if chat already exists
  function chatAlreadyExists(recipentEmail) {
    !!chatSnapshot?.docs.find(
      (userChat) =>
        userChat.data().users.find((user) => user === recipentEmail)?.length > 0
    );
    /** the above check will check if the recipent email's chat is already exists with the user's doc
     * it will return in form of 0 (truthy) or falsey(undefined / null) accordingly
     *   !! is being used to convert the returned truthy or falsy values to boolean
     */
  }

  return (
    <SideBar__Container>
      <SideBar__Header>
        <IconButton>
          <Sidebar__HeaderAvatar src={user.photoURL} alt={user.email[0]} />
        </IconButton>
        <SideBar__HeaderIcons>
          <IconButton>
            <Sidebar__HeaderChatIcon />
          </IconButton>
          <IconButton onClick={logout}>
            <Sidebar__HeaderMenuIcon />
          </IconButton>
        </SideBar__HeaderIcons>
      </SideBar__Header>
      <Sidebar__SearchContainer>
        <IconButton>
          <Sidebar__SearchIcon />
        </IconButton>
        <Sidebar__SearchInput />
      </Sidebar__SearchContainer>
      <Sidebar__AddNewChat onClick={addNewChat}>
        Add New chat
      </Sidebar__AddNewChat>
      <Sidebar__Chats>
        {chatSnapshot?.docs.map((chat) => (
          <SidebarChat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
      </Sidebar__Chats>
    </SideBar__Container>
  );
};

export default Sidebar;

// Sidbar comp
const SideBar__Container = styled.div`
  /* width: 100%; */
`;

// Sidebar header section
const SideBar__Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: whitesmoke;
`;

const SideBar__HeaderIcons = styled.div``;

const Sidebar__HeaderAvatar = styled(Avatar)``;
const Sidebar__HeaderChatIcon = styled(SpeakerNotesIcon)``;
const Sidebar__HeaderMenuIcon = styled(MoreVertOutlined)``;

// Sidebar search cont
const Sidebar__SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  /* width: 100%; */
`;
const Sidebar__SearchIcon = styled(Search)``;
const Sidebar__SearchInput = styled.input`
  outline: 0;
  width: 80%;
  font-size: 1.5rem;
`;

// Sidebar Add New chat
const Sidebar__AddNewChat = styled(Button)`
  width: 100%;
  background-color: green;
`;

// Sidebar Chats
const Sidebar__Chats = styled.div``;
