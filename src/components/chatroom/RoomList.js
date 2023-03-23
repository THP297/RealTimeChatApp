import React from "react";
import { Button, Collapse, Typography } from "antd";
import styled from "styled-components";
import { PlusSquareOutlined } from "@ant-design/icons";
import { AppConText } from "../../Context/AppProvider.";

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add-room {
      color: white;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  &.room-name {
    color: #b7a8e5;
    font-size: 18px;
    font-weight: bold;
  }
`;

export default function RoomList() {
  const {
    rooms,
    setIsAddRoomVisible,
    setSelectedRoomId,
    setCurrentRoomId,
    setRoomCount,
  } = React.useContext(AppConText);
  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  return (
    <div>
      <Collapse ghost defaultActiveKey={["1"]}>
        <PanelStyled header="Room List" key="1">
          {rooms.map((room) => (
            <LinkStyled
              key={room.id}
              onClick={() => {
                setSelectedRoomId((prevRoomId) =>
                  prevRoomId.includes(room.id) ? [...prevRoomId]:
                  prevRoomId.length > 3
                    ? [...prevRoomId]
                    : [...prevRoomId, room.id]
                );
                setCurrentRoomId(room.id);
                setRoomCount((prevCount) =>
                  prevCount > 3 ? 4 : prevCount + 1
                );
              }}
              className="room-name"
            >
              {room.name}
            </LinkStyled>
          ))}
          <Button
            className="add-room"
            type="text"
            icon={<PlusSquareOutlined />}
            onClick={handleAddRoom}
          >
            Add Room
          </Button>
        </PanelStyled>
      </Collapse>
    </div>
  );
}
