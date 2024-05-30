export const currencyFormat = (num) => {
  if (!num || num.length === 0)
    return "₮0.00";
  return '₮' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}