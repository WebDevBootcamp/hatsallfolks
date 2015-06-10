$(document).ready(function()
{
  displayThumbnails();
  var cartTab;

  if(docCookies.hasItem("hatCart", "/"))
  {
    /*If there is a shopping cart, count the total number of hats in it and display the number.*/
    var numberOfItems = 0;
    var items = JSON.parse(docCookies.getItem("hatCart", "/"));

    items.forEach( function(element,index)
    {
      numberOfItems = Number(numberOfItems) + Number(items[index].quantity);

    });

    //localStorage.setItem("cartItems", numberOfItems);

    $("#cart_open").text("Cart: " + numberOfItems);

    //alert("Cookie");
  }
  else
  {
    /*Display no hats in cart.*/
    //localStorage.setItem("cartItems", "0");
    $("#cart_open").text("Cart: 0");
    //alert("No Cookie");
  }

  //addEvent(window, "storage", function(event)
  //{
  //  alert("Storage");
  //});


  $("#thumbnail-container").on("click", ".detail-link", function(event)
  {
    //ready = false;
    var thumbnailSKU = this.id;
    var thumbnailIndex = $(this).data("list-index");
    //alert(thumbnailSKU + " " + thumbnailIndex);
    //alert(this.id + " " + this.listindex);
    //alert(this.id);
    //alert(".detail-link");
    //alert(event);
    //alert($(this).attr("data-list-index"));
    //alert($(this).data("list-index"));

    //console.log(this);
    //console.log(event);
    displayThumbnails();

    setTimeout(function()
    {
      //alert(thumbnailSKU + " " + thumbnailIndex);
      displayDetail(thumbnailSKU, thumbnailIndex);
    }, 500, thumbnailSKU, thumbnailIndex);

  });

  $(".header-links").on("click", "#cart_open", function(event)
  {
    event.preventDefault();
    event.stopPropagation();
    cartTab = window.open("cart.html");
    //setTimeout( function()
    //{cartTab.focus()
    //  alert("Focus Cart");

    //}, 6000);
    //cartTab.focus();
    //alert("Open Cart");
    //alert(cartTab);
  });

  $("#thumbnail-container").on("click", ".add-cart", function(event)
  {
    if ($("#hat_quantity").val() !== "" && $("#hat_size").val() !== "" && $("#hat_color").val() !== "")
    {
      event.preventDefault();
      event.stopPropagation();

      if (docCookies.hasItem("hatCart"))
      {
        /*If there is a shopping cart, add another item to it.*/ 
        //alert("Cart");
        var cartCookie = docCookies.getItem("hatCart");
        //console.log("Cart Cookie: " + cartCookie);

        cartCookie = cartCookie.replace("]", ', {"sku" : "' + $("#hat_sku").val() + '", "product" : "' + $(".hat-details-text h2").text() + '", "quantity" : "' +   $("#hat_quantity").val() + '", "price" : "' + $(".hat-details-price").text().trim() + '", "size" : "' +   $("#hat_size").val() + '", "color" : "' +   $("#hat_color").val() + '"}]');
        docCookies.setItem("hatCart", cartCookie, 172800, "/");

        //console.log("Hat Cart: " + JSON.parse(docCookies.getItem("hatCart")));



        //console.log(cartCookie);
        //alert("Cart");

      }
      else
      {
        /*Create a cart and add an item to it.*/
        var cartCookie = '[{"sku" : "' + $("#hat_sku").val() + '", "product" : "' + $(".hat-details-text h2").text() + '", "quantity" : "' +   $("#hat_quantity").val() + '", "price" : "' + $(".hat-details-price").text().trim() + '", "size" : "' +   $("#hat_size").val() + '", "color" : "' +   $("#hat_color").val() + '"}]';
        docCookies.setItem("hatCart", cartCookie, 172800, "/");

        //console.log(cartCookie);
        //alert("No Cart");

      }

      //if(localStorage.getItem("cartItems") === "0")
      //{
      //  localStorage.setItem("cartItems", "1");
      //  console.log(localStorage.getItem("cartItems"));
      //}
      //else
      //{
      /*Get the number of hats already on order.*/
      //var cartAnchor = $("#cart_open").text;
      //console.log(cartAnchor);



      var cartText = $("#cart_open").text();
      var indexOfZero = cartText.indexOf("0");
      if(indexOfZero === -1)
      {
        /*Get the number of hats already on order.*/
        var indexOfSemicolon = cartText.indexOf(":");
        var cartNumber = cartText.substring(indexOfSemicolon + 2, cartText.length);

        //var cart = localStorage.getItem("cartItems");
        //cart = Number(cart) + Number($("#hat_quantity").val());
        //localStorage.setItem("cartItems", cart);
        //console.log(localStorage.getItem("cartItems"));
        //}

        /*Add the number of new hats to the number of hats already on order and display it.*/
        $("#cart_open").text("Cart: " + (Number(cartNumber) + Number($("#hat_quantity").val())));
      }
      else
      {
        $("#cart_open").text("Cart: " + $("#hat_quantity").val());
      }

      displayThumbnails();

      //if(typeof cartTab !== "undefined")
      //{
      try
      {
        /*Close the cart if it is open.*/
        cartTab.close();
      }
      catch(error)
      {

      }
        // alert("Cart");
      //}
      //else
      //{
        //alert("No Cart");

      //}

    }

  });

  $("#thumbnail-container").on("click", ".close", function(event)
  {
    displayThumbnails();

  });

  //$("#thumbnail-container").on("submit", function(event)
  //{
  //  event.preventDefault();
  //  event.stopPropagation();
  //  alert("Submit");
  //
  //}

  $("#thumbnail-container").on("click", ".modal_close", function(event)
  {
    //alert(this.id);
    //alert("add-cart");
    //alert(event);
    //alert($(this).data("list-index"));
    //$('add-cart').leanModal({ top : 200, closeButton: ".modal_close" });
    displayThumbnails();
  });

});

function displayThumbnails()
{
  $.ajax(
  {
    type: "POST",
    url: "scripts/php/thumbCall.php"
  }).done(function (ajaxReturn)
  {
    //console.log(ajaxReturn);
    var items = JSON.parse(ajaxReturn);
    //console.log(items);
    var html = new EJS({url: "views/thumbnail.ejs"}).render({items:items});

    $("#thumbnail-container").html(html);

  });

}

function displayDetail(id, listIndex)
{
  //alert(id);
  //alert("Modulo: " + (listIndex % 2));

  //alert(id + " " + listIndex);
  var container = "#thumbnail" + listIndex;

  //alert(container);


  if (listIndex % 2 == 0)
  {
    $.ajax(
    {
      type: "POST",
      url: "scripts/php/detailCall.php",
      data: "sku=" + id
    }).done(function (ajaxReturn)
    {
          //console.log(ajaxReturn);
          var items = JSON.parse(ajaxReturn);
          //console.log(items);
          var html = new EJS({url: "views/right_detail.ejs"}).render({items: items});
          $(container).html(html);

          var largePixURL = "url('http://weblab.us/hatsall/images/large/" + id + ".jpg')";
          $(".detail-right-hat-container").css("background-image", largePixURL);

          var modelPixURL = "url('http://weblab.us/hatsall/images/model/" + id + ".jpg')";
          $(".detail-right-model-container").css("background-image", modelPixURL);

    });

  }
  else
  {
    $.ajax(
    {
      type: "POST",
      url: "scripts/php/detailCall.php",
      data: "sku=" + id
    }).done(function (ajaxReturn)
    {
      //console.log(ajaxReturn);
      var items = JSON.parse(ajaxReturn);
      //console.log(items);
      var html = new EJS({url: "views/left_detail.ejs"}).render({items:items});
      $(container).html(html);

      var largePixURL = "url('http://weblab.us/hatsall/images/large/" + id + ".jpg')";
      $(".detail-left-hat-container").css("background-image", largePixURL);

      var modelPixURL = "url('http://weblab.us/hatsall/images/model/" + id + ".jpg')";
      $(".detail-left-model-container").css("background-image", modelPixURL);

    });

  }

}

