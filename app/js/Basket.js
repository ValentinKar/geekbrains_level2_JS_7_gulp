/**
 * Класс корзины.
 * 
 * @property {string} idBasket - ID который будет добавляться в 
 * идентификаторы тегов.
 */
function Basket(idBasket) {
    this.id = idBasket;

    this.countGoods = 0; //Общее кол-во товаров
    this.amount = 0; //Общая стоимость товаров
    this.basketItems = []; //Массив для хранения товаров
    this.getBasket(); //Получаем уже добавленные товары в корзину
}

/**
 * Метод добавляет контейнер для товаров на страницу.
 *
 * @param $root Коллекция jQuery - контейнер для товаров
 * @return Значение типа String (не нужен, так как его нет в методе)
 */
Basket.prototype.render = function ($root) {
  var $basketDiv = $('<div />', {
      id: this.id,
      text: 'Корзина'
  });

  var $basketItemsDiv = $('<div />', {
    id: this.id + '_items'
  });

  $basketItemsDiv.appendTo($basketDiv);
  $basketDiv.appendTo($root);

};

/**
 * Метод запрашивает через ajax файл basket.json и получает 
 * корзину пользователя.
 *
 */
Basket.prototype.getBasket = function () {
    var appendId = '#' + this.id + '_items';

    $.ajax({
        type: 'GET',
        url: './basket.json',
        dataType: 'json',
        context: this,
        success: function (data) {
            var $basketData = $('<div />', {
                id: 'basket_data'
            });

            this.countGoods = data.basket.length;
            this.amount = data.amount;

            $basketData.append('Всего товаров: ' + this.countGoods + '</p>');
            $basketData.append('Общая стоимость: ' + this.amount + '</p>');

            $basketData.appendTo(appendId);

            for (var itemKey in data.basket)
            {
                this.basketItems.push(data.basket[itemKey]);
            }
        }
    });
};

/**
 * Метод добавляет товар в корзину, изменяет на странице кол-во товаров, 
 * общую стоимость, также метод создает массив обьектов basketItem в который 
 * вноситься идентификаторы товаров и их цены.
 *
 * @param idProduct Идентификатор товара
 * @param price Цена товара
 */
Basket.prototype.add = function (idProduct, price) {
    var basketItem = {
      "id_product": idProduct,
      "price": price
    };

    this.amount +=price; //this.amount = this.amount + price
    this.countGoods++;
    this.basketItems.push(basketItem);
    this.refresh(); //Перерисовка корзины
};

/**
 * Метод очищает тег с id basket_data, и перезаписывает кол-во и сумму.
 *
 */
Basket.prototype.refresh = function () {
    var $basketDataDiv = $('#basket_data');
    $basketDataDiv.empty();
    $basketDataDiv.append('Всего товаров: ' + this.countGoods + '</p>');
    $basketDataDiv.append('Общая стоимость: ' + this.amount + '</p>');
};

/**
 * Метод удаляет товар из корзины, изменяет на странице кол-во товаров, 
 * общую стоимость.
 *
 * @param idProduct Идентификатор удаляемого товара
 */
Basket.prototype.remove = function (idProduct) {
  // поиск товара в корзине
  var goodNumber = this.find(idProduct);

    // усли товар в корзине найден
    if(goodNumber) {
      // удаление товара из массива с товарами
      this.basketItems.splice(goodNumber, 1);
      // получение кол-ва оставшихся товаров и их сумма
      var result = this.summa(idProduct);
      // суммарная стоимость товаров в корзине
      this.amount = result[1];
      // кол-во товаров в корзине
      this.countGoods = result[0];
    }

  this.refresh(); //Перерисовка корзины
};

/**
 * Метод ищет товар в корзине и возврашает его номер в массиве, 
 * если нашел или false, если не нашел.
 *
 * @param id Идентификатор удаляемого товара
 * @return Значение типа Number или типа Boolean(false)
 */
Basket.prototype.find = function (id) {
  var number = false;

    this.basketItems.forEach(function(product, index) {
      if(product.id_product === id) {
        number = index;
      }
    });
  return number;
};

/**
 * Метод получает из корзины с товарами их кол-во и  
 * суммарную стоимость.
 *
 * @return Массив, где первый элемент - счетчик, а 
 * второй - суммарная стоимость.
 */
Basket.prototype.summa = function () {
  var goodCount = 0;
  var goodSumma = 0;

    this.basketItems.forEach(function(element) {
      ++goodCount;
      goodSumma += element.price;
    });
  return [goodCount, goodSumma];
};