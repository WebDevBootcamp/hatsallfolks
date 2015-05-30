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
    //alert($(this).data("list-index"));
    //$('add-cart').leanModal({ top : 200, closeButton: ".modal_close" });
    //$("#cart-call").click();

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

