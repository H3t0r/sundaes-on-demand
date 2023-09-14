import Typography from '@mui/material/Typography'
import {OrderPhase} from '../../types'
import Button from '@mui/material/Button'
import React from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import {useOrderDetails} from '../../context/OrderDetails'
import Alert from '@mui/material/Alert'

async function submitOrder(): Promise<{orderNumber: number}> {
  const response = await fetch(`http://localhost:3030/order`, {method: 'post'})

  return response.json()
}

interface Props {
  onConfirm: React.Dispatch<React.SetStateAction<OrderPhase>>
}

function OrderConfirmation(props: Props) {
  const [error, setError] = React.useState<Error | null>(null)
  const [orderNumber, setOrderNumber] = React.useState<number | null>(null)
  const {resetOrder} = useOrderDetails()

  React.useEffect(() => {
    submitOrder()
      .then(response => setOrderNumber(response.orderNumber))
      .catch((error: Error) => setError(error))
  }, [])

  const handleClick = () => {
    resetOrder()
    props.onConfirm('inProgress')
  }

  const renderNewOrderButton = () => (
    <Button onClick={handleClick} variant="contained">
      New order
    </Button>
  )

  if (error) {
    return (
      <>
        <Alert severity="error">
          An unexpected error ocurred. Please try again later.
        </Alert>
        {renderNewOrderButton()}
      </>
    )
  }

  if (!orderNumber) {
    return (
      <Backdrop
        open
        sx={{color: '#fff', zIndex: theme => theme.zIndex.drawer + 1}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  return (
    <>
      <Typography variant="h1">Thank you!</Typography>
      <Typography variant="h2">Your order number is: {orderNumber}</Typography>
      <Typography variant="subtitle1">
        As per our terms and conditions, nothing will happen now
      </Typography>
      {renderNewOrderButton()}
    </>
  )
}

export default OrderConfirmation
