$(document).ready( () => {
    $('.add-to-cart').on('click', function (event) {
        event.preventDefault();
        console.log('4956');

        var id = $(this)[0].dataset.productid;
        console.log(id);
        var quantity = 1;
        $.ajax({
            url: '/cart',
            type: 'POST',
            data: { id, quantity },
            success: function (result) {
                console.log('result', result);
                //alert(result);
                $('#cart-badge').html(result.totalQuantity);
            }
        })
        .done(() =>{
            console.log('succes');
        })
        .fail(function(jqXHR, exception) {
            if (jqXHR.status === 0) {
                alert('Not connect.\n Verify Network.');
            } else if (jqXHR.status == 404) {
                alert('Requested page not found. [404]');
            } else if (jqXHR.status == 500) {
                alert('Internal Server Error [500].');
            } else if (exception === 'parsererror') {
                alert('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                alert('Time out error.');
            } else if (exception === 'abort') {
                alert('Ajax request aborted.');
            } else {
                alert('Uncaught Error.\n' + jqXHR.responseText);
            }
        })

        event.preventDefault();
    });
});

function addToCart() {
    var id = $('.add-to-cart').data("id");
    var quantity = 1;
    $.ajax({
        url: '/cart',
        type: 'POST',
        data: { id, quantity },
        success: function (result) {
            console.log('result', result);
            $('#cart-badge').html(result.totalQuantity);
        }

    })
}