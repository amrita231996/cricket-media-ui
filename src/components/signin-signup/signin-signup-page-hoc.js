import React from "react";
import Styled from "@emotion/styled";
import BgImage from "../../assets/images/signin-signup/signin-signup-bg-2.png";
import "./signin-signup-page-hoc.scss";

const scale = 0.8;



const desktopViewStyles = {
  margin: "auto",
  backgroundColor: "white",
  border: "1px solid #FFFFFF52",
  padding: "20px 50px",
  borderRadius: 20,
  transform: `scale(${scale})`,

};

const mobileViewStyles = {
  padding: "10px 20px",
  backgroundColor: "white",
  margin: "auto",
};

export default function SignInSignUpPageHOC(props) {
  if(props.props && props.props.custClassName){
    return <div className={props.props.custClassName}>{props.children}</div>;
  } else {
   const PageContainer = Styled.div(`
    height: 100vh;
    background-image: url(${props.matches ? BgImage : ''});
    background-repeat: no-repeat;
    background-color: white;
    background-size: cover;
    background-position: center;
    overflow: auto;
    display: flex;
`);

  const {
    desktopViewStyles: extraDesktopViewStyles = {},
    mobileViewStyles: extraMobileViewStyles = {},
  } = props || {};
  return (
    <PageContainer>
      <div
        style={{
          maxWidth: 480,
          color: "white",
          ...(props.matches
            ? {
                ...desktopViewStyles,
                ...extraDesktopViewStyles,
              }
            : {
                ...mobileViewStyles,
                ...extraMobileViewStyles,
              }),
        }}
      >
        {props.children}
      </div>
    </PageContainer>
  );
}
}
