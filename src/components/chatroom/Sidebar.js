import React, { useContext } from "react";
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";
import styled from "styled-components";
import { AppConText } from "../../Context/AppProvider.";
const SidebarStyled = styled.div`
  display: grid;
  grid-template-areas:
    "roomlist"
    "userinfo";
  grid-template-rows: 1fr auto;
  background: ${props => props.mode ? "rgb(1,33,41)":"#005e7e"};
  color: white;
  height: 96vh;
  @media (max-width: 1200px) {
    height: auto;
  }
`;

const UserInfoStyled = styled.div`
  grid-area: userinfo;
  align-self: end;
`;

const RoomListStyled = styled.div`
  grid-area: roomlist;
`;

export default function Sidebar() {

  const {mode} = useContext(AppConText);
  
  return (
    <SidebarStyled mode={mode}>
      <RoomListStyled>
        <RoomList />
      </RoomListStyled>
      <UserInfoStyled>
        <UserInfo />
      </UserInfoStyled>
    </SidebarStyled>
  );
}
