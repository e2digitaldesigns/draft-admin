import Styled from "styled-components";

export const CollectionItemsWrapper = Styled.div`
  border-bottom: .125rem solid ${({ theme }) => theme.colors.primary};
  display: grid;
  gap: .5rem;
  grid-template-rows: 5rem 1fr;
  height: calc(100vh - 6rem);
  width: 100%;
  padding: 0.5rem;
`;

export const CollectionItemsHeader = Styled.div`
  display: grid;
  grid-template-columns: 5rem 1fr;
  gap: .5rem;
  background-color: ${({ theme }) => theme.colors.itemBgColor};
`;

export const HeaderImage = Styled.div`
    border: .0625rem solid ${({ theme }) => theme.colors.borderColor};
    overflow: hidden;
    width: 5rem;
    height: 5rem;
    outline: none;
    cursor: pointer;

    img {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
`;

export const HeaderInfo = Styled.div`
`;

export const CollectionItemWrapper = Styled.div`
  display: flex;
  flex-direction: column;
  gap: .25rem;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const CollectionItem = Styled.div<{ $isSelected: boolean }>`
  display: grid;
  grid-template-columns: 1.5rem 1fr 1.5rem;
  gap: .25rem;
  background-color: ${({ theme }) => theme.colors.itemBgColor};
  padding:  .25rem;
  font-size: .875rem;
  transition: filter .3s;
  align-items: center;
  width: calc(100% - .5rem);
  border-left: .125rem solid;

  border-left-color: ${({ $isSelected, theme }) =>
		$isSelected ? theme.colors.primary : "transparent"};

  &:hover {
    filter: brightness(120%);
  }
`;

export const AddButton = Styled.button`
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
