import {fireEvent, render, screen} from '@testing-library/react'
import SummaryForm from '../SummaryForm'

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

  test('Confirm Order button is enabled when checkbox is checked', () => {
    render(<SummaryForm />)

    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    })
    const button = screen.getByRole('button', {name: /confirm order/i})

    fireEvent.click(checkbox)

    expect(checkbox).toBeChecked()
    expect(button).toBeEnabled()
  })
  test('Confirm Order button is disabled when checkbox is unchecked', () => {
    render(<SummaryForm />)

    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    })
    const button = screen.getByRole('button', {name: /confirm order/i})

    fireEvent.click(checkbox)
    fireEvent.click(checkbox)

    expect(checkbox).not.toBeChecked()
    expect(button).toBeDisabled()
  })
})
