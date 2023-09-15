import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import {PRICE_PER_ITEM} from '../../constants'
import {useOrderDetails} from '../../context/OrderDetails'
import {OptionType} from '../../types'
import {formatCurrency} from '../../utilities'
import ScoopOption from './ScoopOption'
import ToppingOption from './ToppingOption'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

type Option = {imagePath: string; name: string}

async function getOptions(type: Props['type']): Promise<Option[]> {
  const response = await fetch(`http://localhost:3030/${type}`)

  return response.json()
}

interface Props {
  type: OptionType
}

function Options({type}: Props) {
  const [options, setOptions] = React.useState<Option[]>([])
  const [error, setError] = React.useState<Error | null>(null)
  const {totals} = useOrderDetails()

  React.useEffect(() => {
    getOptions(type)
      .then(response => setOptions(response))
      .catch((error: Error) => {
        if (error.name !== 'CanceledError') {
          setError(error)
        }
      })
  }, [type])

  if (error) {
    return (
      <Alert severity="error">
        An unexpected error ocurred. Please try again later.
      </Alert>
    )
  }

  const Option = type === 'scoops' ? ScoopOption : ToppingOption
  const title = type[0].toUpperCase() + type.slice(1).toLowerCase()

  return (
    <>
      <Typography gutterBottom variant="h3">
        {title}
      </Typography>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Chip
          color="secondary"
          label={`${formatCurrency(PRICE_PER_ITEM[type])} each`}
        />
        <Typography gutterBottom variant="subtitle1">
          {title} total: {formatCurrency(totals[type])}
        </Typography>
      </Stack>
      <Grid container spacing={2}>
        {options.map(option => (
          <Grid item key={option.name}>
            <Option imagePath={option.imagePath} name={option.name} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Options
