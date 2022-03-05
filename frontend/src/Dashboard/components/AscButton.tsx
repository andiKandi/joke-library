import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: ${(styledProps) => styledProps.theme.roundButtonSize.huge};
  border: 0;
  height: ${(styledProps) => styledProps.theme.roundButtonSize.huge};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: ${(styledProps) => styledProps.theme.margin.medium};
  background-color: ${(styledProps) => styledProps.theme.colors.primary};
  &:hover,
  &:focus {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;
export const AscButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <StyledButton {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        focusable="false"
        style={{ fill: "#fff", height: "36px", width: "36px" }}
      >
        <path
          d="M0,5.6v44.5h44.5V5.6H0z M378.4,5.6v416l-57.7-57.7l-31.3,31.3l95.3,96l16,15.3l16-15.3l95.3-96l-31.3-31.3L423,421.6V5.6
                H378.4z M0,94.6v44.5h89V94.6H0z M0,183.7v44.5h133.6v-44.5H0z M0,272.7v44.5h178.1v-44.5H0z M0,361.7v44.5h222.6v-44.5H0z
                M0,450.8v44.5h267.1v-44.5H0z"
        />
      </svg>
    </StyledButton>
  );
};
