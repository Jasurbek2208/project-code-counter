function numSort(num) {
  const splitType = String(num)?.includes(".") ? "." : ",";
  const numStr = String(num)?.split(splitType)[0];
  const numArr = [];

  for (let i = numStr?.length - 1, j = 0; i >= 0; i--, j++) {
    if (j !== 0 && j % 3 === 0) {
      numArr?.push(" ");
    }
    numArr?.push(numStr[i]);
  }

  return `${numArr?.reverse()?.join("")}${String(num)?.split(splitType)[1]
    ? `,${String(num)?.split(splitType)[1]}`
    : ""
    }`;
}

module.exports = { numSort }