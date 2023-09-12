import userEvent from '@testing-library/user-event'
import {render, screen} from '../../../test-utils/testing-library-utils'
import ScoopOption from '../ScoopOption'

describe('Scoop input validation', () => {
  test('Marked as invalid if decimal or out of range numbers are entered', async () => {
    const user = userEvent
    render(<ScoopOption imagePath={''} name={''} />)

    const coffeeInput = screen.getByRole('spinbutton')

    expect(coffeeInput).toBeValid()

    await user.clear(coffeeInput)
    await user.type(coffeeInput, '-1')

    expect(coffeeInput).toBeInvalid()

    await user.clear(coffeeInput)
    await user.type(coffeeInput, '1.5')

    expect(coffeeInput).toBeInvalid()

    await user.clear(coffeeInput)
    await user.type(coffeeInput, '11')

    expect(coffeeInput).toBeInvalid()

    await user.clear(coffeeInput)
    await user.type(coffeeInput, '7')

    expect(coffeeInput).toBeValid()
  })
})
