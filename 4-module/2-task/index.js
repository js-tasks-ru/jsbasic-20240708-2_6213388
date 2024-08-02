function makeDiagonalRed(table) {
  let size = table.rows.length;

  for (let i = 0; i < size; i++) {

    for (let j = 0; j < size; j++) {

      if (i === j) {
        let cell = table.rows[i].cells[j];
        cell.style.backgroundColor = 'red';
      }
    }
  }
}
