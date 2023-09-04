import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import CssBaseline from '@mui/material/CssBaseline'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import OrderEntry from './pages/entry/OrderEntry'
import Container from '@mui/material/Container'
import {OrderDetailsProvider} from './context/OrderDetails'

const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container>
        <OrderDetailsProvider>
          <OrderEntry />
        </OrderDetailsProvider>
      </Container>
    </ThemeProvider>
  )
}

export default App
