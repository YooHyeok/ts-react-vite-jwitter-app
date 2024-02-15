import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
  box-sizing: border-box;
  }
  body {
  background-color: black;
  color: white;
  font-family: 'system-ui', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyles/>
    <App />
  </>,
)
