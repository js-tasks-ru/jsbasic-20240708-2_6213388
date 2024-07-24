function getMinMax(str) {
  let arr = str.split(' ');
  let result = {};
  let numbers = arr.filter(item => Number.isFinite(parseFloat(item)));

  result.min = Math.min(...numbers);
  result.max = Math.max(...numbers);

  return result;
}
