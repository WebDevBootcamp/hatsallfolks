<?php
function db_connect(){
    $servername = "localhost";
    $username = "hatsall";
    $password = "hatsa!!";
    $db = "hatsall";
    // Create connection
    $conn = new mysqli($servername, $username, $password,  $db);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}
function db_close($conn)
{
  mysqli_close($conn);
}

function pdoOpen()
{
  $dsn      = "mysql:dbname=hatsall;host=weblab.us";
  $username = "hatsall";
  $password = "hatsa!!";
//$username = "root";
//$password = "weblab2015";

  try
  {
    $dbh = new PDO($dsn, $username, $password);
  }
  catch (PDOException $event)
  {
    print "Error!: " . $event->getMessage() . "<br/>";
    die();

  }

  return $dbh;

}

function pdoClose($dbh)
{
    $dbh->query("SELECT pg_terminate_backend(pg_backend_pid());");
    $dbh = null;
}

?>

