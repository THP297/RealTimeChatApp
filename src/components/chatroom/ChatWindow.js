import { Row, Alert } from "antd";
import React from "react";
import styled from "styled-components";
import { AppConText } from "../../Context/AppProvider.";
import ChatRoom from "./ChatRoom";

const WrapperStyled = styled.div`
  height: 97vh;
`;

const FloatingAlert = styled(Alert)`
  width:75%;
  height:20%;
  top: 50%;
  left: 51%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px rgb(135, 206, 235);
  
  div{
    background-color: skyblue;
    padding: 5px;
    border-radius: 20px;
  }
  
  p{
    font-size:15px;
  }
  b{
    font-size: 20px;
  }

  @media (max-width: 1200px) {
    top: 20%;
    height:25%;

}

  @media (max-width: 768px) {
    height:30%;
    p{
        font-size: 15px;
    }
    b{
        font-size: 20px;
    }
}
  
  @media (max-width: 576px) {
    width:90%;
    top: 30%;
    height: 30%;
    p{
      font-size:13px;
    }
    b{
      font-size: 17px;
    }
  }
`;
export default function ChatWindow() {
  const { selectedRoom } = React.useContext(AppConText);
  return (
    <WrapperStyled>
      <Row style={{ height: "100%" }}>
        {selectedRoom.length !== 0 ? (
          selectedRoom.length >= 4 ? (
            <>
              {selectedRoom.slice(0, 4).map((room) => {
                return <ChatRoom key={room.id} room={room} />;
              })}
            </>
          ) : (
            selectedRoom.map((room) => {
              return <ChatRoom key={room.id} room={room} />;
            })
          )
        ) : (
          <FloatingAlert
          className="FloatingAlert"
            message="Important Announcement"
            description={
              <div>
                <p>
                Attention all users! Our chat app now offers the option to
                choose a room to chat in. Explore our list of available rooms
                and join discussions that pique your interest. Connect with
                like-minded users and have fun chatting.
                </p>
                <b>
                  The amount of room cannot be greater than 4 so consider to
                  close a chat room!
                </b>
              </div>
            }
            type="warning"
            closable
          />
        )}
      </Row>
    </WrapperStyled>
  );
}
