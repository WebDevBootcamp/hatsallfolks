<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<?php
    include('includes/db.php');
    $conn = db_connect();

    // QUERY DB FOR SMALL SIZES ONLY SO THAT MAIN PAGE SHOWS ONLY EACH PRODUCT, NOT SIZES AND COLORS
    $sql = "SELECT sku, product, description FROM Inventory WHERE size='small'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
         // OUTPUT DATA FOR EACH ROW
         while($row = $result->fetch_assoc()) {
            // ECHO BELOW CAN BE DELETED WHEN AJAC FETCH IS SET UP
             echo "<br /><img src=\"images/".$row["sku"].".jpg\">
             <br /> SKU: ". $row["sku"]. "<br /> Product: ". $row["product"]. "<br />Description: ". $row["description"]."<br />";
         }
    } else {
         echo "0 results";
    }
    $conn->close();
    ?>
</body>
</html>