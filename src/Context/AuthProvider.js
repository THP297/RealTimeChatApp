import { auth } from "../Firebase/config";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { Spin } from "antd";

export const AuthConText = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });
        setIsLoading(false);
        history.push("/");
        return;
      }
      setIsLoading(false);
      history.push("/login");
    });

    return () => {
      unsubscribed();
    };
  }, [history]);

  return (
    <AuthConText.Provider value={{ user }}>
      {isLoading ? <Spin /> : children}
    </AuthConText.Provider>
  );
}
