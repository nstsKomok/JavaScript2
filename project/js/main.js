const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                 this.goods = data;
                 this.render()
            });
    }

    
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts(){
      
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
       
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
//            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();

class BasketList {
    constructor(container = '.cart__list') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._clickBasket();
        this._getBasket()
            .then(data => { //data - объект js
                this.goods = [...data.contents];
                this.render()
            });
    }
    
  _getBasket(){
      
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
       
    }
    _clickBasket() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('cart__list__none');
        });
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new BasketItem();
            block.insertAdjacentHTML('beforeend', productObj.render(product));
        }

    }
}

class BasketItem {
    render(product,img = 'https://via.placeholder.com/50x50'){
        return `<div class="cart-item" data-id="${product.id_product}">
                <img src="${img}" alt="Some img">
                <div class="cart-item-info">
                    <h4 class='cart-item-title'>${product.product_name}</h3>
                    <p class='cart-item-quant'>Quantity:${product.quantity}</p>
                    <p class='cart-item-price'>${product.price} $ each</p>
                </div>
                <div class='cart-item-btn'><p class='sum'>$${product.price*product.quantity}</p><button class='del-btn'><i class="fas fa-window-close"></i></button></div>
            </div>`
    }
}





let basketList = new BasketList();
console.log(list.allProducts);

