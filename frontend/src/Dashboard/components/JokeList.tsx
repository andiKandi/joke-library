import React from "react";
import styled from "styled-components";

export type Joke = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  show: boolean;
  counter: number;
  category: string;
  language: string;
};

const JokeFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const JokeHighlight = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: none;
  width: ${(props) => props.theme.sizes.small};
  background-color: ${(props) => props.theme.colors.primary};
`;

export const JokeItemStyle = styled.div`
  margin: 0;
  min-height: 3rem;
  position: relative;
  padding: 0.7rem 2rem;
  &:hover {
    ${JokeHighlight} {
      display: block;
    }
  }
`;

export const JokeList = styled.ul`
  list-style: none;
  box-shadow: 0 0.125em 0.25em 0 ${(props) => props.theme.colors.shadowColor};
  width: 100%;
  padding: 0;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.listBackgroundColor};
  ${JokeItemStyle} {
    border-bottom: 1px ${(props) => props.theme.colors.shadowColor} solid;
    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

export const JokeTitle = styled.p`
  font-size: ${(props) => props.theme.fontSize.medium};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  margin: 0;
`;
export const JokeDescription = styled.p`
  padding: ${(props) => props.theme.padding.small}
    ${(props) => props.theme.padding.medium}
    ${(props) => props.theme.padding.small} 0;
  font-size: ${(props) => props.theme.fontSize.small};
  margin: 0;
`;
export const JokeDate = styled.p`
  margin: 0;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.colors.secondaryFontColor};
`;
export const JokeCounter = styled.span`
  flex: 1;
  justify-content: flex-end;
  display: flex;
  align-items: center;
`;
export const JokeCategory = styled.p`
  margin: 0;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.colors.secondaryFontColor};
`;

export type JokeItemProps = {
  joke: Joke;
  onClick?: (joke: Joke) => void;
};

export const JokeItem: React.FC<JokeItemProps> = ({
  onClick = () => {},
  joke,
}) => {
  const { name, description, updatedAt, category, counter } = joke;

  return (
    <JokeItemStyle
      onClick={() => {
        onClick(joke);
      }}
    >
      <JokeHighlight />
      <JokeFlex>
        <div>
          <JokeTitle>{name}</JokeTitle>
          <JokeDescription>{description}</JokeDescription>
          <JokeCategory>{category}</JokeCategory>
          <JokeDate>{updatedAt && updatedAt.toLocaleString()}</JokeDate>
        </div>
        <JokeCounter>{counter}</JokeCounter>
      </JokeFlex>
    </JokeItemStyle>
  );
};
