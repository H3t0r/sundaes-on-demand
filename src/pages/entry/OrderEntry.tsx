import Typography from '@mui/material/Typography'
import Options from './Options'
import {useOrderDetails} from '../../context/OrderDetails'
import {formatCurrency} from '../../utilities'

function OrderEntry() {
  const {totals} = useOrderDetails()

  return (
    <>
      <Options type="scoops" />
      <Options type="toppings" />
      <Typography variant="h2">
        Grand total: {formatCurrency(totals.scoops + totals.toppings)}
      </Typography>
    </>
  )
}

export default OrderEntry
