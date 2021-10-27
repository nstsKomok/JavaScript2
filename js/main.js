const products = [
  {id: 1, title: 'Ноутбук', price: 15000},
  {id: 2, title: 'Мышка', price: 500},
  {id: 3, title: 'Клавиатура', price: 250},
  { id: 4, title: 'Геймпад', price: 4500 },
  
];
//Добавила изображение как параметр по умолчанию для функции
const renderProduct = (item,image='img/cart.jpg')=> `<div class='product-item'>
<h3>${item.title}</h3>
<img src=${image} class='product-img'>
<p>Цена:${item.price} рублей</p>
<button class='buy-btn'>Купить</button>
</div>`
const renderPage = list => {
  const productsList = list.map(item => renderProduct(item)).join(' ');//для того, чтобы товары не выводились через запятую добавлен метод join
  document.querySelector('.products').innerHTML = productsList;
};
renderPage(products);
