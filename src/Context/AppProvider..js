import React, { useState } from "react";
import { AuthConText } from "./AuthProvider";
import useFirestore, { useFirestoreCollection } from "../hooks/useFirestore";

export const AppConText = React.createContext();

export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [roomCount, setRoomCount] = useState(0);
  const [selectedRoomId, setSelectedRoomId] = useState([]);
  const [currentRoomId, setCurrentRoomId] = useState("");
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [mode,setMode] = useState(false);

  const { user } = React.useContext(AuthConText);
  const uid = user ? user.uid : null;

  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFirestore("rooms", roomsCondition);

  React.useMemo(() => {
    const documents =
      rooms.filter((room) => selectedRoomId.includes(room.id)) || {};
    setSelectedRoom(documents);
  }, [rooms, selectedRoomId]);

  const currentRoom = React.useMemo(
    () => rooms.find((room) => room.id === currentRoomId) || "",
    [rooms, currentRoomId]
  );

  console.log(selectedRoomId)
  const messages = useFirestoreCollection("messages");
  const users = useFirestoreCollection("users");

  return (
    <AppConText.Provider
      value={{
        mode,
        setMode,
        roomCount,
        setRoomCount,
        users,
        messages,
        rooms,
        currentRoom,
        currentRoomId,
        setCurrentRoomId,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
        setSelectedRoom,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
      }}
    >
      ,{children}
    </AppConText.Provider>
  );
}
