import { Avatar } from "@material-ui/core";
import { ChatBubbleTwoTone, MoreVert, SearchSharp } from "@material-ui/icons";
import styled from "styled-components";

const Sidebar = () => {
  return (
    <Sidebar_Container>
      <Sidebar_Header>
        <Sidebar_HeaderAvatar />
        <Sidebar_HeaderIcons>
          <Sidebar_HeaderChat />
          <Sidebar_HeaderMenu />
        </Sidebar_HeaderIcons>
      </Sidebar_Header>
      <Sidebar_SearchContainer>
        <Sidebar_SearchIcon />
        <Sidebar_SearchBox />
      </Sidebar_SearchContainer>
    </Sidebar_Container>
  );
};

export default Sidebar;

// This will wrap around whole sidebar as a container
const Sidebar_Container = styled.div``;

// this is sidebar header : will contain user-avatar and primary buttons
const Sidebar_Header = styled.div``;
const Sidebar_HeaderAvatar = styled(Avatar);
const Sidebar_HeaderIcons = styled.div``;
const Sidebar_HeaderChat = styled(ChatBubbleTwoTone)``;
const Sidebar_HeaderMenu = styled(MoreVert)``;

const Sidebar_SearchContainer = styled.div``;
const Sidebar_SearchIcon = styled(SearchSharp)``;
const Sidebar_SearchBox = styled.input``;
