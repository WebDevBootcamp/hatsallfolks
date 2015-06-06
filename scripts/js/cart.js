/**
 * Created by Jack on 6/1/2015.
 */
$(document).ready(function()
{
  displayItems();

  $("#cart_container").on("click", ".delete_item", function(event)
  {
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