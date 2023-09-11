import userEvent from '@testing-library/user-event'
import {rest} from 'msw'
import {server} from '../../../mocks/server'
import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils'
import OrderEntry from '../OrderEntry'

describe('Order Entry', () => {
  test('handles errors for scoops and toppings', async () => {
    server.resetHandlers(
      rest.get('http://localhost:3030/scoops', (_req, res, ctx) =>
        res(ctx.status(500)),
      ),
      rest.get('http://localhost:3030/toppings', (_req, res, ctx) =>
        res(ctx.status(500)),
      ),
    )

    render(<OrderEntry onConfirm={jest.fn()} />)

    await waitFor(async () => {
      const alerts = await screen.findAllByRole('alert')
      expect(alerts).toHaveLength(2)
    })
  })

  describe('Order button', () => {
    test('Disabled if no scoops ordered', async () => {
      const user = userEvent.setup()
      render(<OrderEntry onConfirm={jest.fn()} />)

      const chocolateInput = await screen.findByRole('spinbutton', {
        name: 'Chocolate',
      })
      const orderButton = screen.getByRole('button', {name: /order sundae/i})

      expect(orderButton).toBeDisabled()

      await user.clear(chocolateInput)
      await user.type(chocolateInput, '1')

      expect(orderButton).toBeEnabled()

      await user.clear(chocolateInput)
      await user.type(chocolateInput, '0')

      expect(orderButton).toBeDisabled()
    })
  })

  describe('Grand total', () => {
    test('Starts at $0.00', () => {
      render(<OrderEntry onConfirm={jest.fn()} />)

      const total = screen.getByRole('heading', {name: /grand total/i})
      expect(total).toHaveTextContent('0.00')
    })

    test('updates properly if scoop is added first', async () => {
      const user = userEvent.setup()
      render(<OrderEntry onConfirm={jest.fn()} />)

      const total = screen.getByRole('heading', {name: /grand total/i})
      const chocolateInput = await screen.findByRole('spinbutton', {
        name: 'Chocolate',
      })
      const cherriesCheckbox = await screen.findByRole('checkbox', {
        name: /cherries/i,
      })

      await user.clear(chocolateInput)
      await user.type(chocolateInput, '1')
      expect(total).toHaveTextContent('2.00')

      await user.click(cherriesCheckbox)
      expect(total).toHaveTextContent('3.50')
    })

    test('updates properly if topping is added first', async () => {
      const user = userEvent.setup()
      render(<OrderEntry onConfirm={jest.fn()} />)

      const total = screen.getByRole('heading', {name: /grand total/i})
      const cherriesCheckbox = await screen.findByRole('checkbox', {
        name: /cherries/i,
      })
      const chocolateInput = await screen.findByRole('spinbutton', {
        name: 'Chocolate',
      })

      await user.clear(chocolateInput)
      await user.click(cherriesCheckbox)
      await user.type(chocolateInput, '2')
      expect(total).toHaveTextContent('5.50')
    })

    test('updates properly if option is removed', async () => {
      const user = userEvent.setup()
      render(<OrderEntry onConfirm={jest.fn()} />)

      const total = screen.getByRole('heading', {name: /grand total/i})
      const chocolateInput = await screen.findByRole('spinbutton', {
        name: 'Chocolate',
      })
      const cherriesCheckbox = await screen.findByRole('checkbox', {
        name: /cherries/i,
      })

      await user.click(cherriesCheckbox)
      await user.clear(chocolateInput)
      await user.type(chocolateInput, '1')
      expect(total).toHaveTextContent('3.50')

      await user.click(cherriesCheckbox)
      expect(total).toHaveTextContent('2.00')
    })
  })
})
