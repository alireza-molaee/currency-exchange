import styled from "styled-components";

export const Text = styled.span`
  display: inline-block;
  color: #8a8d90;
  font-size: 1em;
  font-weight: normal;
  text-align: ${(props) => props.align || "left"};
  margin-bottom: 10px;
  width: ${(props) => (props.fillArea ? "100%" : "initial")};
`;
