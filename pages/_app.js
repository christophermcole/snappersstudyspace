import { createGlobalStyle } from "styled-components";
import NavBar from "../components/NavBar";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #32643F;
  }
`;

function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <NavBar />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
