export function calculateDiscountedPrice(
  originalPrice: any,
  percentageIncrease: any
) {
  var newPrice = originalPrice * (1 + percentageIncrease / 100);
  return Math.round(newPrice);
}
