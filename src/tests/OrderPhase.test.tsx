import {render, screen} from '@testing-library/react'
import App from '../App'
import userEvent from '@testing-library/user-event'

describe('Order workflow', () => {
  test('happy path', async () => {
    // render app
    const user = userEvent.setup()
    render(<App />)

    // add scoops & toppings
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    })
    const vanillaInput = screen.getByRole('spinbutton', {
      name: 'Vanilla',
    })
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: /cherries/i,
    })

    await user.clear(chocolateInput)
    await user.type(chocolateInput, '1')
    await user.clear(vanillaInput)
    await user.type(vanillaInput, '1')
    await user.click(cherriesCheckbox)

    // find and click order button
    const orderButton = screen.getByRole('button', {name: /order sundae/i})
    await user.click(orderButton)

    // check summary information based on order
    const summaryHeading = screen.getByRole('heading', {name: 'Order Summary'})
    const scoopsHeading = screen.getByRole('heading', {name: 'Scoops: $4.00'})
    const toppingsHeading = screen.getByRole('heading', {
      name: 'Toppings: $1.50',
    })

    expect(summaryHeading).toBeInTheDocument()
    expect(scoopsHeading).toBeInTheDocument()
    expect(toppingsHeading).toBeInTheDocument()
    expect(screen.getByText('1 Chocolate')).toBeInTheDocument()
    expect(screen.getByText('1 Vanilla')).toBeInTheDocument()
    expect(screen.getByText('Cherries')).toBeInTheDocument()

    // accept terms and conditions and click button to confirm order
    const tcCheckbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    })
    const confirmButton = screen.getByRole('button', {name: /confirm order/i})

    await user.click(tcCheckbox)
    await user.click(confirmButton)

    // expect loading to show
    const loading = screen.getByRole('progressbar', {hidden: true})
    expect(loading).toBeInTheDocument()

    // confirm order number on confirmation page
    const thankYouHeading = await screen.findByRole('heading', {
      name: /thank you/i,
    })

    expect(thankYouHeading).toBeInTheDocument()
    expect(loading).not.toBeInTheDocument()

    const orderNumber = screen.getByRole('heading', {name: /order number/i})

    expect(orderNumber).toBeInTheDocument()

    // click new order button on confirmation page
    const newOrderButton = screen.getByRole('button', {name: /new order/i})

    await user.click(newOrderButton)

    // check that scoops and toppings subtotals have been reset
    const scoopsTotal = await screen.findByRole('heading', {
      name: /scoops total: \$0\.00/i,
    })
    const toppingsTotal = await screen.findByRole('heading', {
      name: /toppings total: \$0\.00/i,
    })

    expect(scoopsTotal).toBeInTheDocument()
    expect(toppingsTotal).toBeInTheDocument()

    // do we need to await anything to avoid test errors?
  })

  test('Do not display toppings on summary page if none are ordered', async () => {
    // render app
    const user = userEvent.setup()
    render(<App />)

    // add scoops & toppings
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    })
    const vanillaInput = screen.getByRole('spinbutton', {
      name: 'Vanilla',
    })

    await user.clear(chocolateInput)
    await user.type(chocolateInput, '1')
    await user.clear(vanillaInput)
    await user.type(vanillaInput, '1')

    // find and click order button
    const orderButton = screen.getByRole('button', {name: /order sundae/i})
    await user.click(orderButton)

    // check summary information based on order
    const summaryHeading = screen.getByRole('heading', {name: 'Order Summary'})
    const scoopsHeading = screen.getByRole('heading', {name: 'Scoops: $4.00'})
    const toppingsHeading = screen.queryByRole('heading', {
      name: /toppings/i,
    })

    expect(summaryHeading).toBeInTheDocument()
    expect(scoopsHeading).toBeInTheDocument()
    expect(screen.getByText('1 Chocolate')).toBeInTheDocument()
    expect(screen.getByText('1 Vanilla')).toBeInTheDocument()
    expect(toppingsHeading).not.toBeInTheDocument()
  })

  test('Do not display toppings on summary page if ordered & removed', async () => {
    // render app
    const user = userEvent.setup()
    render(<App />)

    // add scoops & toppings
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    })
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: /cherries/i,
    })

    await user.clear(chocolateInput)
    await user.type(chocolateInput, '1')
    await user.click(cherriesCheckbox)

    expect(cherriesCheckbox).toBeChecked()

    await user.click(cherriesCheckbox)

    expect(cherriesCheckbox).not.toBeChecked()

    // find and click order button
    const orderButton = screen.getByRole('button', {name: /order sundae/i})
    await user.click(orderButton)

    // check summary information based on order
    const summaryHeading = screen.getByRole('heading', {name: 'Order Summary'})
    const scoopsHeading = screen.getByRole('heading', {name: 'Scoops: $2.00'})
    const toppingsHeading = screen.queryByRole('heading', {
      name: /toppings/i,
    })

    expect(summaryHeading).toBeInTheDocument()
    expect(scoopsHeading).toBeInTheDocument()
    expect(screen.getByText('1 Chocolate')).toBeInTheDocument()
    expect(toppingsHeading).not.toBeInTheDocument()
  })
})
