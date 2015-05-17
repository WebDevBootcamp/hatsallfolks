$(document).ready(function()
{
  $.ajax(
  {
    type: "POST",
    url: "sqlcalls.php"
  }).done(function (ajaxReturn)
  {
    var items = JSON.parse(ajaxReturn);
    var html = new EJS({url: "views/thumbnails.ejs"}).render({items:items});
    $("#thumbnail_container").html(html);

    //setTimeout(function()
    //{
      $(".detail_button").click(function(e)
      {
        alert($(this).attr("id"));

      });

    //}, 500);

  });

});

