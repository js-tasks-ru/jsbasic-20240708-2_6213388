function showSalary(users, age) {
  let result = [];

  for (let el of users) {

    if (el.age <= age) {
      result.push(el.name + ', ' + el.balance);
      result.push('\n');
    }
  }
  result.pop();

  return result.join('');
}
