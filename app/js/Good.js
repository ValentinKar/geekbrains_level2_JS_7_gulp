/**
 * Класс товара.
 * 
 * @property {number} id - Идентификатор товара
 * @property {string} title - Название товара
 * @property {number} price - Цена товара
 */
function Good(id, title, price) {
    this.id = id;
    this.title = title;
    this.price = price;
}

/**
 * Метод отображает на экране div с товаром.
 *
 * @param $containerGood Тег div, куда помещаем теги с товарами
 */
Good.prototype.render = function ($containerGood) {
    var $goodContainer = $('<div />', {
        class: 'good'
    });

    // название товара
    var $goodTitle = $('<p />', {
        text: this.title
    });

    // цена товара внутри каждого тега с товарами
    var $goodPrice = $('<p>Цена: <span class="product-price">' + this.price + '</span> руб.</p>');

    // кнопка "купить товар" добавляет товар в корзину
    var $goodBtnAdd = $('<button />', {
        class: 'good-buy',
        text: 'Купить',
        'data-id': this.id
    });

    //TODO: Создать кнопку для удаления товара
    var $goodBtnDelete = $('<button />', {
        class: 'good-delete',
        text: 'Удалить из корзины',
        'data-id': this.id
    });

    //Создаем структуру
    $goodTitle.appendTo($goodContainer);
    $goodPrice.appendTo($goodContainer);
    $goodBtnAdd.appendTo($goodContainer);
    $goodBtnDelete.appendTo($goodContainer);

    $containerGood.append($goodContainer);
};