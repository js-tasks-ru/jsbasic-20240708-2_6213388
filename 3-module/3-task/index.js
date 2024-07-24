function camelize(str) {
  let strParts = str.split('-');
  let result;

  result = strParts.map((element, index) => {
    if (index === 0) {
      return element;
    } else {
      return element.charAt(0).toUpperCase() + element.slice(1);
    }
  });

  return  result.join('');
}
