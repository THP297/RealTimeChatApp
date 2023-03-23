import React, { useContext } from "react";
import { Button, Avatar, Typography } from "antd";
import styled from "styled-components";
import { auth } from "../../Firebase/config";
import { AuthConText } from "../../Context/AuthProvider";
import { AppConText } from "../../Context/AppProvider.";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import {Row,Col} from "antd"

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 10px;
  border-bottom: 1px solid rgba(82, 38, 83);
  .username {
    color: white;
    margin-left: 5px;
  }
`;

const BtnAndModeStyled = styled(Row)`

  #mode{
    margin-right: 10px;
    border: none;
  }
`;
export default function UserInfo() {
  const {
    user: { displayName, photoURL },
  } = React.useContext(AuthConText);

  const {setMode,mode} = useContext(AppConText);

  const handleChangeMode = () =>{
    setMode(!mode)
    console.log(mode)
  }

  return (
    <WrapperStyled>
      <div>
        <Avatar src={photoURL}>
          {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="username">{displayName}</Typography.Text>
      </div>
      <BtnAndModeStyled>
        <Col xl={10} lg={24} md={24} sm={24}>
        <Button id="mode" ghost onClick={handleChangeMode}><FontAwesomeIcon icon={mode ? faSun : faMoon} />{mode === true?"Light mode":"Dark mode"}</Button> 
        </Col>

        <Col xl={4} lg={0} md={0} sm={0}/>
        
        <Col xl={10 } lg={24} md={24} sm={24}>
        <Button ghost onClick={() => auth.signOut()} style={{border: "none"}}>
          Log Out
        </Button>
        </Col>
      </BtnAndModeStyled>
    </WrapperStyled>
  );
}
