const rubleNumber = new Intl.NumberFormat("ru-RU");

function monthlyTariff(price: number, originalPrice: number) {
  return {
    price,
    priceLabel: `${rubleNumber.format(price)} р./мес.`,
    originalPriceLabel: `${rubleNumber.format(originalPrice)} р./мес.`,
    discount: Math.round(((originalPrice - price) / originalPrice) * 100),
  };
}

export const frontendCoursePricing = {
  basic: monthlyTariff(7290, 12590),
  extended: monthlyTariff(12590, 23590),
  personal: monthlyTariff(16590, 31950),
};
