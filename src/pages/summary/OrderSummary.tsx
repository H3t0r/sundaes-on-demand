import Typography from '@mui/material/Typography'
import {useOrderDetails} from '../../context/OrderDetails'
import {OrderPhase} from '../../types'
import {formatCurrency} from '../../utilities'
import SummaryForm from './SummaryForm'
import IcecreamIcon from '@mui/icons-material/Icecream'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Badge from '@mui/material/Badge'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

interface Props {
  onConfirm?: React.Dispatch<React.SetStateAction<OrderPhase>>
}

function OrderSummary(props: Props) {
  const {optionCounts, totals} = useOrderDetails()
  const scoops = Object.entries(optionCounts.scoops)
  const toppings = Object.keys(optionCounts.toppings)

  return (
    <>
      <Typography variant="h2" mb={2}>
        Order Summary
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h4">
            Scoops: {formatCurrency(totals.scoops)}
          </Typography>
          <List>
            {scoops.map(([key, value]) => (
              <ListItem key={key}>
                <ListItemIcon>
                  <Badge badgeContent={value} color="info">
                    <IcecreamIcon />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary={key} />
              </ListItem>
            ))}
          </List>
          {totals.toppings > 0 && (
            <>
              <Typography variant="h4">
                Toppings: {formatCurrency(totals.toppings)}
              </Typography>
              <List>
                {toppings.map(key => (
                  <ListItem key={key}>{key}</ListItem>
                ))}
              </List>
            </>
          )}
        </CardContent>
      </Card>
      <Typography variant="h3">
        Total: {formatCurrency(totals.scoops + totals.toppings)}
      </Typography>
      <SummaryForm onConfirm={props.onConfirm} />
    </>
  )
}

export default OrderSummary
