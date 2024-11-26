import Styled from "styled-components";

export const CollectionMenuWrapper = Styled.div`
  background-color: ${({ theme }) => theme.colors.itemBgColor};
  border-bottom: .125rem solid ${({ theme }) => theme.colors.primary};
  display: grid;
  gap: .5rem;
  grid-template-rows: 16.25rem 1fr;
  height: calc(100vh - 6rem);
  padding: 0.5rem;
  width: 100%;
`;

export const ActiveItem = Styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryBgColor};
  border: .0625rem solid ${({ theme }) => theme.colors.borderColor};
  display: flex;
  height: 16.25rem;
  justify-content: center;
  overflow: hidden;
  width: 16.25rem;

  > img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;

export const CollectionMenu = Styled.div`
  display: grid;
  grid-template-columns: repeat(3, 5rem);
  gap: .25rem;
  width: 16.25rem;
  overflow-y: scroll;
  overflow-x: hidden;
  grid-auto-rows: 5rem;
`;

export const CollectionMenuButton = Styled.button`
    background-color: ${({ theme }) => theme.colors.itemBgColor};
    border: .0625rem solid ${({ theme }) => theme.colors.borderColor};
    overflow: hidden;
    width: 5rem;
    height: 5rem;
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
