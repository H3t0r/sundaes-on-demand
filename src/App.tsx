import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import CssBaseline from '@mui/material/CssBaseline'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import OrderEntry from './pages/entry/OrderEntry'
import Container from '@mui/material/Container'
import {OrderDetailsProvider} from './context/OrderDetails'
import * as React from 'react'
import OrderSummary from './pages/summary/OrderSummary'
import {OrderPhase} from './types'
import OrderConfirmation from './pages/confirmation/OrderConfirmation'

const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  const [orderPhase, setOrderPhase] = React.useState<OrderPhase>('inProgress')

  const renderOrderPhase = () => {
    switch (orderPhase) {
      case 'inProgress':
        return <OrderEntry onConfirm={setOrderPhase} />
      case 'review':
        return <OrderSummary onConfirm={setOrderPhase} />
      case 'completed':
        return <OrderConfirmation onConfirm={setOrderPhase} />
      default:
        throw new Error(`Invalid Order Phase: ${orderPhase}`)
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container sx={{marginY: 2}}>
        <OrderDetailsProvider>{renderOrderPhase()}</OrderDetailsProvider>
      </Container>
    </ThemeProvider>
  )
}

export default App
