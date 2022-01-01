import { ThemeProvider } from '@material-ui/core'
import React from 'react'
import { theme } from './components/ui/Theme'
import Container from './main/Container'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container />
    </ThemeProvider>
  )
}

export default App
