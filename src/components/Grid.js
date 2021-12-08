import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 300px 150px 300px;
  grid-template-rows: auto auto;
  column-gap: 1rem;
  row-gap: 1rem;
`;

export const GridItem = styled.div`
  align-self: stretch;
  justify-self: center;
`;
