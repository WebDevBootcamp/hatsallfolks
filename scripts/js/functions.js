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

});

function displayThumbnails()
{
  $.ajax(
  {
    type: "POST",
    url: "thumbCall.php"
  }).done(function (ajaxReturn)
  {
    //console.log(ajaxReturn);
    var items = JSON.parse(ajaxReturn);
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
      url: "detailCall.php",
      data: "sku=" + id
    }).done(function (ajaxReturn)
    {
          //console.log(ajaxReturn);
          var items = JSON.parse(ajaxReturn);
          //console.log(items);
          var html = new EJS({url: "views/right_detail.ejs"}).render({items: items});
          $(container).html(html);

          var largePixURL = "url('http://weblab.us/hatsall/images/large/" + id + ".jpg')";
          $(".hat-details-left-container").css("background-image", largePixURL);

          var modelPixURL = "url('http://weblab.us/hatsall/images/model/" + id + ".jpg')";
          $(".hat-details-right-image-container").css("background-image", modelPixURL);

    });

  }
  else
  {
    $.ajax(
    {
      type: "POST",
      url: "detailCall.php",
      data: "sku=" + id
    }).done(function (ajaxReturn)
    {
      //console.log(ajaxReturn);
      var items = JSON.parse(ajaxReturn);
      //console.log(items);
      var html = new EJS({url: "views/left_detail.ejs"}).render({items:items});
      $(container).html(html);

      var largePixURL = "url('http://weblab.us/hatsall/images/large/" + id + ".jpg')";
      $(".hat-details-right-container").css("background-image", largePixURL);

      var modelPixURL = "url('http://weblab.us/hatsall/images/model/" + id + ".jpg')";
      $(".hat-details-left-image-container").css("background-image", modelPixURL);

    });

  }

}

