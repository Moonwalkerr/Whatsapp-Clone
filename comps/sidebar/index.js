import { Avatar, Button, IconButton } from "@material-ui/core";
import { ChatBubbleTwoTone, MoreVert, SearchSharp } from "@material-ui/icons";
import styled from "styled-components";

const Sidebar = () => {
  return (
    <Sidebar_Container>
      <Sidebar_Header>
        <Sidebar_HeaderAvatar />
        <Sidebar_HeaderIcons>
          <IconButton>
            <Sidebar_HeaderChat />
          </IconButton>
          <IconButton>
            <Sidebar_HeaderMenu />
          </IconButton>
        </Sidebar_HeaderIcons>
      </Sidebar_Header>
      <Sidebar_SearchContainer>
        <Sidebar_SearchIcon />
        <Sidebar_SearchBox />
      </Sidebar_SearchContainer>
      <Sidebar_AddNewChat>Start a new chat!</Sidebar_AddNewChat>
      <Sidebar_ChatsDisplay></Sidebar_ChatsDisplay>
    </Sidebar_Container>
  );
};

export default Sidebar;

// This will wrap around whole sidebar as a container
const Sidebar_Container = styled.div``;

// this is sidebar header : will contain user-avatar and primary buttons
const Sidebar_Header = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  background-color: whitesmoke;
  padding: 12px;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  box-shadow: 1px 3px 3px 2px rgba(0, 0, 0, 0.2);
`;
const Sidebar_HeaderAvatar = styled(Avatar)``;
const Sidebar_HeaderIcons = styled.div`
  display: flex;
  align-items: center;
`;
const Sidebar_HeaderChat = styled(ChatBubbleTwoTone)``;
const Sidebar_HeaderMenu = styled(MoreVert)``;

const Sidebar_SearchContainer = styled.div`
  flex: 1;
  margin: 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Sidebar_SearchIcon = styled(SearchSharp)``;
const Sidebar_SearchBox = styled.input`
  width: 80%;
  font-size: 20px;
  outline: 0;
`;

// Start new chat Button
const Sidebar_AddNewChat = styled(Button)`
  width: 100%;
`;

// Sidebar Chats Display Container
const Sidebar_ChatsDisplay = styled.div``;
