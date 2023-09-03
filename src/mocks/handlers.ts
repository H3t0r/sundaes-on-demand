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
  rest.get('http://localhost:3030/toppings', (_req, res, ctx) => {
    return res(
      ctx.json([
        {imagePath: '/images/cherries.png', name: 'Cherries'},
        {imagePath: '/images/hot-fudge.png', name: 'Hot fudge'},
        {imagePath: '/images/m-and-ms.png', name: 'M&Ms'},
      ]),
    )
  }),
]
