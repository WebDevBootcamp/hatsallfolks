<?php
include('includes/db.php');
$dbh = pdoOpen();

//$stmt = $dbh->prepare("INSERT INTO Orders (First, Last, Address1, Address2, City, State, Zip, Email, Cart) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

$stmt = $dbh->prepare("INSERT INTO Orders (First, Last, Address1, Address2, City, State, Zip, Email, Cart) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

//echo "<script type= 'text/javascript'>";
//echo "alert('Added item')";
//echo "</script>";

//echo "Add Order";
//echo json_encode($stmt);
//echo $_POST["first_name"];
//echo "\r\n";
//echo $_POST["last_name"];
//echo "\r\n";
//echo $_POST["address_1"];
//echo "\r\n";
//echo $_POST["address_2"];
//echo "\r\n";
//echo $_POST["city"];
//echo "\r\n";
//echo $_POST["state"];
//echo "\r\n";
//echo $_POST["zip"];
//echo "\r\n";
//echo $_POST["email"];
//echo "\r\n";
//echo $_POST["items"];

$stmt->bindParam(1, $_POST["first_name"]);
$stmt->bindParam(2, $_POST["last_name"]);
$stmt->bindParam(3, $_POST["address_1"]);
$stmt->bindParam(4, $_POST["address_2"]);
$stmt->bindParam(5, $_POST["city"]);
$stmt->bindParam(6, $_POST["state"]);
$stmt->bindParam(7, $_POST["zip"]);
$stmt->bindParam(8, $_POST["email"]);
$stmt->bindParam(9, $_POST["items"]);

//echo json_encode($stmt);

$stmt->execute() or die("PDO Error");

pdoClose($dbh);

//sendEMail("One item was added\r\n");

//print json_encode($stmt);
