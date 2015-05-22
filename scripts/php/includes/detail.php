<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
</head>
<body>


<?php
    include('db.php');
    $conn = db_connect();
    // $sku = $_POST['sku'];
    $sku = "01-12345-01";  // ONLY USE THIS FOR TESTING. ONCE ALL IS WORKING, REMOVE THIS LINE PLEASE

    // QUERY DB FOR THE SKU RECEIVED FROM THE POST REQUEST
    $sql = "SELECT sku, product, description, quantity, price,color FROM Inventory WHERE sku='$sku'";
    $result = $conn->query($sql);


// MAKE RETURN TO SEND ARRAY OF $RESULT TO JSON FOR JACK
$row = $result->fetch_assoc();
$items = $row["sku"].",". $row["product"].",".$row["description"].",".$row["quantity"].",".$row["price"].",".$row["color"];

// SQL QUERY BELOW DETERMINES HAT COLORS FOR THE PARTICULAR PRODUCT
$hat = $row["product"];
$colors = "SELECT color FROM Inventory WHERE product = ('$hat') AND (size = 'small')";
$hatColors = $conn->query($colors);
while($row = $hatColors->fetch_assoc()) {
echo "<br />Color: ".$row["color"];
}

print json_encode($items);
$conn->close();
?>
</body>
</html>