import { Avatar, Typography } from "antd";
import { formatRelative } from "date-fns";
import React from "react";
import styled from "styled-components";

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 10px;
  .author {
    margin-left: 5px;
    font-weight: bold;
  }
  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }
  .content {
    margin-left: 5px;
  border: 1px solid skyblue;
  background-color: skyblue;
  border-radius: 10px;
  padding: 0px 10px 5px 3px;
  max-width: 200px;
  word-wrap: break-word;
  display: inline-block;
  font-size: 20px;
}
  }
`;

function formatDate(second) {
  let formattedDate = "";
  if (second) {
    formattedDate = formatRelative(new Date(second * 1000), new Date());
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
}
export default function AuthMessage({
  text,
  displayName,
  createdAt,
  photoURL,
}) {
  return (
    <WrapperStyled>
      <div>
        <Typography.Text className="date">
          {formatDate(createdAt?.seconds)}
        </Typography.Text>
      </div>
      <div>
        <Typography.Text className="content">{text}</Typography.Text>
      </div>
    </WrapperStyled>
  );
}
