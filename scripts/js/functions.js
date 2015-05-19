$(document).ready(function()
{
  displayThumbnails();

  $("#thumbnail-container").on("click", ".detail-link", function(e)
  {
    //alert(this.id + " " + this.listindex);
    //alert(this.id);
    //alert($(this).attr("id"));
    //alert($(this).data("id"));

    //console.log(this);
    //console.log(e);
    displayThumbnails();
    displayDetail(this.id, $(this).attr("listindex"));

  });

});

function displayThumbnails()
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

}

function displayDetail(id, listIndex)
{
  //alert(id);
  //alert(listIndex);



}

