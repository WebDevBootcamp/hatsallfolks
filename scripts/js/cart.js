/**
 * Created by Jack on 6/1/2015.
 */
$(document).ready(function(){

  var cartCookie = docCookies.getItem("hatCart");
  //console.log(cartCookie);
  var items = JSON.parse(cartCookie);
  //alert("Ready")
  //console.log(items);
  var html = new EJS({url: "views/cart.ejs"}).render({items:items});
  $("#cart_container").html(html);

});
