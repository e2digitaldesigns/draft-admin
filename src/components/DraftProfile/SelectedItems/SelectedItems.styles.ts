import Styled from "styled-components";

export const SelectedItemWrapper = Styled.div`
  border-bottom: .125rem solid ${({ theme }) => theme.colors.primary};
  display: grid;
  gap: .5rem;
  grid-template-rows: 5rem 1fr;
  height: calc(100vh - 6rem);
  padding: 0.5rem;
`;

export const SelectedHeader = Styled.div`
  background-color: ${({ theme }) => theme.colors.itemBgColor};
`;

export const SelectedItems = Styled.div`
  display: flex;
  flex-direction: column;
  gap: .25rem;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const SelectedItem = Styled.div`
  display: grid;
  grid-template-columns: 2.5rem 1fr 4rem;
  gap: .25rem;
  background-color: ${({ theme }) => theme.colors.itemBgColor};
  padding: .25rem .5rem .25rem .25rem;
  font-size: .75rem;
  transition: filter .3s;
  align-items: center;
  width: calc(100% - .5rem);

  &:hover {
    filter: brightness(120%);
  }
`;

export const ItemImageWrapper = Styled.div`
    border: .0625rem solid ${({ theme }) => theme.colors.borderColor};
    overflow: hidden;
    width: 2.5rem;
    height: 2.5rem;
    outline: none;
    cursor: pointer;

    img {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
`;

export const ItemInfo = Styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  div:first-child {
    font-weight: 700;
    font-size: .875rem;
  }
`;

export const RemoveButton = Styled.button`
  background-color: ${({ theme }) => theme.colors.itemBgColor};
  border: none;
  cursor: pointer;
  outline: none;
  padding: .25rem;
  transition: filter .3s;

  >svg{
    color: ${({ theme }) => theme.colors.text};
  }

  &:hover {
    >svg{
    color: ${({ theme }) => theme.colors.primary};
  }
  }
`;
