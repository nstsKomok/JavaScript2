const products = [
  {id: 1, title: 'Notebook', price: 1000},
  {id: 2, title: 'Mouse', price: 100},
  {id: 3, title: 'Keyboard', price: 250},
  { id: 4, title: 'Gamepad', price: 150 },
  { id: 5, price: 1500 },
  {id: 6, title: 'Computer'},
];
//Для сокращения записи функции убрала фигурные скобки и команду return
const renderProduct = (title='Скоро здесь будет заголовок', price=0000) => 
  `<div class="product-item">
            <h3>${title}</h3>
            <p>${price}</p>
            <button class="by-btn">Добавить</button>
          </div>`;


const renderProducts = list => {
  const productList = list.map(item => renderProduct(item.title, item.price)).join(' ');
  console.log(productList);
  document.querySelector('.products').innerHTML = productList;
};

renderProducts(products);
