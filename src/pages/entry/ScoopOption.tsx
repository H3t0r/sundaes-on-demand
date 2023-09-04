import TextField from '@mui/material/TextField'
import {useOrderDetails} from '../../context/OrderDetails'

interface Props {
  imagePath: string
  name: string
}

function ScoopOption({imagePath, name}: Props) {
  const {updateOptionCount} = useOrderDetails()
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e =>
    updateOptionCount(name, parseInt(e.target.value), 'scoops')

  return (
    <div>
      <img alt={`${name} scoop`} src={`http://localhost:3030/${imagePath}`} />
      <TextField
        defaultValue={0}
        label={name}
        onChange={handleChange}
        size="small"
        type="number"
      />
    </div>
  )
}

export default ScoopOption
