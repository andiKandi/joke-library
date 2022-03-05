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
export const FilterButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <StyledButton {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 518.462 518.462"
        focusable="false"
        style={{ fill: "#fff", height: "36px", width: "36px" }}
      >
        <path
          d="M518.462,22.82H0l193.159,203.495l-0.014,269.327l132.173-68.37l-0.014-200.957L518.462,22.82z M212.837,463.286
			l0.014-244.827L45.846,42.512h426.769L305.611,218.459l0.014,196.832L212.837,463.286z"
        />
      </svg>
    </StyledButton>
  );
};
