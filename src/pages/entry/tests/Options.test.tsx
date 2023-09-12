import userEvent from '@testing-library/user-event'
import {render, screen} from '../../../test-utils/testing-library-utils'
import Options from '../Options'

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

  test('Update toppings total when toppings change', async () => {
    const user = userEvent.setup()
    render(<Options type="toppings" />)

    const subtotal = screen.getByText('Toppings total: $', {exact: false})
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: /cherries/i,
    })
    const hotFudgeCheckbox = await screen.findByRole('checkbox', {
      name: /hot fudge/i,
    })

    expect(subtotal).toHaveTextContent('0.00')

    await user.click(cherriesCheckbox)
    expect(cherriesCheckbox).toBeChecked()
    expect(subtotal).toHaveTextContent('1.50')

    await user.click(hotFudgeCheckbox)
    expect(hotFudgeCheckbox).toBeChecked()
    expect(subtotal).toHaveTextContent('3.00')

    await user.click(hotFudgeCheckbox)
    expect(hotFudgeCheckbox).not.toBeChecked()
    expect(subtotal).toHaveTextContent('1.50')
  })

  test('Do not update scoops total for invalid input', async () => {
    const user = userEvent.setup()
    render(<Options type="scoops" />)

    const subtotal = screen.getByRole('heading', {name: /scoops total/i})
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    })
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })

    expect(subtotal).toHaveTextContent('0.00')

    await user.clear(chocolateInput)
    await user.type(chocolateInput, '-1')

    expect(subtotal).toHaveTextContent('0.00')

    await user.clear(vanillaInput)
    await user.type(vanillaInput, '1')

    expect(subtotal).toHaveTextContent('2.00')

    await user.clear(chocolateInput)
    await user.type(chocolateInput, '1')

    expect(subtotal).toHaveTextContent('4.00')
  })
})
