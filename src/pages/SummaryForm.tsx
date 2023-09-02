import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import * as React from 'react'

function SummaryForm() {
  const [isDisabled, setIsDisabled] = React.useState(true)
  const toggleButton = () => setIsDisabled(state => !state)

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox onClick={toggleButton} />}
          label="I agree to Terms and Conditions"
        />
      </FormGroup>
      <Button disabled={isDisabled} variant="contained">
        Confirm Order
      </Button>
    </>
  )
}

export default SummaryForm
