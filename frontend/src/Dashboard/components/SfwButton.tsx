import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: ${(styledProps) => styledProps.theme.roundButtonSize.large};
  border: 0;
  height: ${(styledProps) => styledProps.theme.roundButtonSize.large};
  display: flex;
  font-size: 1.2rem;
  justify-content: center;
  align-items: center;
  color: ${(styledProps) => styledProps.theme.colors.fontColor};
  border-radius: 5px;
  background-color: ${(styledProps) => styledProps.theme.colors.primary};
  margin: ${(props) => props.theme.margin.tiny}
    ${(props) => props.theme.margin.tiny} 0
    ${(props) => props.theme.margin.tiny};
  &:hover,
  &:focus {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;
export const SfwButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return <StyledButton {...props}>SFW</StyledButton>;
};
