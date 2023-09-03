import {render, screen} from '@testing-library/react'
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
})
