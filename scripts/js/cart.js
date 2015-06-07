/**
 * Created by Jack on 6/1/2015.
 */
$(document).ready(function()
{
  displayItems();

  $("#cart_container").on("click", "#order_button", function(event)
  {
    event.preventDefault();
    event.stopPropagation();
    $("#cart-call").leanModal({top: 200, closeButton: ".modal_close"});
    $("#cart-call").click();

  });

  $("form").on("submit", function(event)
  {
    event.preventDefault();
    event.stopPropagation();
    //var cart = docCookies.getItem("hatCart", "/");

    //console.log($(this).serialize());

    var order=$("#cust_info").serialize() + "&items=" + docCookies.getItem("hatCart", "/");

    $.ajax(
      {
        type: "POST",
        url: "addOrder.php",
        data: "order=" + order
      }).done(function (ajaxReturn)
      {
        var items = JSON.parse(ajaxReturn);
      });

  });

  $("#cart_container").on("click", ".delete_item", function(event)
  {
    event.preventDefault();
    event.stopPropagation();
    var removeItem = $(this).data("item_index");
    var cartCookie = docCookies.getItem("hatCart", "/");
    var items = JSON.parse(cartCookie);

    if(items.length === 1)
    {
      docCookies.removeItem("hatCart");
      docCookies.removeItem("hatCart", "/");
      $("#cart_container").html("");
      window.close();
    }
    else
    {
      var newCart = "[";

      items.forEach(function (element, index)
      {
        if (index !== removeItem)
        {
          newCart = newCart + JSON.stringify(element) + ",";

        }

      });

      newCart = newCart.substring(0, newCart.length - 1) + "]";

      docCookies.removeItem("hatCart");
      docCookies.removeItem("hatCart", "/");
      docCookies.setItem("hatCart", newCart, "/");

      displayItems();

    }

  });

});

function displayItems()
{
  var cartCookie = docCookies.getItem("hatCart", "/");
  var items = JSON.parse(cartCookie);
  var html = new EJS({url: "views/cart.ejs"}).render({items: items});
  $("#cart_container").html(html);
}

