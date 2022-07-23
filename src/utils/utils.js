export const roundToTwo = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const priceFormatter = (number) => {
  const numberString = String(number.toFixed(2));
  const newArray = [];
  const splitedNumberStringArray = numberString.split(".");
  const mainNumber = splitedNumberStringArray[0];
  const reversedNumber = mainNumber.split("").reverse();
  reversedNumber.forEach((element, index) => {
    if (index % 3 === 0 && index !== 0) {
      newArray.push(",");
    }
    newArray.push(element);
  });
  return splitedNumberStringArray.length > 1
    ? newArray.reverse().join("") + "." + splitedNumberStringArray[1]
    : newArray.reverse().join("");
};
