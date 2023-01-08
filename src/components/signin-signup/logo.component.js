import React from "react";
import Styled from "@emotion/styled";
import LogoImage from '../../assets/images/home/logo/logo@2x.png';

const LogoWrap = Styled.div(({ align }) =>`
    display: flex;
    flex-direction: column;
    align-items: ${align || 'center'};
`);
const Logo = Styled.img(({ fontSize }) => `
    width: ${fontSize || 64}px;
    height: ${fontSize || 64}px;
    margin: 0;
`)
const Title = Styled.p(`
    color: white;
    font-weight: bold;
    margin: 0;
`)

export default function LogoWithTitle({ fontSize, align }) {
    return (
        <LogoWrap align={align}>
            <Logo src={LogoImage} alt="LogoImage" fontSize={fontSize} />
        </LogoWrap>
    )
}