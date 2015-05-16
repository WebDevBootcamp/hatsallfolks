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
    // $sku = $_POST['sku'];  (UNCOMMENT ONCE WORKING TO ALLOW FOR POST REQUESTS)
    $sku = "01-12345-01";  // THIS VAR ASSIGNMENT IS TEMPORARY. ONCE WE PASS POST REQUESTS, REMOVE AND UNCOMMENT ABOVE

    // QUERY DB FOR THE SKU RECEIVED FROM THE POST REQUEST
    $sql = "SELECT sku, product, description, quantity FROM Inventory WHERE sku='$sku'";
    $result = $conn->query($sql);


    // THE CODE BELOW RENDERS THE SQL RESULTS AS HTML ON THE PAGE IN CASE YOU WANT TO USE ANY OF THIS IN YOUR EJS CONSTRUCTOR
    if ($result->num_rows > 0) {
         // OUTPUT DATA FOR EACH ROW
         while($row = $result->fetch_assoc()) {
            // ECHO BELOW CAN BE DELETED WHEN AJAX FETCH IS SET UP
             echo "<br /><img src=\"../images/".$row["sku"].".jpg\">
             <br /> SKU: ". $row["sku"]. "<br /> Product: ". $row["product"]. "<br />Description: ". $row["description"]."<br />Quantity: ". $row["quantity"]."<br />";
             // SQL QUERY BELOW DETERMINES HAT COLORS FOR THE PARTICULAR PRODUCT
             $hat = $row["product"];
             $colors = "SELECT color FROM Inventory WHERE product = ('$hat') AND (size = 'small')";
             $hatColors = $conn->query($colors);
             while($row = $hatColors->fetch_assoc()) {
                echo "<br />Color: ".$row["color"];
             }
         }
    } else {
         echo "0 results";
    }
    $conn->close();
    ?>
</body>
</html>