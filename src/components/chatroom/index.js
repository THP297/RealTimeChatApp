import React, { useContext } from "react";
import { Row, Col } from "antd";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { AppConText } from "../../Context/AppProvider.";
import styled from "styled-components"


const RowStyled = styled(Row)`
background-color: ${props => props.mode ? "rgb(54, 67, 71)" : "white"};
`;

export default function ChatRoom() {

  const {mode} = useContext(AppConText);
  console.log(mode)

  return (
    <div>
      <RowStyled mode={mode}>
        <Col span={6} md={24} xl={6} sm={24} xs={24}>
          <Sidebar />
        </Col>
        <Col span={18} md={24} xl={18} sm={24} xs={24}>
          <ChatWindow />
        </Col>
      </RowStyled>
    </div>
  );
}
