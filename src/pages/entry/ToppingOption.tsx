import FormGroup from '@mui/material/FormGroup'
import {useOrderDetails} from '../../context/OrderDetails'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

interface Props {
  imagePath: string
  name: string
}

function ToppingOption({imagePath, name}: Props) {
  const {updateOptionCount} = useOrderDetails()
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e =>
    updateOptionCount(name, e.target.checked ? 1 : 0, 'toppings')

  return (
    <div>
      <img alt={`${name} topping`} src={`http://localhost:3030/${imagePath}`} />
      <FormGroup>
        <FormControlLabel
          control={<Checkbox onChange={handleChange} />}
          label={name}
        />
      </FormGroup>
    </div>
  )
}

export default ToppingOption
