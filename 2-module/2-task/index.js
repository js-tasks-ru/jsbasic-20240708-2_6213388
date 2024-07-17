function isEmpty(obj) {
  for (let key in obj) {

    return false;
  }

  return true;
}
// или так return Object.values(obj).length === 0;
