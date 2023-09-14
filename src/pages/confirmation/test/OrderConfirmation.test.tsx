import {rest} from 'msw'
import {server} from '../../../mocks/server'
import {render, screen} from '../../../test-utils/testing-library-utils'
import OrderConfirmation from '../OrderConfirmation'

describe('Order Confirmation', () => {
  test('Handles confirmation errors', async () => {
    server.resetHandlers(
      rest.post('http://localhost:3030/order', (_req, res, ctx) =>
        res(ctx.status(500)),
      ),
    )

    render(<OrderConfirmation onConfirm={jest.fn()} />)

    expect(await screen.findByRole('alert')).toBeInTheDocument()
  })
})
