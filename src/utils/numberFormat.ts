// Thanks to @tobyjsullivan https://gist.github.com/tobyjsullivan/96d37ca0216adee20fa95fe1c3eb56ac
export const numberFormat = (value: number): string => {
  let newValue: string | number = value;
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let suffixNum = 0;
  while (newValue >= 1000) {
    newValue /= 1000;
    suffixNum++;
  }

  newValue = newValue =
    newValue.toString().length > 2 ? Number(newValue).toPrecision(3) : Number(newValue).toPrecision();

  newValue += suffixes[suffixNum];

  return newValue;
};
