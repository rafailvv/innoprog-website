const starting = 1415;
const discount = 27;
const regular = Math.round(starting / (1 - discount / 100));
const currencyAmount = new Intl.NumberFormat("ru-RU");

function formatPrice(amount: number) {
  return currencyAmount.format(amount).replace(/\s/g, "\u202f");
}

export const childrenLessonPrice = {
  starting,
  discount,
  startingLabel: formatPrice(starting),
  regularLabel: formatPrice(regular),
};
