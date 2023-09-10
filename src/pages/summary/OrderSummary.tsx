import {useOrderDetails} from '../../context/OrderDetails'
import {OrderPhase} from '../../types'
import {formatCurrency} from '../../utilities'
import SummaryForm from './SummaryForm'

interface Props {
  onConfirm?: React.Dispatch<React.SetStateAction<OrderPhase>>
}

function OrderSummary(props: Props) {
  const {optionCounts, totals} = useOrderDetails()
  const scoops = Object.entries(optionCounts.scoops)
  const toppings = Object.keys(optionCounts.toppings)

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>
        {scoops.map(([key, value]) => (
          <li key={key}>
            {value} {key}
          </li>
        ))}
      </ul>
      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>
        {toppings.map(key => (
          <li key={key}>{key}</li>
        ))}
      </ul>
      <h2>Total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <SummaryForm onConfirm={props.onConfirm} />
    </div>
  )
}

export default OrderSummary
