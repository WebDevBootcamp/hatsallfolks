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
    //alert("Submit");
    //var cart = docCookies.getItem("hatCart", "/");

    //console.log($(this).serialize());

    //var items = docCookies.getItem("hatCart", "/");
    //items = items.replace(" ", "+");

    var order=$("#cust_info").serialize() + "&items=" + encodeURIComponent(docCookies.getItem("hatCart", "/"));
    //console.log(order);
    //console.log(decodeURIComponent(order));
    $.ajax(
      {
        type: "POST",
        url: "scripts/php/addOrder.php",
        data: order
      }).done(function (ajaxReturn)
      {
        //console.log(ajaxReturn);
        //var items = JSON.parse(ajaxReturn);

      });

    var cartAnchor = window.opener.document.getElementById("cart_open");
    cartAnchor.text = "Cart: 0";

    docCookies.removeItem("hatCart");
    docCookies.removeItem("hatCart", "/");

    $(".modal_close").click();

    $("#cart_container").html("");

    window.close();

  });

  $("#cart_container").on("click", ".delete_item", function(event)
  {
    event.preventDefault();
    event.stopPropagation();
    var removeItem = $(this).data("item_index");
    var cartCookie = docCookies.getItem("hatCart", "/");
    var items = JSON.parse(cartCookie);

    var cartAnchor = window.opener.document.getElementById("cart_open");
    console.log(cartAnchor);


    var cartText = cartAnchor.text;

    var cartNumber = cartText.substring(cartText.indexOf(":") + 2, cartText.length);

    var deleteItem = items[removeItem];
    console.log(deleteItem);

    var itemNumber = deleteItem.quantity;
    console.log(itemNumber);

    cartAnchor.text = ("Cart: " + (Number(cartNumber) - Number(itemNumber)));

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

