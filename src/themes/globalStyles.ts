import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.colors.primaryBgColor};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;




    ::-webkit-scrollbar {
      background-color: ${({ theme }) => theme.colors.gray1};
      height: 0.375rem;
      width: 0.25rem;
    }

  ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.gray2};

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
      }
    }
  }

`;

export default GlobalStyles;
