$(document).ready(function () {
    //Создаем товары
    var $goods = $('#goods');
    console.log($goods);

    var good1 = new Good(123, 'Клавиатура для ПК', 800);
    good1.render($goods);

    var good2 = new Good(124, 'Мышь для ПК1', 700);
    good2.render($goods);

    //Корзина
    var basket = new Basket('basket');
    basket.render($('#basket_wrapper'));

    //Добавление товара в корзину
    $('.good-buy').on('click', function () {
        var idProduct = parseInt($(this).attr('data-id'));
        var price = parseInt($(this).parent().find('span.product-price').text());
        basket.add(idProduct, price);
    });

    //Удаление товара из корзины
    $('.good-delete').on('click', function () {
        var idProduct = parseInt($(this).attr('data-id'));
        var price = parseInt($(this).parent().find('span.product-price').text());
        basket.remove(idProduct, price);
    });

    //Отзывы
    var idReview = 'comments';
    var comment = new Comment(idReview);
    comment.render($('#users-comments'));
    //Добавление отзыва
    $('.add-comment').on('click', function () {
        var idUser = parseInt($('#' + idReview + '_user').val());
        var text = $('#' + idReview + '_review').val();
        comment.add(idUser, text);
    });

        // 2. Для того, чтобы кнопки заработали, используйте делегаты.
        //Удаление отзыва
        $(document).on('click', '.comment-delete', function () {
            var idComment = parseInt($(this).attr('review-id-for-delete'));
            comment.remove(idComment);
        });
        //Одобрение отзыва
        $(document).on('click', '.comment-approve', function () {
            var idComment = parseInt($(this).attr('review-id-for-approve'));
            comment.approve(idComment);
        });
});