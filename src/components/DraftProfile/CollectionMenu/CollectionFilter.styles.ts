import Styled from "styled-components";

export const CollectionFilterWrapper = Styled.div`
  display: flex;
  padding:  0.25rem 0;
  gap: 0.25rem;
  align-items: center;
`;

export const FilterButton = Styled.button<{ $isSelected: boolean }>`
  background-color: ${({ theme }) => theme.colors.itemBgColor};
  border:none;
  border-bottom: 0.125rem solid;
  border-bottom-color: ${({ $isSelected, theme }) =>
		$isSelected ? theme.colors.primary : "transparent"};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: 0.75rem;
  height: 100%;
  outline: none;
  text-align: center;
  text-transform: uppercase;
  transition: background-color 0.3s, color 0.3s;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .3s ease-in-out;

  &:hover {
    border-bottom-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textActive};
  }
`;
