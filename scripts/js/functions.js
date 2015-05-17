$(document).ready(function()
{
  $.ajax(
  {
    type: "POST",
    url: "sqlcalls.php"
  }).done(function (ajaxReturn)
  {
    var items = JSON.parse(ajaxReturn);
    var html = new EJS({url: "views/thumbnail.ejs"}).render({items:items});

    $("#thumbnail-container").html(html);

  });

    $("#thumbnail_container").on("click", ".detail-link", function(e) {
    alert(this.id);
  });

});

