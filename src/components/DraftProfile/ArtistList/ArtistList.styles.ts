import Styled from "styled-components";

export const ArtistWrapper = Styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.itemBgColor};
  border-bottom: .125rem solid ${({ theme }) => theme.colors.primary};
  display: grid;
  gap: .5rem;
  grid-template-rows: repeat(auto-fill, 4.5rem);
  height: calc(100vh - 6rem);
  justify-content: center;
  padding-top:.5rem;
`;

export const ArtistImageWrapper = Styled.button`
background-color: ${({ theme }) => theme.colors.itemBgColor};
border: .0625rem solid ${({ theme }) => theme.colors.borderColor};
overflow: hidden;
width: 4.5rem;
height: 4.5rem;
filter: grayscale(30%);
opacity: .7;
transition: filter .3s;
outline: none;
cursor: pointer;

img {
  height: 100%;
  object-fit: cover;
  width: 100%;
}

&:hover {
  filter: grayscale(0%);
  opacity: 1;
}
`;
