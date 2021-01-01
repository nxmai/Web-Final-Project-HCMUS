$(document).ready( () => {
    $('.add-to-cart').on('click', function (event) {
        event.preventDefault();
        console.log('4956');

        var id = $(this)[0].dataset.productid;
        console.log(id);
        var quantity = $(this).parent().parent().children('div.quantity-colors').find('input').val();

        console.log('testttt', $(this).parent().parent().children('div.quantity-colors').find('input').val());
        
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


$('.pro-qty').prepend('<span class="dec qtybtn">-</span>');
$('.pro-qty').append('<span class="inc qtybtn">+</span>');
$('.qtybtn').on('click', function() {
	var $button = $(this);
	var oldValue = $button.parent().find('input').val();
	if ($button.hasClass('inc')) {
	  var newVal = parseFloat(oldValue) + 1;
	} else {
	   // Don't allow decrementing below zero
	  if (oldValue > 0) {
		var newVal = parseFloat(oldValue) - 1;
		} else {
		newVal = 0;
	  }
      }

      var id = $button.parent().parent().parent().data('productid');
      var quantity = newVal;
      console.log('quantity', quantity);

      
      if(quantity == 0){
        removeCartItem(id);
      } else{
        updateCartItem(id, quantity, $button);
      }
      
	$button.parent().find('input').val(newVal);
});  
    
function updateCartItem(id, quantity, $button) {
    $.ajax({
        url: '/cart',
        type: 'PUT',
        data: { id, quantity },
        success: function(result){
            $button.parent().parent().parent().children('.pro-subtotal').children('#pro-subtotal').html(result.item.price);
            $('#totalPrice').html(result.totalPrice);
            $('#cart-badge').html(result.totalQuantity);
        }
      })
}

function removeCartItem(id){
    $.ajax({
        url: '/cart',
        type: 'DELETE',
        data: { id },
        success: function(result){
            $('#totalPrice').html(result.totalPrice);
            $('#cart-badge').html(result.totalQuantity);
            $(`#item${id}`).remove();
        }
      })
}
