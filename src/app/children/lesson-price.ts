const starting = 1415;
const discount = 27;
const regular = Math.round(starting / (1 - discount / 100));
const currencyAmount = new Intl.NumberFormat("ru-RU");

export const childrenLessonPrice = {
  starting,
  discount,
  startingLabel: currencyAmount.format(starting),
  regularLabel: currencyAmount.format(regular),
};
