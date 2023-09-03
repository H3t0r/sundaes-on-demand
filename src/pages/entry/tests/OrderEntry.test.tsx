import {render, screen, waitFor} from '@testing-library/react'
import OrderEntry from '../OrderEntry'
import {server} from '../../../mocks/server'
import {rest} from 'msw'

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

    render(<OrderEntry />)

    await waitFor(async () => {
      const alerts = await screen.findAllByRole('alert')
      expect(alerts).toHaveLength(2)
    })
  })
})
