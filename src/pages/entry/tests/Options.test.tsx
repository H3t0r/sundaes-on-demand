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
})
