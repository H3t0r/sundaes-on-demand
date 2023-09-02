import {rest} from 'msw'

export const handlers = [
  rest.get('http://localhost:3030/scoops', (_req, res, ctx) => {
    return res(
      ctx.json([
        {imagePath: '/images/chocolate.png', name: 'Chocolate'},
        {imagePath: '/images/vanilla.png', name: 'Vanilla'},
      ]),
    )
  }),
]
