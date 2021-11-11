const priceRangeGenerator = distanceInNumber => {
  const priceRange = [];
  const medianPrice = (distanceInNumber * 3.0);
  const startingPrice = medianPrice - 2.0;
  const highestPrice = medianPrice + 3.0;

  for (let i = startingPrice; i <= highestPrice; i++) {
    priceRange.push({
      price: i
    })
  }

  return priceRange
}

export default {priceRangeGenerator}