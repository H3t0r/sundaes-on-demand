import TextField from '@mui/material/TextField'
import {useOrderDetails} from '../../context/OrderDetails'
import * as React from 'react'

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
    <div>
      <img alt={`${name} scoop`} src={`http://localhost:3030/${imagePath}`} />
      <TextField
        defaultValue={0}
        error={error}
        inputProps={{max: 10, min: 0}}
        label={name}
        onChange={handleChange}
        size="small"
        type="number"
      />
    </div>
  )
}

export default ScoopOption
