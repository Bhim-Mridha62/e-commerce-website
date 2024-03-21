export function calculateDiscountedPrice(originalPrice, discountPercentage) {
    const discountedPrice = originalPrice * (1 - discountPercentage / 100);
    return Math.round(discountedPrice)
  }