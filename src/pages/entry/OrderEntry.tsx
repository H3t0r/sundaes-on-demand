import Typography from '@mui/material/Typography'
import Options from './Options'
import {useOrderDetails} from '../../context/OrderDetails'
import {formatCurrency} from '../../utilities'
import Button from '@mui/material/Button'
import {OrderPhase} from '../../types'

interface Props {
  onConfirm: React.Dispatch<React.SetStateAction<OrderPhase>>
}

function OrderEntry(props: Props) {
  const {totals} = useOrderDetails()

  return (
    <>
      <Typography variant="h2">Design Your Sundae!</Typography>
      <Options type="scoops" />
      <Options type="toppings" />
      <Typography variant="h2">
        Grand total: {formatCurrency(totals.scoops + totals.toppings)}
      </Typography>
      <Button
        disabled={totals.scoops <= 0}
        onClick={() => props.onConfirm('review')}
      >
        Order Sundae!
      </Button>
    </>
  )
}

export default OrderEntry
