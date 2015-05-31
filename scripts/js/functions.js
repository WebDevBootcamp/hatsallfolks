$(document).ready(function()
{
  displayThumbnails();

  $("#thumbnail-container").on("click", ".detail-link", function(e)
  {
    //ready = false;
    var thumbnailSKU = this.id;
    var thumbnailIndex = $(this).data("list-index");
    //alert(thumbnailSKU + " " + thumbnailIndex);
    //alert(this.id + " " + this.listindex);
    //alert(this.id);
    //alert(".detail-link");
    //alert(e);
    //alert($(this).attr("data-list-index"));
    //alert($(this).data("list-index"));

    //console.log(this);
    //console.log(e);
    displayThumbnails();

    setTimeout(function()
    {
      //alert(thumbnailSKU + " " + thumbnailIndex);
      displayDetail(thumbnailSKU, thumbnailIndex);
    }, 500, thumbnailSKU, thumbnailIndex);

  });

  $("#thumbnail-container").on("click", ".add-cart", function(e)
  {
    //alert(this.id);
    //alert("add-cart");
    //alert(e);
    //alert($("#hat_quantity").val());
    //alert($("#hat_size").val());
    //alert($("#hat_color").val());


    //alert($(this).data("list-index"));
    //$('add-cart').leanModal({ top : 200, closeButton: ".modal_close" });
    //$("#cart-call").click();

    if ($("#hat_quantity").val() !== "" && $("#hat_size").val() !== "" && $("#hat_color").val() !== "")
    {
      if (docCookies.hasItem("hatCart"))
      {
        //alert("Has Hat Cart");
        console.log(docCookies.getItem("hatCart"));

        var hatCart = JSON.parse(docCookies.getItem("hatCart"));
        //var hatCart = docCookies.getItem("hatCart");
        console.log("Hat Cart: " + hatCart);

        var jsonString = "'[";

        hatCart.forEach(function (el, index)
        {
          jsonString  = jsonString + '{"sku" : "' + el.sku + '", "quantity" : "' + el.quantity + '", "size" : "' + el.size + '", "color" : "' + el.color + '"}, ';

        });

        console.log("JSON 1: " + jsonString);

        jsonString = jsonString + '{"sku" : "' + $("#hat_sku").val() + '", "quantity" : "' +   $("#hat_quantity").val() + '", "size" : "' +   $("#hat_size").val() + '", "color" : "' +   $("#hat_color").val() + '"}]'

        console.log("JSON 2: " + jsonString);

        alert("Has Hat Cart");
      }
      else
      {
        alert("Doesn't Have Hat Cart");

      }

    }

  });

  $("#thumbnail-container").on("click", ".modal_close", function(e)
  {
    //alert(this.id);
    //alert("add-cart");
    //alert(e);
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

