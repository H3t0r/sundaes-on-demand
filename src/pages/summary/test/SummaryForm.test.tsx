import {render, screen} from '@testing-library/react'
import SummaryForm from '../SummaryForm'
import userEvent from '@testing-library/user-event'

describe('Summary Form', () => {
  test('Confirm Order button is disabled and checkbox is unchecked by default', () => {
    render(<SummaryForm />)

    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    })
    const button = screen.getByRole('button', {name: /confirm order/i})

    expect(checkbox).not.toBeChecked()
    expect(button).toBeDisabled()
  })

  test('Confirm Order button is enabled when checkbox is checked', async () => {
    const user = userEvent.setup()
    render(<SummaryForm />)

    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    })
    const button = screen.getByRole('button', {name: /confirm order/i})

    await user.click(checkbox)

    expect(checkbox).toBeChecked()
    expect(button).toBeEnabled()
  })

  test('Confirm Order button is disabled when checkbox gets unchecked', async () => {
    const user = userEvent.setup()
    render(<SummaryForm />)

    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    })
    const button = screen.getByRole('button', {name: /confirm order/i})

    await user.click(checkbox)
    await user.click(checkbox)

    expect(checkbox).not.toBeChecked()
    expect(button).toBeDisabled()
  })

  test('Popover gets rendered on hover', async () => {
    const user = userEvent.setup()
    render(<SummaryForm />)

    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i,
    )
    expect(nullPopover).not.toBeInTheDocument()

    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    })
    await user.hover(checkbox)
    const popover = screen.getByText(/no ice cream will actually be delivered/i)
    expect(popover).toBeInTheDocument()

    await user.unhover(checkbox)
    expect(popover).not.toBeInTheDocument()
  })
})
