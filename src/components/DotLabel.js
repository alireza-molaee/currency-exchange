import styled from "styled-components";

const DotLabelContainer = styled.span`
  display: inline-block;
  color: #8a8d90;
  font-size: 0.7em;
  font-weight: normal;
  border-radius: 15px;
  border: 1px solid #696b6d;
  padding: 6px 12px;
  line-height: 18px;
  margin: 10px 0;
`;

const Dot = styled.span`
  border-radius: 2px;
  display: inline-block;
  margin: 6px;
  margin-left: 0;
  vertical-align: middle;
  height: 4px;
  width: 4px;
  background: ${(props) => props.color};
  box-shadow: 0 0px 5px ${(props) => props.color};
`;

export const DotLabel = ({ children, color = "#2469f6", ...otherProps }) => {
  return (
    <DotLabelContainer {...otherProps} data-testid="dot-label">
      <Dot color={color} />
      <span>{children}</span>
    </DotLabelContainer>
  );
};
