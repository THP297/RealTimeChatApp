import React from "react";
import Login from "./components/login";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ChatRoom from "./components/chatroom";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider.";
import AddRoomModal from "./components/Modals/AddRoomModal";
import InviteMemberModal from "./components/Modals/InviteMemberModal";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Switch>
            <Route component={Login} path="/login"></Route>
            <Route component={ChatRoom} path="/"></Route>
          </Switch>
          <AddRoomModal />
          <InviteMemberModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
