<?php
    include('includes/db.php');
    $conn = db_connect();
    $sku = $_POST['sku'];
//    $sku = "01-12345-01";  // ONLY USE THIS FOR TESTING. ONCE ALL IS WORKING, REMOVE THIS LINE PLEASE

    // QUERY DB FOR THE SKU RECEIVED FROM THE POST REQUEST
    $sql = "SELECT sku, product, detail, price FROM Inventory WHERE sku='$sku'";
    $result = $conn->query($sql);


$conn->close();

if ($result->num_rows > 0)
{
    $items = [];
    // OUTPUT DATA FOR EACH ROW
    while($row = $result->fetch_assoc())
    {
        $items[] = $row;
    }

    print json_encode($items);
}
else
{
    print "0 results";
}
