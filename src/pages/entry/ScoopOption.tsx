import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import TextField from '@mui/material/TextField'
import * as React from 'react'
import {useOrderDetails} from '../../context/OrderDetails'

interface Props {
  imagePath: string
  name: string
}

function ScoopOption({imagePath, name}: Props) {
  const {updateOptionCount} = useOrderDetails()
  const [error, setError] = React.useState(false)
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const {validity, value: targetValue} = e.target
    const value = validity.valid && targetValue ? targetValue : '0'
    setError(!validity.valid)
    updateOptionCount(name, parseInt(value), 'scoops')
  }

  return (
    <Card sx={{minWidth: 265}}>
      <CardMedia
        alt={`${name} scoop`}
        component="img"
        src={`http://localhost:3030/${imagePath}`}
        sx={{height: 265}}
      />
      <CardContent>
        <TextField
          defaultValue={0}
          error={error}
          fullWidth
          inputProps={{max: 10, min: 0}}
          label={name}
          onChange={handleChange}
          size="small"
          type="number"
        />
      </CardContent>
    </Card>
  )
}

export default ScoopOption
