import { createGlobalStyle } from "styled-components";
import NavBar from "../components/NavBar";
import { AuthProvider } from "../context/AuthContext"; // Ensure this path is correct

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

require("dotenv").config({ path: ".env.local" });

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider> {/* Wrap everything with AuthProvider */}
            <GlobalStyle />
            <NavBar />
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
