import { AppBar, Box, Container, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { theme } from './Theme'
import VerticalStepper from './VerticalStepper'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6'>Multi Step Form</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box marginTop={10}>
          <VerticalStepper />
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
