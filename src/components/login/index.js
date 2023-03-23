import React from "react";
import { Row, Col, Button, Typography } from "antd";
import firebase, { auth } from "../../Firebase/config";
import { addDocument, generateKeywords } from "../../Firebase/service";
import { GoogleButton } from "react-google-button";
import "./login.css";
import styled from "styled-components";

const FirstRowStyled = styled(Row)`
  display: flex;
  align-items: center;
  height: 10vh;
  margin-bottom: 2%;
`;
const SecondRowStyled = styled(Row)`
  display: flex;
  align-items: center;
  height: 90vh;
`;

const SpeechBubble = styled.div`
  display: inline-block;
  padding: 10px;
  background-color: rgb(106, 212, 241);
  border-radius: 10px;

  &:before {
    content: "";
    position: absolute;
    top: 26px;
    left: 0px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 20px 10px 0;
    border-color: transparent rgb(106, 212, 241) transparent transparent;
    transform: rotate(-180deg);
  }
`;
const LeftColStyled = styled(Col)`
  p {
    color: white;
  }
  h1 {
    text-align: left;
    font-size: 60px;
  }
`;

const RightColStyled = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("https://static.vecteezy.com/system/resources/previews/000/267/439/original/vector-rainbow-halftone-dots-background.jpg");
  background-size: cover;
  background-position: center;
  opacity: 0.8;
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
`;

const LinkStyled = styled(Typography.Link)`
  display: flex
  justify-content: between; 
  font-size: 20px;
  font-weight: bold;
  &.menu{
    color:white;
  }
`;
const imageNames = {
  one: require("./1.png"),
  two: require("./2.png"),
  three: require("./3.png"),
  bg: require("./bg.jpg"),
};
export default function Login() {
  const handleFbLogin = async () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);

    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName),
      });
    }
  };
  const handleGoogleLogin = async () => {
    const ggProvider = new firebase.auth.GoogleAuthProvider();
    ggProvider.setCustomParameters({ prompt: "select_account" });
    try {
      const result = await auth.signInWithPopup(ggProvider);
      console.log(result);

      if (result.additionalUserInfo?.isNewUser) {
        addDocument("users", {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          uid: result.user.uid,
          providerId: result.additionalUserInfo.providerId,
          keywords: generateKeywords(result.user.displayName),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="LoginWrapper">
      <FirstRowStyled style={{ height: "10vh" }}>
        <Col span={16} xs={24} lg={16} xl={16} md={14} sm={12}>
          <div className="icon-container">
            <img src={imageNames.one} alt="dynamic-icon" />
          </div>
        </Col>
        <Col
          style={{ display: "flex", justifyContent: "space-between" }}
          span={3}
          xs={18}
          lg={6}
          md={8}
          sm={10}
        >
          <LinkStyled className="menu">Feature</LinkStyled>
          <LinkStyled className="menu">Blog</LinkStyled>
          <LinkStyled className="menu">Introduce</LinkStyled>
        </Col>
      </FirstRowStyled>
      <SecondRowStyled>
        <Col span={1}></Col>
        <LeftColStyled span={11} xs={22} lg={22} xl={11} md={22} sm={22}>
          <SpeechBubble>Hello, you!</SpeechBubble>

          <h1>EASY CHAT WITH FRIENDS</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia
            magni quibusdam error quia reprehenderit aut tempora, corrupti
            accusamus facere quos perspiciatis, eveniet cum porro magnam, dicta
            omnis fugit ex provident? Expedita, tempore ea. Illum commodi quos
            dolor distinctio obcaecati suscipit explicabo quibusdam facere
            ratione qui aliquid inventore error, consequuntur ducimus asperiores
            expedita perferendis, nostrum maiores minus consectetur ut sit
            eligendi.
          </p>
          <h3>Sign in </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GoogleButton
              style={{ width: "auto", marginBottom: 5 }}
              onClick={handleGoogleLogin}
            >
              Sign in with Google
            </GoogleButton>
            <Button
              style={{ width: "auto", marginBottom: 5, marginLeft: 5 }}
              onClick={handleFbLogin}
            >
              Sign in with Facebook
            </Button>
          </div>
        </LeftColStyled>
        <RightColStyled span={11} xs={24} lg={24} xl={11} md={24} sm={24}>
          <div className="phone">
            <div class="chat-room">
              <img
                class="avatar"
                src="https://tse2.mm.bing.net/th?id=OIP.XY6kLBtWIFqVmLZ5glAAiQHaFj&pid=Api&P=0"
                alt="Avatar"
              />
              Chat Room{" "}
            </div>

            <div class="bubble bubble-left">Hello, you!</div>
            <div class="bubble bubble-right">What's up today?</div>
            <div className="icons">
              <img src={imageNames.one} alt="icon1" />
              <img src={imageNames.two} alt="icon2" />
              <img src={imageNames.three} alt="icon3" />
            </div>
            <div
              class="message-input"
              contenteditable="true"
              placeholder="Type a message..."
            ></div>
            <button class="send-button">Send</button>
          </div>
        </RightColStyled>
      </SecondRowStyled>
    </div>
  );
}
