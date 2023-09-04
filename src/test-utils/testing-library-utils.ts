import {RenderOptions, render} from '@testing-library/react'
import {OrderDetailsProvider} from '../context/OrderDetails'

const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: OrderDetailsProvider, ...options})

export * from '@testing-library/react'
export {renderWithProviders as render}
