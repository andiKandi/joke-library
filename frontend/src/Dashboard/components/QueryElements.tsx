import React, { useRef } from "react";
import styled from "styled-components";

const InputLabel = styled.label`
  position: absolute;
  left: 15px;
  top: 35px;
  color: rgb(116, 116, 116);
  transform: matrix(1, 0, 0, 1, 0, -12.5);
  transition-property: transform;
  line-height: 25px;
  font-size: 18px;
  transition-duration: 0.3s;
`;

const InputField = styled.input`
  background-color: transparent;
  padding: 26px 0 13px;
  outline-width: 0;
  border-width: 0;
  align-content: center;
  align-items: center;
  &:focus + ${InputLabel} {
    transform: matrix(0.8, 0, 0, 0.8, 0, -24.75);
  }
  &:not(:placeholder-shown) + ${InputLabel} {
    transform: matrix(0.8, 0, 0, 0.8, 0, -24.75);
  }
  height: 100%;
  width: 100%;
  margin: ${(props) => props.theme.margin.small}; ;
`;

const InputContainer = styled.div`
  transition-duration: 0.4s;
  transition-property: box-shadow, border-color;
  border: 1px solid rgb(230, 230, 230);
  padding: ${(props) => props.theme.padding.small};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  color: #000;
  position: relative;
  height: 60px;
  width: 100%;
  margin: ${(props) => props.theme.margin.tiny};

  &:focus-within {
    border: 1px solid ${(props) => props.theme.colors.primary};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1),
      inset 0 0 0 2px ${(props) => props.theme.colors.primary};
  }
`;

export const QueryInput = ({
  label,
  ...props
}: React.ComponentPropsWithoutRef<"input"> & {
  label: string;
  type?: "text" | "password" | "number" | "email" | "button";
}) => {
  const id = useRef(
    `${label.replace(" ", "-")}-${Math.floor(Math.random() * 10000)}`
  );

  return (
    <InputContainer>
      <InputField {...props} id={id.current} placeholder=" " />
      <InputLabel htmlFor={id.current}>{label}</InputLabel>
    </InputContainer>
  );
};
