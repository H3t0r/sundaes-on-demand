import * as React from 'react'
import {PRICE_PER_ITEM} from '../constants'
import {OptionType} from '../types'

type OrderDetailsState = Record<OptionType, Record<string, number>>
type OrderDetailsValue = {
  optionCounts: OrderDetailsState
  resetOrder: () => void
  totals: Record<OptionType, number>
  updateOptionCount: (name: string, count: number, type: OptionType) => void
}

const OrderDetails = React.createContext<OrderDetailsValue | null>(null)

export function useOrderDetails() {
  const ctx = React.useContext(OrderDetails)

  if (!ctx) {
    throw new Error(
      'useOrderDetails must be called from within an OrderDetailsProvider',
    )
  }

  return ctx
}

interface Props {
  children: React.ReactNode
}

export function OrderDetailsProvider(props: Props) {
  const [optionCounts, setOptionCounts] = React.useState<OrderDetailsState>({
    scoops: {},
    toppings: {},
  })

  const calculateTotal = (type: OptionType) => {
    const countsArray = Object.values(optionCounts[type])
    const totalCount = countsArray.reduce((total, value) => total + value, 0)

    return totalCount * PRICE_PER_ITEM[type]
  }

  const resetOrder = () => setOptionCounts({scoops: {}, toppings: {}})

  const updateOptionCount = (name: string, count: number, type: OptionType) => {
    const newOptionCounts: OrderDetailsState = {...optionCounts}

    newOptionCounts[type][name] = count
    setOptionCounts(newOptionCounts)
  }

  const totals = {
    scoops: calculateTotal('scoops'),
    toppings: calculateTotal('toppings'),
  }

  const value = {optionCounts, resetOrder, totals, updateOptionCount}

  return <OrderDetails.Provider value={value} {...props} />
}
