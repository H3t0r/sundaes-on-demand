import {rest} from 'msw'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

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
  rest.post('http://localhost:3030/order', async (_req, res, ctx) => {
    await sleep(100)
    return res(ctx.json({orderNumber: 123456789}))
  }),
]
