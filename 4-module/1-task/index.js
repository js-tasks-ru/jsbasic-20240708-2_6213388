function makeFriendsList(friends) {
  let ul = document.createElement('ul');
  document.body.appendChild(ul);

  for (let el of friends) {
    let li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = `${el.firstName} ${el.lastName}`;
  }
  return ul;
}
