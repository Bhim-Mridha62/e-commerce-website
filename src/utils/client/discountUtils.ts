export function calculateDiscountedPrice(originalPrice, percentageIncrease) {
  var newPrice = originalPrice * (1 + percentageIncrease / 100);
  return Math.round(newPrice);
}
