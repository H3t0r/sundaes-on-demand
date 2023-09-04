import {render, screen} from '../../../test-utils/testing-library-utils'
import Options from '../Options'
import userEvent from '@testing-library/user-event'
import {OrderDetailsProvider} from '../../../context/OrderDetails'

describe('Options', () => {
  test('Displays image for each scoop options from server', async () => {
    render(<Options type="scoops" />)

    const images = await screen.findAllByRole('img', {name: /scoop$/i})
    expect(images).toHaveLength(2)

    const altText = images.map(e => (e as HTMLImageElement).alt)
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
  })

  test('Displays image for each topping options from server', async () => {
    render(<Options type="toppings" />)

    const images = await screen.findAllByRole('img', {name: /topping$/i})
    expect(images).toHaveLength(3)

    const altText = images.map(e => (e as HTMLImageElement).alt)
    expect(altText).toEqual([
      'Cherries topping',
      'Hot fudge topping',
      'M&Ms topping',
    ])
  })

  test('Update scoop subtotal when scoops change', async () => {
    const user = userEvent.setup()
    render(<Options type="scoops" />)

    const subtotal = screen.getByText('Scoops total: $', {exact: false})
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    })
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })

    expect(subtotal).toHaveTextContent('0.00')

    await user.clear(vanillaInput)
    await user.type(vanillaInput, '1')
    expect(subtotal).toHaveTextContent('2.00')

    await user.clear(chocolateInput)
    await user.type(chocolateInput, '2')
    expect(subtotal).toHaveTextContent('6.00')
  })
})
