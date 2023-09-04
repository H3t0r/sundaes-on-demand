import {useOrderDetails} from '../context/OrderDetails'
import {formatCurrency} from '../utilities'
import SummaryForm from './SummaryForm'

function OrderSummary() {
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
      <SummaryForm />
    </div>
  )
}

export default OrderSummary
