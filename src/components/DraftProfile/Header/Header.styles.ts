import Styled from "styled-components";

export const HeaderWrapper = Styled.header`
    background-color: ${props => props.theme.colors.headerBackgroundColor};
    display: flex;
    height: 4rem;
    justify-content: center;
    padding: 0 2rem;
    position: relative;
    z-index: 1;
    align-items: center;
`;

export const SearchWrapper = Styled.div`
    background-color: ${props => props.theme.colors.inputBackgroundColor};
    border-radius: 1.25rem;
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    height: 2.5rem;
    margin: 0 2rem;
    position: relative;
    width: calc(100% - 50rem);
    border: .0625rem solid ${props => props.theme.colors.borderColor};

    >div:first-of-type {
        align-items: center;
        display: flex;
        font-size: 1.25rem;
        height: 2.5rem;
        justify-content: center;
        position: absolute;
        width: 2.5rem;
        margin-left: 0.5rem;

        > svg{
        height: 1rem;
        width: 1rem;
       }
    }

    >input{
        border: none;
        outline: none;
        background-color: transparent;
        height: 100%;
        padding: .25rem 0 0 3rem;
        width: calc(100% - 2.5rem);
        color: ${props => props.theme.colors.text};
        
    }
`;
