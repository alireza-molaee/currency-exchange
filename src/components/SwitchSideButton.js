import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { faSync } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: ${(props) => (props.vertical ? "50px" : "320px")};
  height: ${(props) => (props.vertical ? "140px" : "50px")};
  display: flex;
  position: relative;
  margin: auto;

  &::before {
    content: "";
    background: #294354;
    width: ${(props) => (props.vertical ? "1px" : "125px")};
    height: ${(props) => (props.vertical ? "30px" : "1px")};
    position: absolute;
    top: ${(props) => (props.vertical ? "0" : "24px")};
    left: ${(props) => (props.vertical ? "24px" : "0")};
  }

  &::after {
    content: "";
    background: #294354;
    width: ${(props) => (props.vertical ? "1px" : "125px")};
    height: ${(props) => (props.vertical ? "30px" : "1px")};
    position: absolute;
    bottom: ${(props) => (props.vertical ? "0" : "25px")};
    right: ${(props) => (props.vertical ? "25px" : "0")};
  }
`;

const RoundButton = styled.button`
  display: block;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 1px solid #294354;
  background-color: #243642;
  color: #ffffff;
  cursor: pointer;
  margin: auto;

  & > .sync-icon {
    transition: transform 300ms ease-in;
  }

  &:hover {
    & > .sync-icon {
      transform: rotate(180deg);
    }
  }
`;

export const SwitchSideButton = (props) => {
  return (
    <Container vertical={props.vertical}>
      <RoundButton {...props}>
        <FontAwesomeIcon className="sync-icon" icon={faSync} />
      </RoundButton>
    </Container>
  );
};
