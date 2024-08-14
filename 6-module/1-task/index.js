/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');
    this.elem.innerHTML = rows.map(row => `
        <tr>
            <td>${row.name}</td>
            <td>${row.age}</td>
            <td>${row.salary}</td>
            <td>${row.city}</td>
            <td><button>X</button></td>
        </tr>
        `).join('');
    this.elem.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        let tr = event.target.closest('tr');
        if (tr) {
          tr.remove();
        }
      }
    });
  }
}
