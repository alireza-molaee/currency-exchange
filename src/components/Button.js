import styled from "styled-components";

const BaseStyle = styled.button`
  display: inline-block;
  outline: 0;
  cursor: pointer;
  border: none;
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  border-radius: 7px;
  font-weight: 400;
  font-size: 16px;
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
`;

const PrimaryButton = styled(BaseStyle)`
  background-color: rgb(36, 107, 253);
  color: white;
  box-shadow: 0 4px 14px 0 rgb(0 118 255 / 39%);
  &:hover {
    background: rgba(36, 107, 253, 0.9);
    box-shadow: 0 6px 20px rgb(0 118 255 / 23%);
  }

  &:disabled {
    background: rgba(41, 88, 184, 0.9);
    box-shadow: 0 6px 20px rgb(0 118 255 / 10%);
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled(BaseStyle)`
  background: #fff;
  color: #696969;
  box-shadow: 0 4px 14px 0 rgb(0 0 0 / 10%);
  :hover {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 6px 20px rgb(93 93 93 / 23%);
  }
`;

export const Button = ({ secondary = false, ...otherProps }) => {
  return secondary ? (
    <SecondaryButton {...otherProps} />
  ) : (
    <PrimaryButton {...otherProps} />
  );
};
