import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import {useOrderDetails} from '../../context/OrderDetails'
import {OrderPhase} from '../../types'
import {formatCurrency} from '../../utilities'
import Options from './Options'

interface Props {
  onConfirm: React.Dispatch<React.SetStateAction<OrderPhase>>
}

function OrderEntry(props: Props) {
  const {totals} = useOrderDetails()

  return (
    <>
      <Typography variant="h2" mb={2}>
        Design Your Sundae!
      </Typography>
      <Stack mb={3} spacing={2}>
        <Options type="scoops" />
        <Options type="toppings" />
      </Stack>
      <Typography variant="h3" mb={2}>
        Grand total: {formatCurrency(totals.scoops + totals.toppings)}
      </Typography>
      <Button
        variant="contained"
        disabled={totals.scoops <= 0}
        onClick={() => props.onConfirm('review')}
        size="large"
      >
        Order Sundae!
      </Button>
    </>
  )
}

export default OrderEntry
