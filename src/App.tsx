import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import CssBaseline from '@mui/material/CssBaseline'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import OrderSummary from './pages/OrderSummary'

const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <OrderSummary />
    </ThemeProvider>
  )
}

export default App
