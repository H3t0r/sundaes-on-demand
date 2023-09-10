import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import {OrderPhase} from '../../types'

interface Props {
  onConfirm?: React.Dispatch<React.SetStateAction<OrderPhase>>
}

function SummaryForm(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const [isDisabled, setIsDisabled] = React.useState(true)

  const handlePopoverClose = () => setAnchorEl(null)
  const handlePopoverOpen: React.MouseEventHandler<HTMLElement> = event =>
    setAnchorEl(event.currentTarget)
  const open = Boolean(anchorEl)
  const toggleButton = () => setIsDisabled(state => !state)

  return (
    <>
      <FormGroup
        aria-haspopup="true"
        aria-owns={open ? 'mouse-over-popover' : undefined}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <FormControlLabel
          control={<Checkbox onClick={toggleButton} />}
          label="I agree to the Terms and Conditions"
        />
      </FormGroup>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        disableRestoreFocus
        id="mouse-over-popover"
        onClose={handlePopoverClose}
        open={open}
        sx={{pointerEvents: 'none'}}
        transformOrigin={{vertical: 'top', horizontal: 'left'}}
      >
        <Typography sx={{p: 1}}>
          No ice cream will actually be delivered
        </Typography>
      </Popover>
      <Button
        disabled={isDisabled}
        onClick={() => props.onConfirm?.('completed')}
        variant="contained"
      >
        Confirm Order
      </Button>
    </>
  )
}

export default SummaryForm
