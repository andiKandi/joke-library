import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: ${(styledProps) => styledProps.theme.roundButtonSize.large};
  border: 0;
  height: ${(styledProps) => styledProps.theme.roundButtonSize.large};
  display: flex;
  justify-content: center;
  font-size: 1.175rem;
  align-items: center;
  border-radius: 5px;
  color: ${(styledProps) => styledProps.theme.colors.fontColor};
  background-color: ${(styledProps) => styledProps.theme.colors.danger};
  margin: ${(props) => props.theme.margin.tiny}
    ${(props) => props.theme.margin.tiny} 0
    ${(props) => props.theme.margin.tiny};
  &:hover,
  &:focus {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;
export const NsfwButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return <StyledButton {...props}>NSFW</StyledButton>;
};
