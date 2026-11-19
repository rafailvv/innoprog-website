const rubleNumber = new Intl.NumberFormat("ru-RU");

function monthlyTariff(price: number, originalPrice: number, discount: number) {
  return {
    price,
    priceLabel: `${rubleNumber.format(price)} р./мес.`,
    originalPriceLabel: `${rubleNumber.format(originalPrice)} р./мес.`,
    discount,
  };
}

export const standardCoursePricing = {
  basic: monthlyTariff(7990, 12590, 36),
  extended: monthlyTariff(14390, 23590, 38),
  personal: monthlyTariff(18890, 31950, 41),
};
