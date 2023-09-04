/**
 * @function formatCurrency
 * @param currency
 * @returns number formatted as currency
 *
 * @example
 *  formatCurrency(1.5)
 *  // '$1.50'
 */
export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(currency)
}
