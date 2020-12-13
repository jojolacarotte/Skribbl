import styled, { css } from 'styled-components'

export const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid aquamarine;
  color: aquamarine;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${props => props.primary && css`
    background: aquamarine;
    color: white;
  `}
`;
