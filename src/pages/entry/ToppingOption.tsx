import FormGroup from '@mui/material/FormGroup'
import {useOrderDetails} from '../../context/OrderDetails'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'

interface Props {
  imagePath: string
  name: string
}

function ToppingOption({imagePath, name}: Props) {
  const {updateOptionCount} = useOrderDetails()
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e =>
    updateOptionCount(name, e.target.checked ? 1 : 0, 'toppings')

  return (
    <Card sx={{minWidth: 208}}>
      <CardMedia
        alt={`${name} topping`}
        component="img"
        src={`http://localhost:3030/${imagePath}`}
        sx={{height: 150}}
      />
      <CardContent>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox onChange={handleChange} />}
            label={name}
          />
        </FormGroup>
      </CardContent>
    </Card>
  )
}

export default ToppingOption
