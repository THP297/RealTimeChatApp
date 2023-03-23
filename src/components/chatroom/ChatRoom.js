import { Avatar, Button, Form, Input, Tooltip, Col } from "antd";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import {
  UserAddOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Message from "./Message";
import AuthMessage from "./AuthMessage";
import { AppConText } from "../../Context/AppProvider.";
import { addDocument } from "../../Firebase/service";
import { AuthConText } from "../../Context/AuthProvider";


const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  border-bottom: 1px solid rgba(230, 230, 230);

  .header {
    &_info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &_title {
      margin: 0;
      font-weight: bold;
      padding-left: 10px;
      font-size: 20px;
      font-family: cursive;
      color: #009ed3;
    }
    &_description {
      font-size: 12px;
      padding-left: 10px;
    }
  }
`;

const ContentStyled = styled.div`
  height: calc(100% - 57px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-item: center;
  border: 1px solid rgba(230, 230, 230);

  .ant-form-item {
    flex: 1;
    margin-bottom: 0px;
  }
`;
const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const setBoxShadow = (e, value) => {
  e.target.style.boxShadow = value;
};

export default function ChatRoom({ room }) {
  const [form] = Form.useForm();
  const {
    mode,
    setIsInviteMemberVisible,
    messages,
    users,
    selectedRoom,
    setSelectedRoom,
    selectedRoomId,
    setSelectedRoomId,
    setRoomCount,
    roomCount,
  } = React.useContext(AppConText);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthConText);
  const [inputValue, setInputValues] = useState("");

  const handleOnSubmit = (room) => {
    addDocument("messages", {
      text: inputValue,
      uid,
      photoURL,
      roomId: room.id,
      displayName,
    });
    form.resetFields(["message"]);
  };

  const handleInputChange = (e) => {
    setInputValues(e.target.value);
  };
  const handleOnClose = (roomId) => {
    const roomsRemain = selectedRoom.filter((room) => room.id !== roomId);
    setSelectedRoom(roomsRemain);
    const roomsIdRemain = selectedRoomId.filter((id) => room.id !== id);
    setSelectedRoomId(roomsIdRemain);
    setRoomCount(roomCount - 1);
  };

  return (
    <React.Fragment key={room.id}>
      <Col
        span={12}
        xl={12}
        lg={12}
        md={12}
        sm={24}
        xs={24}
        style={{
          height: "50%",
          border: "0.5px solid grey",
        }}
      >
        <>
          <HeaderStyled>
            <div className="header_info">
              <p className="header_title">{room.name}</p>
              <span style={{color: mode? "white": "black"}} className="header_description">{room.description}</span>
            </div>
            <ButtonGroupStyled>
              <Button
                style={{color: mode? "white": "black"}}
                icon={<UserAddOutlined />}
                type="text"
                onClick={() => setIsInviteMemberVisible(true)}
              >
                Invite
              </Button>
              <Avatar.Group size="small" maxCount={2}>
                {users
                  .filter((user) => room.members.includes(user.uid))
                  .map((user) => {
                    return (
                      <Tooltip key={user.uid} title={user.displayName}>
                        <Avatar src={user.photoURL}>
                          {user.photoURL
                            ? ""
                            : user.displayName?.charAt(0)?.toUpperCase()}
                        </Avatar>
                      </Tooltip>
                    );
                  })}
              </Avatar.Group>
            </ButtonGroupStyled>
            <Button
              type="primary"
              shape="rectangle"
              icon={<CloseOutlined />}
              style={{ boxShadow: "none" }}
              className="close-button"
              onClick={() => handleOnClose(room.id)}
              onMouseEnter={(e) =>
                setBoxShadow(e, "0 2px 8px rgba(0, 0, 0, 0.15)")
              }
              onMouseLeave={(e) => setBoxShadow(e, "none")}
            />
          </HeaderStyled>

          <ContentStyled>
            <MessageListStyled>
              {messages
                .filter((message) => message.roomId === room.id)
                .map((message) => {
                  return message.uid === uid ? (
                    <AuthMessage
                      key={message.id}
                      text={message.text}
                      createdAt={message.createdAt}
                      style={{color: mode? "white":"black"}}
                    />
                  ) : (
                    <Message
                    
                      key={message.id}
                      text={message.text}
                      displayName={message.displayName}
                      createdAt={message.createdAt}
                      photoURL={message.photoURL}
                    />
                  );
                })}
            </MessageListStyled>
            <FormStyled form={form}>
              <Form.Item name="message">
                {/* <Upload fileList={fileList} onChange={handleUploadChange}>
                <Button icon={<UploadOutlined />}>Attach File</Button>
              </Upload> */}
                <Input
                style={{color: mode? "white":"black"}}
                  value={inputValue}
                  placeholder="Aa"
                  onChange={handleInputChange}
                  onPressEnter={() => {
                    handleOnSubmit(room);
                  }}
                  bordered={false}
                  autoComplete="off"
                />
              </Form.Item>
              <Button
                type="primary"
                onClick={() => {
                  handleOnSubmit(room);
                }}
              >
                Send
              </Button>
            </FormStyled>
          </ContentStyled>
        </>
      </Col>
    </React.Fragment>
  );
}
